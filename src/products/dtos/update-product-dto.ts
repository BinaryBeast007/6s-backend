import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductAvailabilityStatus } from '../enums/product-availability-status.enum';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  discount?: number;

  @IsOptional()
  @IsEnum(ProductAvailabilityStatus)
  @IsNotEmpty()
  status?: string;
}
