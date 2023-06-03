import { Schema } from "mongoose";
import { model } from 'mongoose';

const schema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    productos:{
        type: Array,
        required: true
    }
},
{
    timestamps: true,
})

export const CartModel = model('Cart', schema)