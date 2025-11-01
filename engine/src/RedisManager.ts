// src/redis/RedisManager.ts
import { createClient, RedisClientType } from "redis";
import { WsMessage } from "../src/types/toWs";
import { MessageToApi } from "../src/types/toApi";

export const TRADE_ADDED = "TRADE_ADDED";
export const ORDER_UPDATE = "ORDER_UPDATE";

type DbMessage =
  | {
      type: typeof TRADE_ADDED;
      data: {
        id: string;
        isBuyerMaker: boolean;
        price: string;
        quantity: string;
        quoteQuantity: string;
        timestamp: number;
        market: string;
      };
    }
  | {
      type: typeof ORDER_UPDATE;
      data: {
        orderId: string;
        executedQty: number;
        market?: string;
        price?: string;
        quantity?: string;
        side?: "buy" | "sell";
      };
    };

export class RedisManager {
  private static instance: RedisManager;
  private client: RedisClientType;
  private isConnected = false;

  private constructor() {
    this.client = createClient();
  }

  public static getInstance(): RedisManager {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public async connect() {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      console.log("✅ Connected to Redis");
    }
  }

    public async pushMessage(message: DbMessage) {
      await this.client.lPush("db_processor", JSON.stringify(message));
    }

    public async publishMessage(channel: string, message: WsMessage) {
      await this.client.publish(channel, JSON.stringify(message));
    }

    public async sendToApi(clientId: string, message: MessageToApi) {
      await this.client.publish(clientId, JSON.stringify(message));
    }



  public async rPop(key: string): Promise<string | null> {
    return await this.client.rPop(key);
  }
}
