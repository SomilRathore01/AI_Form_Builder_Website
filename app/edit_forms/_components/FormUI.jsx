import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useRef, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import FieldEdit from './FieldEdit'
import { Button } from '@/components/ui/button'
import { userResponses } from '@/configs/schema'
import moment from 'moment'
import { toast } from 'sonner'
import { db } from '@/configs'


  
const FormUI = ({ jsonForm, selectedTheme, selectedStyle, onFieldUpdate, deleteField, editable=true, formId=0 }) => { 
  const applyStyle = selectedStyle ? { [selectedStyle.key]: selectedStyle.value } : {};
  // For saving user input data through form in database
  const [formData, setFormData] = useState();
  let formRef = useRef();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCheckboxChange = (fieldName, itemName, value) => {
    console.log(fieldName, itemName, value);
    const list = formData?.[fieldName]?formData?.[fieldName]: [];
    console.log(list);
    if(value){
      list.push({
        label: itemName,
        value:value
      })
      setFormData({
        ...formData,
        [fieldName]:list
      })
    }
    else{
      const res = list.filter((item)=> item.label == itemName);
      setFormData({
        ...formData,
        [fieldName]:res
      })
    }
    
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    
    const result = await db.insert(userResponses)
    .values({
      jsonResponse: formData,
      createdAt: moment().format('dd/mm/yyyy'),
      formRef: formId
    })

    if(result){
      formRef.reset();
      toast.success('Response Submitted successfully')
    }
    else{
      toast.warning('Internal Server Error')
    }
  }

  return (
    <form ref={(e)=> formRef=e} onSubmit={onFormSubmit} className='border p-5 md:w-[600px] rounded-lg' data-theme={selectedTheme} style={applyStyle}>

      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formSubHeading}</h2>

      {jsonForm?.formFields?.map((field, index) => (
        <div key={index} className='flex items-center gap-2'>
          {field.fieldType == 'select' ?
            <div className='w-full my-3'>
              <label className='text-sm'>{field.formLabel}</label>
              <Select required={field?.fieldRequired} onValueChange={(v)=> handleSelectChange(field.fieldName, v)} >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholderName} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            : field.fieldType == 'radio' ?
              <div className='w-full my-3'>
                <label className='text-sm'>{field.formLabel}</label>
                <RadioGroup required={field?.fieldRequired}>
                  {field.options.map((option, index) => (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} 
                    onClick={()=>handleSelectChange(field.fieldName, option)} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                </RadioGroup>
              </div>
              : field.fieldType=='checkbox'?
              <div className='w-full my-3'>
                <label className='text-sm'>{field?.formLabel}</label>
                {field?.options?field?.options?.map((option, index) => (
                  <div className='flex gap-2 items-center'>
                    <Checkbox onCheckedChange={(v) => handleCheckboxChange(field?.formLabel, option, v)} />
                    <h2>{option.label}</h2>
                  </div>
                )):
                <div className='flex gap-2 items-center'>
                <Checkbox required={field?.fieldRequired}/>
                <h2>{field.label}</h2>
                </div>
                }
              </div>
              : <div className='w-full my-3'>
                <label className='text-sm'>{field.formLabel}</label>
                <Input type={field?.fieldType}
                  placeholder={field.placeholderName}
                  name={field.fieldName} 
                  className="bg-transparent"
                  required={field?.fieldRequired}
                  onChange={(e) => handleInputChange(e)}/>
              </div>
          }
              {editable && <div>
                <FieldEdit defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={()=>deleteField(index)}
                />
              </div>}
        </div>
      ))}
      <Button type='submit' className='btn btn-primary'>Submit</Button>
    </form>
  )
}

export default FormUI
