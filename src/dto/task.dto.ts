import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class TaskDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  date: string;
}

export class ExpandedTaskDto extends TaskDto {
  @Expose()
  @IsString()
  _id: string;
}
