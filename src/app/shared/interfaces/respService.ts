import { Associated } from "./associated";
import { Capacity } from "./capacity";

export interface RespService {
  code: number;
  status: boolean;
  message?: string;
  data?: Capacity[];
}

export interface RespServiceAssociated {
  code: number;
  status: boolean;
  message?: string;
  data?: Associated[];
}