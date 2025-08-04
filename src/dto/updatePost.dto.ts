// src/dto/updatePost.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class UpdatePostDto {
  @ApiProperty({
    example: "Updated Title",
    description: "Новый заголовок поста",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    example: "Updated content of the post",
    description: "Новое содержание поста",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
