import React, { useState } from 'react';
import { Label } from "flowbite-react";
import { Button, TextInput } from "flowbite-react";
import AxiosHandler from '../utils/AxiosHandler.jsx';

function Fetch() {


  const [accessCode, setAccessCode] = useState('');
  const [fileUrls, setFileUrls] = useState([]);

  const handleAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
  };

  const handleFetchFiles = async () => {
    if (!accessCode) {
      console.log("Access code is required.");
      return;
    }

    const response = await AxiosHandler(
      'get',
      `/fetch/${accessCode}`
    );
    setFileUrls(response.data.data);
    console.log(response.data.data)
    console.log(fileUrls[0].url)
  };


  return (
    <>
      <div className='flex flex-col w-full items-center  min-h-screen'>


      <Button type="" className='w-28 mt-5 h-10'>Fetch</Button>


      {/* enter acces code */}
      <div className='mt-10 w-96'>
        <div className="mb-2 block">
          <Label htmlFor="getFiles" value="" />
        </div>
        <TextInput id="getFiles" type="number" placeholder="Enter the access code" required value={accessCode}
        onChange={handleAccessCodeChange} />
      </div>


      {/* click the get files button */}
      <Button type="submit" className='w-28 mt-12 h-10' onClick={handleFetchFiles}>Get Files</Button>
      
      <div className='mt-10 w-full'>
        {fileUrls.length > 0 ? (
          <ul>
            {fileUrls.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files found or an error occurred.</p>
        )}
      </div>

      </div>
    </>
  )
}

export default Fetch
