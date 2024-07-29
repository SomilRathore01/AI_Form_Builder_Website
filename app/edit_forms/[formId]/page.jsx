"use client"
import { db } from '@/configs'
import { Jsonforms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUI from '../_components/FormUI'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'



const EditForm = ({ params }) => {
    const { user } = useUser();
    const [jsonForm, setJsonForm] = useState([]);
    const router = useRouter();
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState([]);
    const [selectedTheme, setselectedTheme] = useState('light')

    useEffect(() => {
        user && GetFormData();
    }, [user])

    const GetFormData = async () => {
        const result = await db.select().from(Jsonforms).where(and(eq(Jsonforms.id, params.formId), eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress)));
        setRecord(result[0])
        console.log(JSON.parse(result[0].jsonform));
        setJsonForm(JSON.parse(result[0].jsonform))
    }

    useEffect(() => {
        if (updateTrigger) {
            setJsonForm(jsonForm);
            updateforminDB();
        }
    }, [updateTrigger])

    const onFieldUpdate = (value, index) => {
        jsonForm.formFields[index].formLabel = value.label
        jsonForm.formFields[index].placeholderName = value.placeholder
        console.log(jsonForm);
        setUpdateTrigger(Date.now());
    }

    const updateforminDB = async () => {
        const res = await db.update(Jsonforms)
            .set({
                jsonform: jsonForm
            }).where(and(eq(Jsonforms.id, record.id)), eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .returning({ id: Jsonforms.id })
        toast.success("Form Updated Successfully")
        console.log(res);
    }

    const deleteField = (indextoremove) => {
        const res = jsonForm.formFields.filter((item, index) => index != indextoremove)
        console.log(res);
        jsonForm.formFields = res;
        setUpdateTrigger(Date.now())

    }

    return (
        <div className='p-10'>
            <div className='flex justify-between items-center'>
                <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' onClick={() => router.back()}>
                    <ArrowLeft />Back
                </h2>
                <div className='flex gap-2'>
                    <Link href={'/aiform/'+record?.id} target='_blank'>
                    <Button className='flex gap-2'><SquareArrowOutUpRight className='h-5 w-5'/>Live Preview</Button>
                    </Link>
                    <Button className='flex gap-2'><Share2 className='h-5 w-5'/>Share</Button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='p-5 border rounded-lg shadow-md'>
                    Contoller
                </div>
                <div className='md:col-span-2 border rounder-lg shadow-md p-4 flex items-center justify-center'>
                    <FormUI jsonForm={jsonForm} selectedTheme={selectedTheme} onFieldUpdate={onFieldUpdate} deleteField={(index) => deleteField(index)} />
                </div>
            </div>
        </div>
    )
}

export default EditForm