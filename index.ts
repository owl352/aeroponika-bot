const { Telegraf, session, Scenes } = require("telegraf");
import { config } from "dotenv";
import { hello } from "./src/hello";
import { health } from "./src/health";
import { wifi } from "./src/wifi";
import { configScene } from "./src/config";

async function main() {
  const stage = new Scenes.Stage((await wifi()).concat(await configScene()));
  config();
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.use(session());
  bot.use(stage.middleware());
  bot.start(hello);
  bot.command("menu", hello);
  bot.command("health", health);
  bot.command("settings", (ctx: any) => ctx.scene.enter("numberScene"));
  bot.command("config", (ctx: any) => ctx.scene.enter("configScene"));
  bot.hears("hi", (ctx: any) => ctx.reply("Hey there"));
  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
main();
