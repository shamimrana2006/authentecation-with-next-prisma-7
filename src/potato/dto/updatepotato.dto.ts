import { PartialType } from '@nestjs/swagger';

import { createpotatodto } from './create.dto';

export class updatepotatodto extends PartialType(createpotatodto) {}
