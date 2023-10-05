import { Room } from "./Room.ts";

export interface Server {
  id: number;
  name: string;
  owner: string;
  category: string;
  description: string;
  banner: string;
  icon: string;
  room_server: Room[];
}
