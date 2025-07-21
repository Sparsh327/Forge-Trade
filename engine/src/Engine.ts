import fs from "fs";
import { RedisManager } from "./RedisManager";

//TODO: Avoid floats everywhere, use a decimal similar to the PayTM project for every currency
export const BASE_CURRENCY = "INR";

interface UserBalance {
  [key: string]: {
    available: number;
    locked: number;
  };
}

export class Engine {
  //   private orderbooks: Orderbook[] = [];
  private balances: Map<string, UserBalance> = new Map();

  constructor() {}
}
// src/engine/Engine.ts

