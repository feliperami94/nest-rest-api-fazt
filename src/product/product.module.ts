import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
// import { MongooseModule } from "@nestjs/mongoose";
// import { ProductSchema } from './schemas/product.schema';
import { Products } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  // imports: [MongooseModule.forFeature([
  //   {name: 'Product', schema: ProductSchema}
  // ])],
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
