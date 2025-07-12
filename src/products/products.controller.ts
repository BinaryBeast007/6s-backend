import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './providers/products.service';
import { UpdateProductDto } from './dtos/update-product-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.create(createProductDto);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.updateProduct(id, updateProductDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll(@Query('category') category?: string, @Query('name') name?: string) {
    try {
      return this.productsService.findAll(category, name);
    } catch (error) {
      throw error;
    }
  }
}
