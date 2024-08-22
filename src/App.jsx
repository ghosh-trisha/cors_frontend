import React from 'react'
import { Button } from "flowbite-react";
import DarkMode from './components/DarkMode.jsx';
import Upload from './components/Upload.jsx';
import Fetch from './components/Fetch.jsx';


export default function App() {
  return (
    <>
     <div className="min-h-screen w-screen grid max-md:grid-cols-1 grid-cols-2 gap-4 dark:bg-black">

        <DarkMode />

        <div className='border-b-4  md:border-r-4 border-gray-700'>
          <Upload className='' />
        </div>

        <div>
          <Fetch className='' />
        </div>

      </div> 
    </>
  )
}
