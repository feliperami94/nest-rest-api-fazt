import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { JoiValidationPipe } from 'src/joi-validation.pipe';
import { CreateProductDTO } from "./dto/product.dto";
import { ProductService } from "./product.service";
import {productJoiSchema} from "./schemas/joi-validation.product.schema"


@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body(new JoiValidationPipe(productJoiSchema)) createProductDTO: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO)
        return res.status(HttpStatus.OK).json({
            msg: 'Product Successfully Created',
            product
        })
    }

    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products
        })
    }

    @Get('/:productId')
    async getProduct(@Res() res,  @Param('productId') productId: string){
        const product = await this.productService.getProduct(productId)
        if(!product){
        throw new NotFoundException('Product doesn´t exists');
        }
        return res.status(HttpStatus.OK).json(product);
    }

   @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productId') productId){///delete?productId=<productId>
        const productDeleted = await this.productService.deleteProduct(productId);
        // console.log(productDeleted)
        if(!productDeleted){
            throw new NotFoundException('Product doesn´t exists');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });

    }

    @Put('/update')
    async updateProduct(@Res() res, @Body(new JoiValidationPipe(productJoiSchema)) createProductDTO: CreateProductDTO, @Query('productId') productId){
        const updatedProduct = await this.productService.updateProduct(productId, createProductDTO);
        if(!updatedProduct){
            throw new NotFoundException('Product doesn´t exists');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct});

    } 



}
