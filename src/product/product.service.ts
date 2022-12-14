import { Injectable } from '@nestjs/common';
import { Product } from "./interfaces/product.interfaces";
import { Model } from "mongoose";
import { CreateProductDTO } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import {  Products } from './entity/user.entity';
import { MongoRepository } from 'typeorm';

const ObjectId = require('mongodb').ObjectId;

@Injectable()
export class ProductService {

    constructor(
        // @InjectModel('Product') private productModel: Model<Product>){}
        @InjectRepository(Products)
        private readonly productRepository: MongoRepository<Product>
    ){}

    async getProducts(): Promise<Product[]>{
        const products = await this.productRepository.find();
        return products;
    }
    // const product = await this.productRepository.findBy({
    //     _id: productId
    // })

    async getProduct(productID: string): Promise<Product>{
        const product = await this.productRepository.findOneBy({_id: ObjectId(productID)})
        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
        return await  this.productRepository.save(createProductDTO);
         
    }

    async deleteProduct(productId: string): Promise<any>{
        const delProduct = await this.productRepository.delete(productId);
        return delProduct;

    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<any>{
        // const updatedProduct = await this.productModel.findByIdAndUpdate(productId, createProductDTO, {new: true});
        const updatedProduct = await this.productRepository.update(productId, createProductDTO);
        return updatedProduct;
    }

    
}
