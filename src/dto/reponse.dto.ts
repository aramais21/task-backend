import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

@Exclude()
export class BaseResponseDto {
  @Expose()
  @IsBoolean()
  success: boolean;
}

@Exclude()
export class ErrorResponseDto extends BaseResponseDto {
  @Expose()
  @IsString()
  error: string;
}

@Exclude()
export class SuccessfulAuthResponseDto extends BaseResponseDto {
  @Expose()
  @IsString()
  token: string;
}
