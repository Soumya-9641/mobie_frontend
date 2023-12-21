import React, { useState } from 'react';
import "./bg.css"
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const CreateMobile = () => {
  const navigate=useNavigate();
  const { username } = useAuth();
 
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [type, setType] = useState('')
  const [image, setImage] = useState('')
  const [processor, setProcessor] = useState('')
  const [os, setOs] = useState('')
  const [memory, setMemory] = useState('')
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file);
  // };
  // const convertBase64=(e)=>{
  //     console.log(e);
  //     var reader= new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload=()=>{
  //         console.log(reader.result)
  //         setImage(reader.result)
  //     }
  //     reader.onerror=err=>{
  //       console.log("erro:",err)
  //     }
  // }name, price, type, processor, memory, os
  const handleCLick= async(e)=>{
    e.preventDefault();
    const dataTosend= {
      name,
      price,
      type,
      processor,
      memory,
      os,
      imageUrl:image,
      createdBy:username.user.username
    }
    console.log(dataTosend)
  //   const dataToSend = new FormData();
  // dataToSend.append('title', title);
  // dataToSend.append('description', description);
  // dataToSend.append('imageUrl', image); // Append the image file

  // // Append other data fields
  // dataToSend.append('ingredients', JSON.stringify(messages));
  // dataToSend.append('steps', JSON.stringify(steps));
  // dataToSend.append('createdBy', username.user.username);
    
    if(username){
      let token= username.token
      try {

        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/mobile/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(dataTosend),
         // body: dataToSend,
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Handle the response from the backend as needed
        const responseData = await response.json();
        console.log(responseData)
        console.log('Response from the backend:', responseData);
        navigate("/")
      } catch (error) {
        console.error(error);
      }
    }
    console.log(dataTosend)
  }
  return (
    <>
    <div  className='bg-gradient-to-l from-black to-gray-600'>
      <div className='shadow-lg shadow-cyan-500/50'>
            <div className= "bg">
              <div className="flex flex-col justify-center text-center w-full mb-20">
                      <h1 className="title-font  sm:text-4xl text-3xl flex justify-center mt-20 mb-10 font-medium text-gray-200">Create Your Favourite mobile for sell👌</h1>
                      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-slate-100">Phones that Speak Your Style, Service that Speaks Your Language.</p>
              </div>
            </div>
        </div>
    <div>
    <section className="text-gray-100 body-font">
        <div className="container  mx-auto flex px-5 py-10 mt-10 items-center justify-center flex-col">
              <div className="text-center lg:w-2/3 w-full">
              
                <div className="container px-5 py-4 mx-auto">
                    <div className="lg:w-1/2 md:w-2/3 mx-auto bg-gray-900 px-10 py-10 rounded-2xl shadow-2xl shadow-red-950	">
                      {/* <input type="file" className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-400
                        hover:file:bg-violet-100
                      "
                      onChange={handleImageChange}
                      /> */}
                    
                      <div className="flex flex-wrap -m-2">
                      <div className="p-2 w-full">
                          <div className="relative">
                              <label for="email" className="leading-7 text-md text-lime-600 flex justify-start">Image Url</label>
                              <input type="text" id="title" name="image" value={image} onChange={(e)=>{setImage(e.target.value)}} className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                              <label for="email" className="leading-7 text-md text-lime-600 flex justify-start">Name</label>
                              <input type="text" id="title" name="title" value={name} onChange={(e)=>{setName(e.target.value)}} className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label for="message" className="leading-7 text-md text-lime-600 flex justify-start">Price</label>
                            
                            <input type="text" id="desc" name="desc" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label for="message" className="leading-7 text-md text-lime-600 flex justify-start">Type</label>
                            
                            <input type="text" id="desc" name="desc" value={type} onChange={(e)=>{setType(e.target.value)}} className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label for="message" className="leading-7 text-md text-lime-600 flex justify-start">Processor</label>
                            
                            <input type="text" id="desc" name="desc" value={processor} onChange={(e)=>{setProcessor(e.target.value)}} className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label for="message" className="leading-7 text-md text-lime-600 flex justify-start">OS</label>
                            
                            <input type="text" id="desc" name="desc" value={os} onChange={(e)=>{setOs(e.target.value)}} className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label for="message" className="leading-7 text-md text-lime-600 flex justify-start">Memory</label>
                            
                            <input type="text" id="desc" name="desc" value={memory} onChange={(e)=>{setMemory(e.target.value)}} className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            
                          </div>
                        </div>
                     
                     
                        <div className="p-2 w-full  border-t border-gray-200 text-center">
                        <button onClick={handleCLick} className="flex mx-auto text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 border-0 py-2 px-4 focus:outline-none hover:bg-blue-500  hover:shadow-blue-500/50 rounded text-sm">Submit</button>
                        </div>
                      </div>
                    </div>
              </div>
              
              </div>
        </div>
</section>
    </div>
    </div>
    </>
  )
}

export default CreateMobile