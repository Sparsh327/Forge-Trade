// src/index.ts
import { RedisManager } from "./RedisManager";
import { Engine } from "./trade/Engine";

async function main() {
  const redisManager = RedisManager.getInstance();
  await redisManager.connect();

  const engine = new Engine();

  while (true) {
    const msg = await redisManager.rPop("messages");
    if (msg) {
      try {
        const parsed = JSON.parse(msg);
        console.log("Received message:", parsed);
        engine.process(parsed);
      } catch (err) {
        console.error("❌ Failed to parse message", err);
      }
    } else {
      await new Promise((res) => setTimeout(res, 10)); // Avoid CPU burn
    }
  }
}

main();
