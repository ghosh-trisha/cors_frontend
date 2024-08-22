import React from 'react'
import { Label } from "flowbite-react";
import { Button, TextInput } from "flowbite-react";

function Fetch() {
  return (
    <>
      <div className='flex flex-col w-full items-center  min-h-screen'>


      <Button type="" className='w-28 mt-5 h-10'>Fetch</Button>


      <div className='mt-10 w-96'>
        <div className="mb-2 block">
          <Label htmlFor="getFiles" value="" />
        </div>
        <TextInput id="getFiles" type="number" placeholder="Enter the access code" required />
      </div>


      <Button type="submit" className='w-28 mt-12 h-10'>Get Files</Button>


      </div>
    </>
  )
}

export default Fetch
