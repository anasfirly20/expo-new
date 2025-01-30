import api from "../api";
import { TGETMenu } from "../types";

export default class MenuApi {
  static async getMenu(): Promise<TGETMenu> {
    const response = await api.get("");
    return response?.data;
  }
}
