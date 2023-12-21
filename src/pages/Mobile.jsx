import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const shortid = require('shortid')
const Mobile = () => {
  const {username}= useAuth();
  const navigate=useNavigate();
  let token
  console.log(username)
  if(username){
    token= username.token;
  }else{
    token=null;
  }
  const { mobileId } = useParams();
  
  const [response, setResponse] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/mobile/get/${mobileId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
       
        setResponse(data);
        
        
        setLoading(false);
        
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    

    fetchTestDetails();
  }, [mobileId,token]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete=async (mobileId)=>{
    if(username){
      let token= username.token
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/mobile/${mobileId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`, // Add your authentication token
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate("/")
        // Remove the deleted test from the questions state
        
      } catch (error) {
        console.error(error);
      }
    }

  }
 
  const handleUpdate=(mobileId)=>{
      navigate(`/update/${mobileId}`)
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  
  async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
    const oid=shortid.generate()
    const price=response.price
    const title=response.name
    const imageUrl=response.imageUrl
    const createdBy= username.user.username
    const data ={price,oid,title,imageUrl,createdBy}
		let a = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/mobile/razorpay`, {
      method: 'POST', // or 'PUT'
      headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   })
    let txnRes = await a.json()
    console.log(txnRes)
   const amount= price*100
		console.log(data)

		const options = {
			key:  'rzp_test_NqBEWmLJAJOnjU' ,
			currency: "INR",
			amount: amount,
			order_id: txnRes.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			image: '',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
        navigate(`/order/${createdBy}`)

			},
			prefill: {
				name:username.user.username,
				// email: 'sdfdsjfh2@ndsfdf.com',
				// phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

  return (
    <>
    
        <div  className='bg-gradient-to-r from-black to-gray-600'>
                
                <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col ">
        
            <img className="lg:w-4/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded " alt="hero" src={response.imageUrl}/>
            
          
            
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font flex items-start sm:text-4xl text-3xl mb-4 font-medium text-white"><span className='font-Poppins text-cyan-600 mr-2'>Mobile Name:</span>{response.name}</h1>
              <h6 className="title-font flex items-start mb-4 font-medium text-white"><span className='font-Poppins text-cyan-600 mr-2'>Creator:</span>{response.createdBy}</h6>
              <p className="mb-8 flex items-start leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Price:</span>{response.price}</p>
              <p className="mb-8 flex items-start leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Processor:</span>{response.processor}</p>
              <p className="mb-8 flex items-start leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Operating SYstem:</span>{response.os}</p>
              <p className="mb-8 flex items-start leading-relaxed text-gray-400"><span className='font-Poppins text-cyan-600 mr-2'>Memory:</span>{response.memory}</p>
             {username.user.username===response.createdBy ?<div className='mt-10'>
              <button  onClick={() => handleDelete(mobileId)} className="inline-flex text-white bg-red-500 shadow-lg shadow-cyan-500/50 border-0 py-2 px-6 focus:outline-none hover:bg-red-800  hover:shadow-blue-500/50 rounded text-lg">Delete</button>
              <button onClick={() => handleUpdate(mobileId)} className="inline-flex text-white bg-green-500 shadow-lg shadow-cyan-500/50 border-0 py-2 px-6 focus:outline-none hover:bg-green-800  hover:shadow-blue-500/50 rounded text-lg ml-4">Update</button>
              </div> :<button onClick={displayRazorpay} className="inline-flex text-white bg-green-500 shadow-lg shadow-cyan-500/50 border-0 py-2 px-6 focus:outline-none hover:bg-green-800  hover:shadow-blue-500/50 rounded text-lg ml-4">Buy Now</button>}
              
            </div>
          </div>
        </section>

            </div>
   
    </>
  )
}

export default Mobile