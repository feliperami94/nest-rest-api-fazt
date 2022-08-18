import { Injectable } from '@nestjs/common';
import { Product } from "./interfaces/product.interfaces";
import { Model } from "mongoose";
import { CreateProductDTO } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private productModel: Model<Product>){}

    async getProducts(): Promise<Product[]>{
        const products = await this.productModel.find();
        return products
    }

    async getProduct(productId: string): Promise<Product>{
        const product = await this.productModel.findById(productId)
        return product
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
        const product =  new this.productModel(createProductDTO);
        return await product.save();
    }

    async deleteProduct(productId: string): Promise<Product>{
        const delProduct = await this.productModel.findByIdAndDelete(productId);
        return delProduct;
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product>{
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, createProductDTO, {new: true});
        return updatedProduct;
    }

    
}
