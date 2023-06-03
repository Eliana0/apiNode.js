import { Schema } from "mongoose";
import { model } from 'mongoose';

const schema = new Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true,
    },
    descripcion:{
        type: Array,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
},
{
    timestamps: true,
})

export const ProductModel = model('Product', schema)