import axios from "axios";
import { healthLink } from "./constants.helper";
import { HealthInfo } from "../@types";

export async function getHealth(): Promise<HealthInfo> {
  return (
    await axios({
      method: "GET",
      url: healthLink,
      responseType: "json",
    })
  ).data;
}
