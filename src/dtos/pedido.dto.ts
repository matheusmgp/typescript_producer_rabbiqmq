import { Item } from '@src/pedido.model';
import { MinLength, IsNumber, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class PeditoDto {
  @IsNotEmpty()
  @IsNumber()
  numero: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(14)
  cnpj: string;
  items: Item[];
  @IsBoolean()
  status: boolean;
}
