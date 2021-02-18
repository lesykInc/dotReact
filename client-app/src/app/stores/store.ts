import { createContext, useContext } from "react"
import { ActivityStore } from "./activityStore"
import { PostStore } from  "./postStore";

interface Store {
    activityStore: ActivityStore;
    postStore: PostStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    postStore: new PostStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}