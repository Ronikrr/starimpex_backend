import { ID_REGEX } from '@/utils/regex';
import { IsString, Matches } from 'class-validator';

export class ParamsObjectIdDto {
  @IsString()
  @Matches(ID_REGEX)
  public id: string;
}
