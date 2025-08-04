// src/dto/messageRes.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class MessageResDto {
  @ApiProperty({
    example: "Пост успешно добавлен",
    description: "Сообщение результата операции",
    required: true,
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: 200,
    description: "HTTP-код статуса ответа",
    required: true,
  })
  @IsInt()
  code: number;
}
