import { PartialType } from '@nestjs/mapped-types';
import { AddPartnerDto } from './add-partner.dto';

export class RemovePartnerDto extends PartialType(AddPartnerDto) {}
