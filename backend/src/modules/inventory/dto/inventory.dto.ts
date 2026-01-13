import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  polymerType: string;

  @IsString()
  grade: string;

  @IsString()
  manufacturer: string;

  @IsNumber()
  quantity: number;

  @IsString()
  location: string;

  @IsNumber()
  basePrice: number;
}

export class InventoryFilterDto {
  @IsOptional()
  @IsString()
  polymerType?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  location?: string;
}