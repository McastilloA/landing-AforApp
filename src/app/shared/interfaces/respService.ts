import { Capacity } from "./capacity";

export interface RespService {
  code: number;
  status: boolean;
  message?: string;
  data?: Capacity[];
}