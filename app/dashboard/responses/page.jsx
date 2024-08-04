"use client"
import { db } from '@/configs'
import { Jsonforms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListResponse from './_components/FormListResponse'

const Responses = () => {

    const {user} = useUser();
    const [formlist, setFormList] = useState();

    useEffect(()=> {
        user&&getFormList();
    }, [user])

    const getFormList = async() => {
        const result = await db.select().from(Jsonforms)
        .where(eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress))
        
        console.log(result);
        setFormList(result);
    }


  return formlist&&(
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center justify-between'>
        Responses
      </h2>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
        {formlist&&formlist?.map((form, index) => (
            <FormListResponse
            JSONResponse={JSON.parse(form.jsonform)}
            formRecord={form}
            />
        ))}
      </div>
    </div>
  )
}

export default Responses
