import { Account, AppwriteException, ID, type Models } from "appwrite"
import { useEffect, useState } from "react"
import { useStore } from "zustand"
import appwriteState from "~states/appwrite"

const useAccount = () => {
  const { getClient } = useStore(appwriteState)
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const client = getClient()
  const account = new Account(client)

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getAccount()
      if (userData) setUser(userData)
      setIsLoading(false)
    }
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
  }) {
    let error
    let session
    try {
      session = await account.createEmailSession(email, password)
    } catch (error) {
      if (error instanceof AppwriteException) {
        error = error.message
      }
    }
    return { session, error }
  }

  async function logout() {
    try {
      await account.deleteSession("current")
      setUser(null)
    } catch (error) {
      setError(JSON.stringify(error))
    }
  }

  async function getAccount() {
    const userData = await account.get().catch((error) => {
      setError(error)
    })
    return userData
  }

  return { user, isLoading, error, register, login, logout }
}

export default useAccount
