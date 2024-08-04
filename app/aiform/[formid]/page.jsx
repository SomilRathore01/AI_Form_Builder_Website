"use client"
import FormUI from '@/app/edit_forms/_components/FormUI'
import { db } from '@/configs'
import { Jsonforms } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LiveAIForm = ({params}) => {

  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);
  const [jsonstyles, setJsonstyles] = useState([]);

  useEffect(() => {
    console.log(params)
    params&&GetFormData()
  }, [params])

  const GetFormData = async() => {
    const result = await db.select().from(Jsonforms).where(eq(Jsonforms.id, Number(params?.formid)))

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
    setJsonstyles(JSON.parse(result[0].styles));
    console.log(result);
  }

  return (
    <div className='p-10 flex items-center justify-center' style={{backgroundImage: record?.background}}>
      <FormUI
      jsonForm={jsonForm}
      onFieldUpdate={() => console.log}
      deleteField={()=> console.log}
      selectedTheme={record?.theme}
      selectedStyle={jsonstyles}
      editable={false}
      formId={record?.id}
      />
      <Link className='flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5  cursor-pointer' href={process.env.NEXT_PUBLIC_BASE_URL}>
        Build Your Own Form
      </Link>
    </div>
  )
}

export default LiveAIForm
