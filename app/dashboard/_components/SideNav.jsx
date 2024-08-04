import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LibraryBig, LineChart, MessageSquare, Settings, Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import CreateForm from './CreateForm'

const SideNav = () => {
    const menulist = [
        {
            id:1,
            name:'My Forms',
            icon: LibraryBig,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Responses',
            icon: MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:3,
            name:'Analytics',
            icon: LineChart,
            path:'/dashboard/analysis'
        },
        {
            id:4,
            name:'Settings',
            icon: Settings,
            path:'/dashboard/settings'
        },
    ]

    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [path]);
  return (
    <div className='h-screen shadow-md border'>
      <div className='p-5'>
        {menulist.map((menu, index)=> (
            <Link href={menu.path} key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500
            ${path == menu.path && 'bg-primary text-white'}
            `}>
                <menu.icon/>
                {menu.name}
            </Link>
        ))}
      </div>
      <div className='fixed bottom-0 p-6 w-64'>
        <CreateForm/>
        
      </div>
    </div>
  )
}

export default SideNav
