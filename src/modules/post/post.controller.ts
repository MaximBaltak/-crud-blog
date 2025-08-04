// src\modules\post\post.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { PostService } from "./post.service";
import { PostEntity } from "src/database/entities/post.entity";
import { MessageResDto } from "src/dto/messageRes.dto";
import { CreatePostDto } from "src/dto/createPost.dto";
import { UpdatePostDto } from "src/dto/updatePost.dto";

@ApiTags("Posts")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get("")
  @ApiOperation({
    summary: "Получить список постов",
    description: "Возвращает список постов с пагинацией",
  })
  @ApiResponse({
    status: 200,
    description: "Успешный ответ",
    type: [PostEntity],
  })
  @ApiResponse({ status: 500, description: "Ошибка сервера" })
  async getAllPosts(
    @Query("step") step?: number,
    @Query("page") page?: number,
  ): Promise<PostEntity[]> {
    try {
      if (step && page) {
        return this.postService.getPosts(step, page);
      }
      return this.postService.getPosts();
    } catch (error) {
      console.error("Не удалось получить посты", error);
      throw error;
    }
  }

  @Post("")
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: "Создать пост",
    description: "Добавляет новый пост в БД",
  })
  @ApiBody({ type: CreatePostDto }) // {{ edit_2 }}: Описание тела запроса
  @ApiResponse({
    status: 201,
    description: "Пост успешно создан",
    type: MessageResDto,
  })
  @ApiResponse({ status: 400, description: "Неверные данные" })
  @ApiResponse({ status: 500, description: "Ошибка сервера" })
  async addPost(@Body() post: CreatePostDto): Promise<MessageResDto> {
    try {
      await this.postService.addPost(post);
      return {
        message: "Пост успешно добавлен",
        code: HttpStatus.OK,
      };
    } catch (error) {
      console.error("Не удалось добавить пост", error);
      throw error;
    }
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: "Обновить пост",
    description: "Обновляет существующий пост по ID",
  })
  @ApiParam({ name: "id", type: Number, description: "ID поста" }) // {{ edit_3 }}: Описание параметра
  @ApiBody({ type: UpdatePostDto }) // {{ edit_4 }}: Описание тела запроса
  @ApiResponse({
    status: 200,
    description: "Пост успешно обновлён",
    type: MessageResDto,
  })
  @ApiResponse({ status: 400, description: "Неверные данные" })
  @ApiResponse({ status: 500, description: "Ошибка сервера" })
  async updatePost(
    @Body() post: UpdatePostDto,
    @Param("id") id: number,
  ): Promise<MessageResDto> {
    try {
      await this.postService.updatePost(id, post);
      return {
        message: "Пост успешно обновлён",
        code: HttpStatus.OK,
      };
    } catch (error) {
      console.error("Не удалось обновить пост", error);
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Удалить пост", description: "Удаляет пост по ID" })
  @ApiParam({ name: "id", type: Number, description: "ID поста" }) // {{ edit_5 }}: Описание параметра
  @ApiResponse({
    status: 200,
    description: "Пост успешно удалён",
    type: MessageResDto,
  })
  @ApiResponse({ status: 404, description: "Пост не найден" })
  @ApiResponse({ status: 500, description: "Ошибка сервера" })
  async deletePost(@Param("id") id: number): Promise<MessageResDto> {
    try {
      await this.postService.removePost(id);
      return {
        message: "Пост успешно удалён",
        code: HttpStatus.OK,
      };
    } catch (error) {
      console.error("Не удалось удалить пост", error);
      throw error;
    }
  }
}
