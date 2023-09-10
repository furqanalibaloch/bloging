import mongoose from "mongoose";
import {ConnectLink} from "../../lib/db"
import { NextResponse } from "next/server";
import { BlogModel } from "../../../app/lib/Model/BlogsSchema";


export async function GET (){

// let data = request.json()

    await mongoose.connect(ConnectLink)
    .then((res)=>{
        console.log("get api run") 
    })
 
    let res = await BlogModel.find()


    return NextResponse.json({
        data: res,
        message:"api run",
        status:true
    })

}