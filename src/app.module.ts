import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/6s'),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
