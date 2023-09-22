import { create } from "zustand";
interface ServerQuery {
  categoryName?: string;
  qty?: number;
  serverId?: number;
  roomId?: number;
  roomName?: string;
  fetchCategories?: boolean;
}

interface ServerQueryStore {
  serverQuery: ServerQuery;
  setCategoryName: (categoryName: string) => void;
  setServerId: (serverId: number | undefined) => void;
  setRoom: (roomId: number, roomName: string) => void;
  setFetchCategories: (fetchCategories: boolean) => void;
}

const useServerQueryStore = create<ServerQueryStore>((set) => ({
  // set is a function for updating the state of the store. It returns an object which is the
  // initial state of the store
  serverQuery: { fetchCategories: false },
  setCategoryName: (categoryName) =>
    set(() => ({ serverQuery: { categoryName } })),
  // arrow function take the current state or current store and return the next state
  setServerId: (serverId) => set(() => ({ serverQuery: { serverId } })),
  setRoom: (roomId, roomName) =>
    set((store) => ({
      serverQuery: { ...store.serverQuery, roomId, roomName },
    })),
  setFetchCategories: (fetchCategories) =>
    set((store) => ({
      serverQuery: { ...store.serverQuery, fetchCategories },
    })),
}));

export default useServerQueryStore;
