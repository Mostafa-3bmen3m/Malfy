/* eslint-disable no-unused-vars */

declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface ActionType {
    label: string;
    icon: string;
    value: string;
}

declare interface SearchParamProps {
    params?: Promise<SegmentParams>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
}
declare interface GetFilesProps {
    types: FileType[];
    searchText?: string;
    sort?: string;
    limit?: number;
}
declare interface RenameFileProps {
    fileId: string;
    name: string;
    extension: string;
    path: string;
}
declare interface UpdateFileUsersProps {
    fileId: string;
    emails: string[];
    path: string;
}
declare interface DeleteFileProps {
    fileId: string;
    bucketFileId: string;
    path: string;
}

declare interface FileUploaderProps {
    ownerId: string;
    accountId: string;
    className?: string;
}

declare interface MobileNavigationProps {
    ownerId: string;
    accountId: string;
    fullName: string;
    avatar: string;
    email: string;
}
declare interface SidebarProps {
    fullName: string;
    avatar: string;
    email: string;
}

declare interface ThumbnailProps {
    type: string;
    extension: string;
    url: string;
    className?: string;
    imageClassName?: string;
}

declare interface ShareInputProps {
    file: Models.Document;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (email: string) => void;
}

// Strongly-typed file document returned from Appwrite
declare interface FileOwnerDocument extends Models.Document {
    fullName?: string;
}

declare interface AppwriteFileDocument extends Models.Document {
    $id: string;
    $createdAt: string;
    type: string;
    name: string;
    url: string;
    extension: string;
    size: number;
    // When relations are expanded, owner will be a Document; otherwise a string id
    owner: string | FileOwnerDocument;
    accountId: string;
    users: string[];
    bucketFileId: string;
}

declare interface UserDocument extends Models.Document {
    $id: string;
    email: string;
    fullName: string;
    avatar?: string;
    accountId: string;
}