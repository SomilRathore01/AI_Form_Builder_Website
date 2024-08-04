import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Themes from '@/app/_data/Themes'
import Gradients from '@/app/_data/Gradient_Bg'
import { Button } from '@/components/ui/button'
import Styles from '@/app/_data/Style'


const Controller = ({ selectedTheme, selectedBG, selectedStyle }) => {
  const [showmore, setShowMore] = useState(6);
  return (
    <div>
      {/* Theme Selection Controller */}
      <h2 className='my-1'>Select Theme</h2>
      <Select onValueChange={(value) => selectedTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, index) => (
            <SelectItem value={theme.name} key={index}>
              <div className='flex gap-3'>
                <div className='flex'>
                  <div className='h-5 w-5 rounded-l-md' style={{ backgroundColor: theme.primary }}>
                  </div>
                  <div className='h-5 w-5' style={{ backgroundColor: theme.secondary }}>
                  </div>
                  <div className='h-5 w-5' style={{ backgroundColor: theme.accent }}>
                  </div>
                  <div className='h-5 w-5 rounded-r-md' style={{ backgroundColor: theme.neutral }}>
                  </div>
                </div>
                {theme.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Background Selection Controller */}
      <h2 className='mt-8 my-1'>Background</h2>
      <div className='grid grid-cols-3 gap-5'>
        {Gradients.map((bg, index) => (index < showmore) && (
          <div key={index} onClick={() => selectedBG(bg.gradient)} className='w-full cursor cursor-pointer h-[70px] rounded-lg hover:border-black hover:border-2 flex items-center justify-center' style={{ background: bg.gradient }}>
            {index == 0 && 'None'}
          </div>
        ))}
      </div>
      <Button onClick={() => setShowMore(showmore > 6 ? 6 : 20)} variant='ghost' size='sm' className='w-full my-1'>
        {showmore > 6 ? "Show Less" : "Show More"}
      </Button>

      {/* Style section controller */}
      <div>
        <label className='my-2'>Styles</label>
        <div className='grid grid-cols-3 gap-3'>
          {Styles.map((item, index) => (
            <div key={index}>
              <div className='w-25 h-10 flex items-center justify-center border-2 rounded-lg hover:bg-primary' onClick={() => selectedStyle(item.name, item.value, item.key)}>
                <h2 className='cursor-pointer text-center'>{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Controller
