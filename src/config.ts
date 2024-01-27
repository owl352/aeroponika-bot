import { hello } from "./hello";
import { configSetLink } from "./helpers/constants.helper";
const { Telegraf, Scenes, Markup } = require("telegraf");
const axios = require("axios");

export async function configScene() {
  const numberScene = new Scenes.BaseScene("configScene");
  numberScene.enter((ctx: any) =>
    ctx.replyWithMarkdown(
      "Отправьте номер конфигурации.\n*1. Горчица 🌭 \n2. Кресс-салат 🥬 \n3. Руккола 🌱 \n4. Горох 🫛*",
      Markup.keyboard([["Отмена"]]).resize(),
      { parse_mode: "MarkdownV2" }
    )
  );

  numberScene.on("text", async (ctx: any) => {
    const userInput = ctx.message.text.toLowerCase();

    if (userInput === "отмена") {
      hello(ctx);
      return ctx.scene.leave();
    }

    try {
      const num = parseInt(userInput);
      if (num > 4 || num < 1) {
        ctx.reply("Не корретно введено число 👀. Попробуйте еще раз.");
      } else {
        await axios.post(configSetLink, { data: 1 });
        ctx.reply("Конфигурация будет обновлена в течении пары секунд 🌴");
        return ctx.scene.leave();
      }
    } catch (error) {
      ctx.reply("Не удалось распознать число. Попробуйте еще раз.");
    }
  });

  return [numberScene];
}
