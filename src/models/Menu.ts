import { ListOfMenu } from "./ListOfMenu";

export interface Menu {
  timestamp: number;
  status: string;
  message: string;
  page: number;
  count: number;
  total: number;
  data: any;
}