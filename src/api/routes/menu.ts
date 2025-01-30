import axios from "axios";
import { TGETMenu } from "@/src/api/types";
import api from "../api";

export default class MenuApi {
  static async getMenu(): Promise<TGETMenu> {
    const response = await api.get("");
    return response?.data;
  }

  static async getMenuById(id: number): Promise<TGETMenu["recipes"][number]> {
    const response = await api.get(`/${id}`);
    return response?.data;
  }
}
