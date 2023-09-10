import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../lib/db'
import axios from 'axios';
import {BlogModel} from '../../lib/Model/BlogsSchema'

export async function GET() {

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let res = await BlogModel.find({})

    return NextResponse.json({
        data: res,
        message: "GET aLL RES"
    })

}

export async function POST(request, content) {

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let body = await request.json()

    if (!body.title || !body.imagelink || !body.userid) {

        return NextResponse.json({
            message: "Missing Required Field"
        })

    }
    else {

        let res = BlogModel(body)
        await res.save()

        return NextResponse.json({
            message: "add new res",
            data: res
        })


    }


    return NextResponse.json({
        message: "test"
    })
}

export default async function handler(req, res) {
  try {
    const userId = localStorage.getItem("user_id");
    const response = await axios.get(`http://localhost:3000/api/Blogs/MyBlogs/${userId}`);
    const data = response.data.data;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}