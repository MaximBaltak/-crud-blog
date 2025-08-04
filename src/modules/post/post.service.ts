import { CreatePostDto } from "./../../dto/createPost.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "src/database/entities/post.entity";
import { UpdatePostDto } from "src/dto/updatePost.dto";
import { Repository } from "typeorm";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly redisService: RedisService,
  ) {}

  private generateCacheKey(step?: number, page?: number): string {
    return `posts:step=${step || "all"}:page=${page || "all"}`;
  }

  async getPosts(step = 0, page = 0): Promise<PostEntity[]> {
    const cacheKey = this.generateCacheKey(step, page);
    const cachedData = (await this.redisService.get(cacheKey)) as PostEntity[];
    console.log(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    let result: PostEntity[];
    if (step > 0 && page > 0) {
      const skip = (page - 1) * step;
      result = await this.postRepository.find({
        skip,
        take: step,
      });
    } else {
      result = await this.postRepository.find();
    }

    await this.redisService.set(cacheKey, result);
    return result;
  }

  async addPost(post: CreatePostDto): Promise<PostEntity> {
    const newPost = new PostEntity();
    newPost.title = post.title;
    newPost.description = post.description;
    newPost.updateAt = new Date();
    newPost.createAt = new Date();

    const savedPost = await this.postRepository.save(newPost);

    // Инвалидация всех кеш-ключей, связанных с постами
    await this.redisService.deleteKeys("posts:*");

    return savedPost;
  }

  async updatePost(id: number, post: UpdatePostDto): Promise<PostEntity> {
    const existingPost = await this.postRepository.findOneBy({ id });

    if (!existingPost) {
      throw new NotFoundException("Пост не найден");
    }

    if (post.title) {
      existingPost.title = post.title;
    }
    if (post.description) {
      existingPost.description = post.description;
    }
    existingPost.updateAt = new Date();

    const updatedPost = await this.postRepository.save(existingPost);

    // Инвалидация всех кеш-ключей, связанных с постами
    await this.redisService.deleteKeys("posts:*");

    return updatedPost;
  }

  async removePost(id: number): Promise<void> {
    const existingPost = await this.postRepository.findOneBy({ id });

    if (!existingPost) {
      throw new NotFoundException("Пост не найден");
    }

    await this.postRepository.delete(id);
    await this.redisService.deleteKeys("posts:*");
  }
}
