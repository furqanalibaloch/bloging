import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../lib/db';
import { BlogModel } from '../../../lib/Model/BlogsSchema';

export async function DELETE(request, content) {

    let id = content.params.blogid
console.log(id)
    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

// let obj =  {}
    let res = await BlogModel.deleteOne({_id:id})


    return NextResponse.json({
        data:res,
        message: "test",
        status:true
    })


}



export async function PUT(request, content) {
    let data = await request.json()
    let id = content.params.blogid
    const ID = { _id: id }
    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let dataforPut = await BlogModel.findOneAndUpdate(ID,data)
    
    return NextResponse.json({
        
        data: dataforPut,
        message:"true api",
        status:true
    })
}

