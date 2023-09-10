"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";

import Navbar from '../../../Components/navbar/Navebar'
import './AllBlogs.css'

function Home() {

    
let [data,setdata]=useState([])
console.log(data)
    useEffect(() => {


        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/getallblogs',
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {

setdata(
    response.data.data
)

          })
          .catch((error) => {
            console.log(error);
          });
    }, [])



    return (
        <>


            <Navbar />

           

            <div className="referral-heading-container">
                <div className="thin-line-left" data-aos="" data-aos-delay="300"></div>
                <h2 className="referral-heading mt-40  heading_my_blogs">  All blogs </h2>
                <div className="thin-line-right" data-aos="fade-left" data-aos-delay="300" ></div>
            </div>


            {
              data.map((v, i) => {

                    return (
                        <div className="border-2  mx-auto  mt-5  w-1/3   ">
                        <div >

                            <h1 className="text-7xl  text-center">{v.title}</h1>
                            <img src={v.imagelink} className="w-full" />
                            {v.description != null
                                ?
                                <>
                                    <b>{v.description}</b>
                                    <br />
                                </>
                                :
                                <b></b>
                            }
                            {v.location != null
                                ?
                                <>
                                    <b>{v.location}</b>
                                    <br />
                                </>
                                :
                                <b></b>
                            }
                            {v.rating != null
                                ?
                                <>
                                    <b>{v.rating}</b>
                                    <br />
                                </>
                                :
                                <b></b>
                            }
                            {/* <b>{v.userid}</b> */}

                        </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Home;