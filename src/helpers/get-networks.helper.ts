import axios from "axios";
import { Network } from "../@types/network.type";
import { networkLink } from "./constants.helper";

export async function getNetworks(): Promise<Network[]> {
  try {
    return (await axios.get(networkLink)).data;
  } catch (error) {
    return [];
  }
}
