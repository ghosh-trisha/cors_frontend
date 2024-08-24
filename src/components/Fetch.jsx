import React, { useState } from 'react';
import { Label } from "flowbite-react";
import { Button, TextInput } from "flowbite-react";
import AxiosHandler from '../utils/AxiosHandler.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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


        {/* output div  */}
        <div className='m-10 p-4 pl-10 pr-10 max-w-full dark:text-white border border-[#374151] rounded-lg'>
          {fileUrls.length > 0 ? (
            <ol type='1' style={{ listStyleType: 'decimal' }}>
              {fileUrls.map((file, index) => (
                <li key={index}>

                  {/* show the file name  */}
                  <a className='hover:text-[#0891B2]' href={file.url} target="_blank" rel="noopener noreferrer">&nbsp; {file.url.split('/').pop()}</a>
                  {/* show the download button  */}
                  <a
                    href={`http://localhost:3000/api/v1/cors/download/${accessCode}/${file.url.split('/').pop()}`}
                    download
                    className='ml-4 text-[#0891B2] hover:text-[#0891B2]'
                  > 
                  <FontAwesomeIcon icon={faDownload} className='mr-2' />
                  </a>

                </li>


              ))}
            </ol>
          ) : (
            <p>No files found or an error occurred.</p>
          )}
        </div>
        {/* end of output div  */}



      </div>
    </>
  )
}

export default Fetch
