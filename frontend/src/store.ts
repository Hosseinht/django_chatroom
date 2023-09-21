import { create } from "zustand";
interface ServerQuery {
  category?: string;
  qty?: number;
  serverId?: number;
  roomId?: number;
  roomName?: string;
}

interface ServerQueryStore {
  serverQuery: ServerQuery;
  setCategory: (category: string) => void;
  setServerId: (serverId: number) => void;
  setRoom: (roomId: number, roomName: string) => void;
}

const useServerQueryStore = create<ServerQueryStore>((set) => ({
  serverQuery: {},
  setCategory: (category) =>
    set((store) => ({ serverQuery: { ...store.serverQuery, category } })),
  setServerId: (serverId) =>
    set((store) => ({ serverQuery: { ...store.serverQuery, serverId } })),
  setRoom: (roomId, roomName) =>
    set((store) => ({
      serverQuery: { ...store.serverQuery, roomId, roomName },
    })),
}));

export default useServerQueryStore;
