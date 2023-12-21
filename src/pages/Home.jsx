import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/authContext';
import "./bg.css"

import { useNavigate } from 'react-router-dom';
const Home = () => {
  console.log(process.env.REACT_APP_API_ENDPOINT)
  const navigate=useNavigate();
  const { username } = useAuth();
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null);
  useEffect(() => {
    // Use a try-catch block to handle errors
    
      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/mobile/getAll`);
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
  }, [username]);

  if (loading) {
    return <p className='font-Poppins flex justify-center items-center text-cyan-600 mr-2 text-2xl'>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleTakeTest = (mobileId) => {
    navigate(`/mobile/${mobileId}`);
  };
  const handleChange=async(e)=>{
    setQuery(e.target.value)
     
      try {
        
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/mobile/search?query=${query}`, {
          headers: {
            Authorization: `${username.token}`,
          },
        });
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error searching recipes:', error);
      }
  }
  
  return (
    <>
    
    <div className='shadow-lg shadow-cyan-500/50'>
    
    <div className='home-bg'>
     
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="  text-cyan-500 tracking-widest font-medium title-font mb-1">Mobie</h1>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-100">Unbox Innovation, Choose Your Mobile Story.</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-slate-300">Explore the World of Mobile Innovation: From Sleek Designs to Cutting-Edge Features, Find Your Perfect Device and Redefine Your Connectivity Experience with Our Mobile Selling Platform..</p>
        </div>
    </div>
    </div>
   
    <div>
      <div className='flex items-center justify-center'>
      <div className="relative w-2/6 mt-10 ">
                              <input type="text" id="title" value={query} onChange={handleChange} name="image" placeholder='Search here....'  className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-0 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded-2xl"/>
      </div>
      </div>
   
<section className="text-gray-600 mt-2 body-font">

  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {images.map((image)=>(
          <div key={image._id} className="p-4 md:w-1/3 shadow-2xl shadow-red-950	 mb-6  rounded-md ">
     

          <div className="h-full shadow-yellow-950 bg-gradient-to-r from-slate-800 to-gray-500 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={image.imageUrl} alt="blog"/>
            <div className="p-6 ">
             <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"><span className='font-Poppins text-cyan-600 mr-2'>Creator:</span>{image.createdBy}</h2>
              <h1 className="title-font text-lg font-medium text-indigo-300 mb-3">{image.name}</h1>
              <p className="leading-relaxed mb-3 text-gray-200"><span className='font-Poppins text-cyan-600 mr-2'>Price:</span>{image.price}</p>
              <div className="flex items-center flex-wrap ">
                {username?<button onClick={() => handleTakeTest(image._id)} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>:<a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" href='/login'>Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>}
                
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

export default Home