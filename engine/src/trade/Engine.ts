import fs from "fs";
import { RedisManager } from "../RedisManager";
import {
  CANCEL_ORDER,
  CREATE_ORDER,
  GET_DEPTH,
  GET_OPEN_ORDERS,
  MessageFromApi,
  ON_RAMP,
} from "../types/fromApi";

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

  process({
    message,
    clientId,
  }: {
    message: MessageFromApi;
    clientId: string;
  }) {
    console.log("Processing message from API:", message);

    RedisManager.getInstance().sendToApi(clientId, {
      type: "ORDER_PLACED",
      payload: {
        orderId: "order123",
        executedQty: 0,
        fills: [
          {
            price: "100.5",
            qty: 1,
            tradeId: 456,
          },
        ],
      },
    });
  }
}
// src/engine/Engine.ts
