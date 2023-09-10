
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../lib/db'
import { USERMODEL } from '../../../lib/Model/userSchema'

export async function POST(request, content) {
    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let data = await request.json()

    let checkuser = await USERMODEL.findOne({ email: data.email })

    if (checkuser != null) {
        if (checkuser.password == data.password) {
            return NextResponse.json({
                message: "User Login",
                data: checkuser
            })
        }
        else {
            // Password is incorrect, prevent navigation
            return NextResponse.json({
                message: "Password incorrect",
                data: []
            })
        }
    }
    else {
        // User not found, prevent navigation
        return NextResponse.json({
            message: "User not found",
            data: []
        })
    }
}
