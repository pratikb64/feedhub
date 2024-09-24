import { Functions } from "appwrite"
import { useStore } from "zustand"
import appwriteState from "~states/appwrite"

const useFunctions = () => {
  const { getClient } = useStore(appwriteState)
  const functions = new Functions(getClient())

  const fn = async (functionName: string, data: object) => {
    const response = await functions.createExecution(
      functionName,
      JSON.stringify(data)
    )
    return {
      response: JSON.parse(response.responseBody),
      statusCode: response.responseStatusCode
    }
  }

  return { fn }
}

export default useFunctions
