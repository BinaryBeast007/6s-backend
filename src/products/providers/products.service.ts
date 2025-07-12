import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/providers/categories.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../schemas/product.schema';
import { ProductCodeProvider } from './product-code.provider';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private categoriesService: CategoriesService,
    private productCodeProvider: ProductCodeProvider,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoriesService.findByName(
      createProductDto.category,
    );

    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    const product_code = this.productCodeProvider.generateProductCode(createProductDto.name);
    const productData = {
      ...createProductDto,
      product_code,
    };

    try {
      const createdProduct = new this.productModel(productData);
      return await createdProduct.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Product code already exists');
      }
      throw error;
    }
  }
}
