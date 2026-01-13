import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateMarginDto {
  @IsString()
  polymerType: string;

  @IsString()
  marginType: string;

  @IsNumber()
  marginValue: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateMarginDto {
  @IsOptional()
  @IsString()
  polymerType?: string;

  @IsOptional()
  @IsString()
  marginType?: string;

  @IsOptional()
  @IsNumber()
  marginValue?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}