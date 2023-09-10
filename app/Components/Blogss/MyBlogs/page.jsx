

"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";
import './myblogs.css'



function myblogs() {
    const [showModal, setShowModal] = useState(false);

    let [val, setval] = useState({
        mtitle: "",
        mdescription: "",
        mimg_url: ""

    })
    
    const [res, setRes] = useState([]);
    const [title, settitle] = useState([]);
    const [description, setdescription] = useState([]);
    const [imagelink, setimagelink] = useState([]);


    useEffect(() => {
        const blogid = localStorage.getItem("blogid");


        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/Blogs',
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setRes(response.data.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }

    }, []);

    const getData = () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/Blogs',
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setRes(response.data.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    }


    const submitData = () => {
        let data = JSON.stringify({
            title: title.toString(),
            description: description.toString(),
            imagelink: imagelink.toString(),
            userid: localStorage.getItem('user_id')

        });

        console.log(data)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/Blogs',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                getData()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const Dlt = (e) => {

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/Blogs/${e}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const Edt = (blogid) => {
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/Blogs/${blogid}`, // Use the Blog ID in the URL
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                title: val.mtitle,
                description: val.mdescription,
                imagelink: val.mimg_url
            }
        };
    
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (

        <div className="min-h-screen    p-4">
            <div className="bg-blue-500 py-4 px-8 text-white">
                <div className="text-3x1 font-semibold  text-lg">Personal Bloging App</div>
                <Link href="/Components/Blogss/Home">All Blogs</Link>
            </div>
            <div className=" border border-solid w-1/2 items-center border-white p-4 bg-green-600" style={{ margin: "auto", marginTop: "20px", width: "100%" }}>
                <div>
                    <h1 className="text-3xl font-semibold mb-4 text-gray text-center">Dashboard</h1>
                </div>
                <div className="text-3xl font-semibold mb-4 text-gray  text-black text-center">
                    <input
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        className="w-3/ bg-white" type="text" id="inputField" name="inputField" placeholder="Blog title" />
                </div>
                <br />
                <div className="text-3xl  text-black  font-semibold mb-4 text-gray text-center">
                    <textarea
                        value={description}
                        onChange={(e) => setdescription(e.target.value)} className="w-3/4 bg-white" id="textareaField" name="textareaField" rows="4" placeholder="Write your Blog"></textarea>
                </div>
                <div className="text-3xl  text-black  font-semibold mb-4 text-gray text-center">
                    <input
                        value={imagelink}
                        onChange={(e) => setimagelink(e.target.value)}
                        className="w-3/4 bg-white" type="text" id="inputField" name="inputField" placeholder="Put Image URL" />
                </div>


                <div className="text-3xl font-semibold mb-4 text-gray text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"

                        onClick={() => submitData()}
                    >Publish Blog</button>
                </div>
            </div>

            <div>

                <div className="referral-heading-container">
                    <div className="thin-line-left" data-aos="" data-aos-delay="300"></div>
                    <h2 className="referral-heading mt-40  heading_my_blog">  My blogs</h2>
                    <div className="thin-line-right" data-aos="fade-left" data-aos-delay="300" ></div>
                </div>
                <br />




                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
                    
                    {res.map((v,i)=>{
                        
                        return(
                            <>
                            <div className=" border border-solid w-1/2 items-center border-white p-4 h-full" style={{ margin: "auto", marginTop: "20px", width: "100%", height: "50%"}}>
                                <div className="bg-gray-100 p-4  h-full ">
                                    {/* Replace 'your_image.jpg' with the actual image URL */}
                                    <img
                                        src={v.imagelink}
                                        alt="Image Description"
                                        // Set the desired height
                                        className="rounded-lg w-full "
                                    />
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    {/* Card content goes here */}
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">${v.title}</h2>
                                    <p className="text-gray-700">
                                        {v.description}
                                    </p>
                                    <div className="mt-4">
                                        <button onClick={() => Dlt(v._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(v._id)}
                                        >
                                            Edit Blogs
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                            {/*content*/}
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">
                                                        Edit Blogs
                                                        
                                                    </h3>
                                                    
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                        </span>
                                                    </button>
                                                </div>
                                                {/*body*/}
                                                <div className="relative p-6 flex-auto justify-center">
                                                    <input onChange={(e) => setval({ ...val, [e.target.name]: e.target.value })} className="my-3" type="text" placeholder="Title" name="mtitle"  />
                                                    <input onChange={(e) => setval({ ...val, [e.target.name]: e.target.value })} className="my-3" type="text" placeholder="Description" name="mdescription" />
                                                    <input onChange={(e) => setval({ ...val, [e.target.name]: e.target.value })} className="my-3" type="text" placeholder="Img_url" name="mimg_url" />
                                               
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>Edt(v._id)}
                                                        
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}


                        </>
                        )
                    })}
                </div>
            </div>
        </div>

    );

}

export default myblogs;