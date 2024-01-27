import { Context } from "telegraf";
import { getMainInfo } from "./helpers/get-main-info.helper";
import { getHealth } from "./helpers/get-health.helper";

export async function health(ctx: Context) {
  const data = await getHealth();
  ctx.sendMessage(
    `Общее состояние: *${data.isGood ? "Отличное" : "Неисправна"}* \nСвет: *${
      data.light_good_count
    }/${data.light_count}* \nСостояние насоса: *${
      data.pump_good ? "Отличное" : "Неисправна"
    }* \nРаствор: *${data.liquid_good ? "Отличное" : "Неисправна"}*`,
    { parse_mode: "MarkdownV2" }
  );
}
