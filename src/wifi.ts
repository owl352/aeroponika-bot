import { hello } from "./hello";
import { networkConnectLink } from "./helpers/constants.helper";
import { getNetworks } from "./helpers/get-networks.helper";
const { Telegraf, Markup, Scenes } = require("telegraf");
const axios = require("axios");

export async function wifi() {
  const nets = await getNetworks();
  const parsedNets = nets.map((v, index) => `*${index}.* ${v.ssid}`);

  const numberScene = new Scenes.BaseScene("numberScene");
  numberScene.enter((ctx: any) =>
    ctx.replyWithMarkdown(
      `Выберите номер сети для подключения:\n${parsedNets.join("\n")}`,
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
      if (num >= 0 && num < nets.length) {
        if (nets[num].isPublic) {
          try {
            const response = await axios.post(networkConnectLink, { num });
            const result = response.data;

            if (result == "ok") {
              ctx.reply("Вы смогли подключиться к сети!🎉");
            } else {
              ctx.reply("Неверный пароль 😵. Попробуйте снова.");
            }
          } catch (error) {
            console.error("Ошибка при отправке запроса на сервер:", error);
            ctx.reply(
              "Произошла ошибка при проверке данных. Попробуйте позже."
            );
          }
        } else {
          ctx.reply("Теперь введите пароль:");
          ctx.session.number = num;
          return ctx.scene.enter("passwordScene");
        }
      } else {
        ctx.reply("Не верное число");
      }
    } catch (error) {
      ctx.reply("Не верное число");
    }
  });

  const passwordScene = new Scenes.BaseScene("passwordScene");
  passwordScene.on("text", async (ctx: any) => {
    const { number } = ctx.session;
    const password = ctx.message.text;

    try {
      const response = await axios.post(networkConnectLink, {
        number,
        password,
      });
      const result = response.data;

      if (result == "ok") {
        ctx.reply("Вы смогли подключиться к сети!🎉");
      } else {
        ctx.reply("Неверный пароль 😵. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса на сервер:", error);
      ctx.reply("Произошла ошибка при проверке данных. Попробуйте позже.");
    }

    return ctx.scene.leave();
  });

  return [numberScene, passwordScene];
}
