import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';
const Orders = () => {
    console.log(process.env.REACT_APP_API_ENDPOINT)
    const { createdBy } = useParams();
    const { username } = useAuth();
    const [images, setImages] = useState([]);
   
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null);
    useEffect(() => {
      // Use a try-catch block to handle errors
      
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/mobile/order/${createdBy}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setImages(data);
            console.log(data)
            setLoading(false); // Set loading to false
          } catch (error) {
            setError(error.message);
            setLoading(false); // Set loading to false
          }
        };
        fetchData();
    }, [username,createdBy]);
  
    if (loading) {
      return <p className='font-Poppins flex justify-center items-center text-cyan-600 mr-2 text-2xl'>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    
  return (
    <>
   
    <div className='shadow-lg shadow-cyan-500/50'>
    
    <div className='home-bg2'>
     
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="  text-cyan-500 tracking-widest font-medium title-font mb-1">Mobie</h1>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-100">Your Order History is here🛒</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-slate-300">At Our Mobile Marketplace, We Offer More Than Phones - We Bring You a Curated Collection of Smart Devices, Packed with the Latest Technology, All Designed to Elevate Your Daily Interactions.</p>
        </div>
    </div>
    </div>
   
    <div>
      
   
<section className="text-gray-600 mt-2 body-font">

  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {images.map((image)=>(
          <div key={image._id} className="p-4 md:w-1/3 shadow-2xl shadow-red-950	 mb-6  rounded-md ">
     

          <div className="h-full shadow-yellow-950 bg-gradient-to-r from-slate-800 to-gray-500 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={image.imageUrl} alt="blog"/>
            <div className="p-6 ">
             <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{image.createdBy}</h2>
              <h1 className="title-font text-lg font-medium text-indigo-300 mb-3">{image.title}</h1>
              <p className="leading-relaxed mb-3 text-gray-200"><span className='font-Poppins text-cyan-600 mr-2'>Price:</span>{image.price}</p>
              <p className="leading-relaxed mb-3 text-gray-200"><span className='font-Poppins text-cyan-600 mr-2'>Currency:</span>{image.currency}</p>
              <p className="leading-relaxed mb-3 text-gray-200"><span className='font-Poppins text-cyan-600 mr-2'>Receipt:</span>{image.receipt}</p>
              <div className="flex items-center flex-wrap ">
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
    </>
  )
}

export default Orders