"use client"
import { db } from '@/configs';
import { Jsonforms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';

const FormList = () => {

    const {user} = useUser();
    const [formlist, setFormlist] = useState([]);

    useEffect(()=>{
        user&&GetFormList();
    }, [user])

    const GetFormList = async() => {
        const result = await db.select().from(Jsonforms)
        .where(eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Jsonforms.id))

        console.log(result);
        setFormlist(result);
    }

  return (
    <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
      {formlist.map((form, index)=> (
        <div>
            <FormListItem JSONform={JSON.parse(form.jsonform)} formRecord={form} refreshData={GetFormList} />
        </div>
      ))}
    </div>
  )
}

export default FormList
