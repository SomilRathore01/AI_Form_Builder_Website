"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AichatSession } from '@/configs/AiModal'
import { useUser } from '@clerk/nextjs'
import { Jsonforms } from '@/configs/schema'
import moment from 'moment/moment'
import { db } from '@/configs'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const PROMPT = "On the basis of description please give form in JSON format with form title, form sub-heading with form having form having form field, form name, placeholder name, and form label, field type, field required in JSON format"

const CreateForm = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState();
    const {user} = useUser();
    const route = useRouter();
    
    const oncreateform = async () => {
        console.log(userInput);
        setLoading(true);
        const result = await AichatSession.sendMessage("Description:" + userInput + PROMPT);
        console.log(result.response.text());
        if(result.response.text()){
            const res = await db.insert(Jsonforms).values({
                jsonform:result.response.text(),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdDate: moment().format('DD/MM/YYYY')
            }).returning ({id:Jsonforms.id});
            console.log("New Form Id",res[0].id);
            if(res[0].id){
                route.push('/edit_forms/'+res[0].id)
            }
            setLoading(false);
        }
        setLoading(false);
    }
    return (
        <div>
            <Button onClick={()=>setOpenDialog(true)}>Create Form</Button>
            <Dialog open = {openDialog}>
                
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Form</DialogTitle>
                        <DialogDescription>
                            <Textarea className='my-2' 
                            onChange={(e)=>setUserInput(e.target.value)}
                            placeholder="Write the description about your form"/>
                            <div className='flex gap-2 my-3 justify-end'>
                                <Button onClick={()=>setOpenDialog(false)} variant='destructive'>Cancel</Button>
                                <Button disabled={loading} onClick={()=>oncreateform()}>{loading? <Loader2 className='animate-spin'/>: 'Create'}</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateForm
