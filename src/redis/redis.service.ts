// src/redis/redis.service.ts
import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    this.client.connect();
  }

  async set(key: string, value: any, ttlSeconds = 300): Promise<void> {
    await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async deleteKey(key: string): Promise<void> {
    await this.client.del(key);
  }

  async deleteKeys(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(keys);
    }
  }
}
