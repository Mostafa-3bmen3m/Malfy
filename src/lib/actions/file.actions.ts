'use server'

import { createAdminClient, createSessionClient } from '../appwrite'
import { InputFile } from 'node-appwrite/file'
import { appwriteConfig } from '../appwrite/config'
import { ID, Models, Query } from 'node-appwrite'
import { constructFileUrl, getFileType, parseStringify } from '../utils'
import { revalidatePath } from 'next/cache'
import { getCurrentUser } from './user.actions'

const handleError = (error: unknown, message: string) => {
  console.log(error, message)
  throw error
}

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient()

  try {
    const inputFile = InputFile.fromBuffer(file, file.name)

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    )

    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id
    }

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id)

        handleError(error, 'Failed to create file document')
      })

    revalidatePath(path)
    return parseStringify(newFile)
  } catch (error) {
    handleError(error, 'Failed to upload files')
  }
}

const createQuries = (
  currentUser: UserDocument,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number
) => {
  const quries = [
    Query.or([
      Query.equal('owner', [currentUser.$id]),
      Query.contains('users', [currentUser.email])
    ])
  ]

  if (types.length > 0) quries.push(Query.equal('type', types))
  if (searchText) quries.push(Query.contains('name', searchText))
  if (limit) quries.push(Query.limit(limit))

  if (sort) {
    const [sortBy, orderBy] = sort.split('-')

    quries.push(
      orderBy === 'asc' ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
    )
  }

  return quries
}

export const getFiles = async ({
  types = [],
  searchText = '',
  sort = '$createdAt-desc',
  limit
}: GetFilesProps) => {
  const { databases } = await createAdminClient()

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) throw new Error('User not found')

    const quries = createQuries(currentUser, types, searchText, sort, limit)

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      quries
    )

    // Resolve owner names in bulk
    const ownerIds = Array.from(
      new Set(
        files.documents
          .map((doc: any) => doc.owner as string)
          .filter((v: any) => typeof v === 'string' && v)
      )
    )

    let ownersById: Record<string, UserDocument> = {}
    if (ownerIds.length > 0) {
      const owners = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal('$id', ownerIds as string[])]
      )
      ownersById = owners.documents.reduce(
        (acc: Record<string, UserDocument>, u: any) => {
          acc[u.$id] = u as UserDocument
          return acc
        },
        {}
      )
    }

    const enriched = {
      ...files,
      documents: files.documents.map((doc: any) => ({
        ...doc,
        owner: ownersById[String(doc.owner)] || doc.owner
      })) as unknown as AppwriteFileDocument[]
    }

    return parseStringify(enriched)
  } catch (error) {
    handleError(error, 'Failed getting files')
  }
}

export const renameFile = async ({
  fileId,
  name,
  extension,
  path
}: RenameFileProps) => {
  const { databases } = await createAdminClient()

  try {
    const newName = `${name}.${extension}`

    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        name: newName
      }
    )

    revalidatePath(path)
    return parseStringify(updatedFile)
  } catch (error) {
    handleError(error, 'Failed to rename file')
  }
}

export const updateFileUsers = async ({
  fileId,
  emails,
  path
}: UpdateFileUsersProps) => {
  const { databases } = await createAdminClient()

  try {
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        users: emails
      }
    )

    revalidatePath(path)
    return parseStringify(updatedFile)
  } catch (error) {
    handleError(error, 'Failed to update file users')
  }
}

export const deleteFile = async ({
  fileId,
  bucketFileId,
  path
}: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient()

  try {
    const deletedFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId
    )

    if (deletedFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId)
    }

    revalidatePath(path)
    return parseStringify({ status: 'success' })
  } catch (error) {
    handleError(error, 'Failed to update file users')
  }
}

export async function getTotalSpaceUsed () {
  try {
    const { databases } = await createSessionClient()
    const currentUser = await getCurrentUser()
    if (!currentUser) throw new Error('User is not authenticated.')

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal('owner', [currentUser.$id])]
    )

    const totalSpace = {
      image: { size: 0, latestDate: '' },
      document: { size: 0, latestDate: '' },
      video: { size: 0, latestDate: '' },
      audio: { size: 0, latestDate: '' },
      other: { size: 0, latestDate: '' },
      used: 0,
      all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */
    }

    files.documents.forEach(file => {
      const fileType = file.type as FileType
      totalSpace[fileType].size += file.size
      totalSpace.used += file.size

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt
      }
    })

    return parseStringify(totalSpace)
  } catch (error) {
    handleError(error, 'Error calculating total space used:, ')
  }
}
