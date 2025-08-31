'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React from 'react'

const Error = () => {
  const router = useRouter()

  return (
    <div className='bg-brand flex justify-center items-center h-screen w-screen'>
      <Card className='bg-white'>
        <CardHeader>
          <CardTitle className='text-brand-100 text-2xl font-bold'>
            Error 404
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p>
            Something went wrong , Please click the button below to{' '}
            <span className='text-brand-100'>solve it</span>
          </p>
        </CardContent>

        <CardFooter>
          <Button
            className='w-full text-white bg-brand'
            onClick={() => router.refresh()}
          >
            Click Here
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Error
