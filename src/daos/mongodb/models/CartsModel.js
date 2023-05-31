import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: {type: Array, default: []}
});

export const CartsModel = mongoose.model(
    'carts',
    cartsSchema 
);