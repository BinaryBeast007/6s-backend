import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { ProductAvailabilityStatus } from '../enums/product-availability-status.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;

  @IsEnum(ProductAvailabilityStatus)
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
