import { Account, AppwriteException, ID, type Models } from "appwrite"
import { useEffect, useState } from "react"
import { useStore } from "zustand"
import appwriteState from "~states/appwrite"

const useAccount = () => {
  const { getClient } = useStore(appwriteState)
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const client = getClient()
  const account = new Account(client)

  const fetchUser = async () => {
    const userData = await getAccount()
    if (userData) {
      setUser(userData)
    } else setUser(null)
    setIsLoading(false)
    return userData
  }

  useEffect(() => {
    fetchUser()
  }, [])

  async function register({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name?: string
  }) {
    return account.create(ID.unique(), email, password, name)
  }

  async function login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<{ session?: Models.Session; error?: AppwriteException }> {
    try {
      let session = await account.createEmailPasswordSession(email, password)
      await fetchUser()
      return { session }
    } catch (error) {
      return { error: error as AppwriteException }
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current")
      setUser(null)
    } catch (error) {
      setUser(null)
      console.error(JSON.stringify(error, null, 2))
    }
  }

  async function getAccount() {
    const userData = await account.get().catch((error) => {
      setUser(null)
      return null
    })
    return userData
  }

  return { user, isLoading, register, login, logout, fetchUser }
}

export default useAccount
