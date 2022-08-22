import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Products } from './product/entity/user.entity';

@Module({
  imports: [ProductModule, 
    // MongooseModule.forRoot('mongodb://localhost/products-nest-tutorial')],
    TypeOrmModule.forRoot({
      name: "default",
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // username: 'felipe.ramirez',
      // password: 'root',
      database: 'products-nest-tutorial',
      useNewUrlParser: true,
      autoLoadEntities: true,
      entities: [Products],
      synchronize: false,
      useUnifiedTopology: true
    }),
  ],
  
    controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
