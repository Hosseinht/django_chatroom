import { create } from "zustand";

interface AuthQuery {
  isLoggedIn?: boolean;
}

interface AuthQueryStore {
  authQuery: AuthQuery;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
const initialIsLoggedIn = storedIsLoggedIn
  ? storedIsLoggedIn === "true"
  : false;

const useAuthQueryStore = create<AuthQueryStore>((set) => ({
  authQuery: { isLoggedIn: initialIsLoggedIn },

  setIsLoggedIn: (isLoggedIn) =>
    set((store) => ({ authQuery: { ...store.authQuery, isLoggedIn } })),
}));

export default useAuthQueryStore;
