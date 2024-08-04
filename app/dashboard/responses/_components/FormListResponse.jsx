"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { LoaderIcon } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'

const FormListResponse = ({ JSONResponse, formRecord }) => {
    
    const [loading, setLoading] = useState(false);

    const ExportData = async() =>{
        let jsonData=[];
        setLoading(true);
        const result = await db.select().from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id))

        console.log(result);
        if(result){
            result.forEach((item)=>{
                const jsonItem=JSON.parse(item.jsonResponse);
                jsonData.push(jsonItem);
            })
            setLoading(false);
        }
        console.log(jsonData);
        exportToExcel(jsonData);
    }

    // Convert json data to excel file to download it
    const exportToExcel=(jsonData)=>{
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, JSONResponse?.formTitle+".xlsx");
    }

    return (
        <div className='border shadow-sm rounded-lg p-4 my-5'>
            <h2 className='text-lg text-black'>{JSONResponse?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{JSONResponse?.formSubHeading}</h2>
            <hr className='my-4' />
            <div className='flex justify-between'>
                <Button className='bg-primary' size='sm'
                onClick={() => ExportData()}
                disabled={loading}
                >
                    {loading?<LoaderIcon className='animate-spin'/>:'Export'}
                </Button>
            </div>
        </div>

    )
}

export default FormListResponse
