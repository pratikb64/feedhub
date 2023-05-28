import { Client } from "appwrite"
import { createStore } from "zustand"

let endpoint = "https://cloud.appwrite.io/v1"
let projectId = "feedhub"

const appwriteState = createStore<AppwriteState>((set, get) => ({
  client: undefined,
  getClient: () => {
    let client = get().client
    if (!client) {
      client = new Client().setEndpoint(endpoint).setProject(projectId)
      set({ client })
    }
    return client
  }
}))

interface AppwriteState {
  client?: Client
  getClient: () => Client
}

export default appwriteState
