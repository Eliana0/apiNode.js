import { Schema } from "mongoose";
import { model } from 'mongoose';

const schema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        max:20,
        min: 5
    },
    thumbnail:{
        type: String,
    },
    cart:{
        type: String,
        required: true
    }
},
/* {
    timestamps: true,
} */)

export const UserModel = model('Users', schema)