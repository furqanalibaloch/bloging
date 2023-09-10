"use client"
import React, { useState } from 'react'
import axios from 'axios'
// import Router from 'next/nevigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


function SignUp() {
const Route =useRouter();
    let [user, setuser] = useState({
        email: "",
        password: "",
        name: "",
        number: ""
    })

    const handleChange = (e) => {
        // console.log(e.target.name)
        setuser({ ...user, [e.target.name]: e.target.value })


    }

    const handleSubmit = () => {
      

console.log("test")
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/users/SignUp',
            headers: {
                'Content-Type': 'application/json'
             },
                 data: user   
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            alert(response.data.message)
            Route.push("/Components/User/Login")
          })
          .catch((error) => {
            console.log(error);
          });
    }



//     return (
//         <>
//             <h1>test</h1>
//             <div>
//             <Input type="text"
//                 handleChange={handleChange}
//                 placeholder={"Enter Name"} value={user.name}
//                 name="name" />
//                 </div>
//                 <div>
//             <Input
//                 handleChange={handleChange}
//                 type="email" placeholder={"Enter Email"} value={user.email} name="email" />
//                 </div>
//                 <div>
//             <Input
//                 handleChange={handleChange}
//                 type="password" placeholder={"Enter Password"} value={user.password} name="password" />
//                 </div>
//                 <div>
//             <Input
//                 handleChange={handleChange}
//                 type="number" placeholder={"Enter Number"} value={user.number} name="number" />
//             </div>
//             <button className='border-2' onClick={()=>submit()}>Create Account</button>
//             <div>
//                 <p>You Have Already Account Click </p>
//                 <button onClick={(submit)} className='background-color to-blue-600 '> Log In </button>
//             </div>
//         </>

//     )
// }

const gotosignup =()=>{
    Route.push('/Components/User/Login')
}

return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-x-4 border-t-4  border-green-400">
        <h1 className="text-xl text-center font-bold my-4 " >User Sign Up</h1>

        <div className="flex flex-col gap-3">
        <Input type="text"
                handleChange={handleChange}
                placeholder={"Enter Name"} value={user.name}
                name="name" />
                </div>
                <div>
            <Input
                handleChange={handleChange}
                type="email" placeholder={"Enter Email"} value={user.email} name="email" />
                </div>
                <div>
            <Input
                handleChange={handleChange}
                type="password" placeholder={"Enter Password"} value={user.password} name="password" />
                </div>
                <div>
            <Input
                handleChange={handleChange}
                type="number" placeholder={"Enter Number"} value={user.number} name="number" />
            </div>
          <button onClick={()=>handleSubmit()} className="bg-green-600 text-white w-80 mt-4 ml-10 font-bold cursor-pointer px-6 py-2">
            SignUp
          </button>

          
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 m-auto text-center rounded-md mt-2">
              
            
        


         
            <div>
            Already have an account?
             <span className="text-sm mt-3 text-middle no-underline cursor-pointer" onClick={gotosignup}>  Login</span>
        </div>
        </div>
        </div>
      </div>

  );
}

export const Input = ({ type, placeholder, value, name, handleChange }) => {
    return (
        <input className='border-2 '
            value={value}
            onChange={(e) => handleChange(e)}
            type={type} placeholder={placeholder} name={name} />
    )
}



export default SignUp