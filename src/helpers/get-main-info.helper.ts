import axios from "axios";
import { mainInfoLink } from "./constants.helper";
import { MainInfo } from "../@types";

export async function getMainInfo(): Promise<any> {
  const out = (
    await axios({
      method: "GET",
      url: mainInfoLink,
      responseType: "json",
    })
  ).data;
  return Object.keys(out).length != 0
    ? out
    : {
        isDay: false,
        currentNetwork: "No Network",
        uptime: 0,
        notifications: 0,
        temp: 0,
        humidity: 0,
        light_val: 0,
        pump_good: false,
        light_good: false,
        liquid_good: false,
        isGood: false,
        light_count: 0,
        light_good_count: 0,
        pereferia_good: false,
        ip: "192.168.4.1",
      };
}
