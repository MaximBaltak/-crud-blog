import { Controller, Get } from "@nestjs/common";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get("")
  getStr(): string {
    console.log("23");
    return "hello world";
  }
}
