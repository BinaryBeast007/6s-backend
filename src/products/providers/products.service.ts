import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/providers/categories.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../schemas/product.schema';
import { ProductCodeProvider } from './product-code.provider';
import { UpdateProductDto } from '../dtos/update-product-dto';

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

    const product_code = this.productCodeProvider.generateProductCode(
      createProductDto.name,
    );
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

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateProductDto },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }

  async findAll(category?: string, name?: string): Promise<any[]> {
    let query = this.productModel.find();
    if (category) {
      query = query.where('category').equals(category);
    }
    if (name) {
      query = query.where('name').regex(new RegExp(name, 'i'));
    }
    const products = await query.exec();
    return products.map((product) => {
      const final_price = product.price * (1 - product.discount / 100);
      return {
        ...product.toObject(),
        final_price,
      };
    });
  }
}
