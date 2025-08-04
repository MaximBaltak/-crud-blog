import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    example: "My First Post",
    description: "Заголовок поста",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "This is the content of the post",
    description: "Содержание поста",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
