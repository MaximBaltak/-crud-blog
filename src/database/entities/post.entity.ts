import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "posts" })
export class PostEntity {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор поста",
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Мой первый пост",
    description: "Заголовок поста",
    required: true,
  })
  @Column()
  title: string;

  @ApiProperty({
    example:
      "Это содержание моего первого поста. Оно может быть очень длинным.",
    description: "Содержание поста",
    required: true,
  })
  @Column({ type: "text" })
  description: string;

  @ApiProperty({
    example: "2025-03-10",
    description: "Дата последнего обновления поста",
    required: true,
  })
  @Column({ type: "date" })
  updateAt: Date;

  @ApiProperty({
    example: "2025-03-10",
    description: "Дата создания поста",
    required: true,
  })
  @Column({ type: "date" })
  createAt: Date;
}
