import { Button } from '@/components/ui/button'
import { Edit, Share2, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { db } from '@/configs'
import { Jsonforms } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'


const FormListItem = ({ formRecord, JSONform, refreshData }) => {

    const { user } = useUser();
    const onDeleteForm = async () => {
        const result = await db.delete(Jsonforms)
            .where(and(eq(Jsonforms.id, formRecord.id), eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress)))

        if (result) {
            toast.success('Form Deleted Successfully');
            refreshData();
        }
    }

    return (
        <div className='border shadow-sm rounded-lg p-4 my-5'>
            <div className='flex justify-between'>
                <h2></h2>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Trash className='h-5 w-5 text-destructive cursor-pointer hover:scale-105 transition-all' />

                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will delete form permanently.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-primary' onClick={() => onDeleteForm()}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
            <h2 className='text-lg text-black'>{JSONform?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{JSONform?.formSubHeading}</h2>
            <hr className='my-4' />
            <div className='flex justify-evenly'>
                <RWebShare
                    data={{
                        text: JSONform?.formSubHeading + "Build your own form in seconds",
                        url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
                        title: JSONform?.formTitle,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button variant='outline' size='sm' className='flex gap-2'><Share2 className='h-5 w-5' /> Share</Button>
                </RWebShare>
                <Link href={'/edit_forms/' + formRecord?.id}>
                    <Button size='sm' className='flex gap-2 bg-primary'><Edit className='h-5 w-5' /> Edit</Button>
                </Link>
            </div>
        </div>
    )
}

export default FormListItem
