import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class UserDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  pass: string;
}
