import { Context, Markup } from "telegraf";
import { getMainInfo } from "./helpers/get-main-info.helper";

export async function hello(ctx: Context) {
  const data = await getMainInfo();

  await ctx.reply("Вы попали в бота HydroGrow!", Markup.removeKeyboard());
  await ctx.sendMessage(
    `Цикл: ${data.isDay ? "День" : "Ночь"} \nТемпература: ${
      data.temp
    } \nВлажность: ${data.humidity} \nСвет: ${data.light_val} \nУведомления: ${
      data.notifications
    } \nСеть: ${data.currentNetwork} \nСостояние насоса: ${
      data.pump_good ? "Отличное" : "Плохое"
    } \nСостояние света: ${
      data.light_good ? "Отличное" : "Плохое"
    } \nСостояние раствора: ${data.liquid_good ? "Отличное" : "Плохое"} `
  );
  await ctx.sendMessage(
    "Выберите локацию (здоровье, конфигурация и настойка установки) \n/health\n/config\n/settings"
  );
}
