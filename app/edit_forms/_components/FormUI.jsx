import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import FieldEdit from './FieldEdit'



const FormUI = ({ jsonForm, selectedTheme, onFieldUpdate, deleteField }) => { 

  return (
    <div className='border p-5 md:w-[600px] rounded-lg' data-theme={selectedTheme}>

      <h2 className='font-bold text-primary text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formSubHeading}</h2>

      {jsonForm?.formFields?.map((field, index) => (
        <div key={index} className='flex items-center gap-2'>
          {field.fieldType == 'select' ?
            <div className='w-full my-3'>
              <label className='text-sm text-primary'>{field.formLabel}</label>
              <Select>
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
                <label className='text-sm text-primary'>{field.formLabel}</label>
                <RadioGroup>
                  {field.options.map((option, index) => (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.label} id={option.label} />
                    <Label htmlFor={option.label}>{option.label}</Label>
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
                <label className='text-sm text-primary'>{field?.formLabel}</label>
                {field?.options?field?.options?.map((option, index) => (
                  <div className='flex gap-2 items-center'>
                    <Checkbox/>
                    <h2>{item.label}</h2>
                  </div>
                )):
                <div className='flex gap-2 items-center'>
                <Checkbox/>
                <h2>{field.label}</h2>
                </div>
                }
              </div>
              : <div className='w-full my-3'>
                <label className='text-sm text-primary'>{field.formLabel}</label>
                <Input type={field?.type}
                  placeholder={field.placeholderName}
                  name={field.fieldName} 
                  className="bg-transparent"/>
              </div>
          }
              <div>
                <FieldEdit defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={()=>deleteField(index)}
                />
              </div>
        </div>
      ))}
    </div>
  )
}

export default FormUI
