import { PaginateQueryDto } from '@vsp/backend-shared/paginate';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  make!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  model!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1886)
  @Max(2100)
  year?: number;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  make?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  model?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1886)
  @Max(2100)
  year?: number;
}

export class ListVehiclesQueryDto extends PaginateQueryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userId?: string;
}
