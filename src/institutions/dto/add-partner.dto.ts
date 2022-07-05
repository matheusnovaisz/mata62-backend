import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddPartnerDto {
  @IsNumber()
  @IsNotEmpty()
  partner_id: number;
}
