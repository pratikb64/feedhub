import { Databases, ID } from "appwrite"
import { useStore } from "zustand"
import appwriteState from "~states/appwrite"

const useDatabase = () => {
  const { getClient } = useStore(appwriteState)
  const databases = new Databases(getClient())

  const createDocument = async ({
    collectionId,
    data,
    documentId = ID.unique(),
    permissions
  }: {
    collectionId: string
    data: any
    documentId?: string
    permissions?: string[]
  }) => {
    const document = await databases.createDocument(
      "prod",
      collectionId,
      documentId,
      data,
      permissions
    )
    return document
  }

  const getDocument = async ({
    collectionId,
    documentId,
    queries
  }: {
    collectionId: string
    documentId: string
    queries?: string[]
  }) => {
    const document = await databases.getDocument(
      "prod",
      collectionId,
      documentId,
      queries
    )
    return document
  }

  const getDocumentList = async ({
    collectionId,
    queries
  }: {
    collectionId: string
    queries?: string[]
  }) => {
    const document = await databases.listDocuments(
      "prod",
      collectionId,
      queries
    )
    return document
  }

  const deleteDocument = async ({
    collectionId,
    documentId
  }: {
    collectionId: string
    documentId: string
  }) => {
    const document = await databases.deleteDocument(
      "prod",
      collectionId,
      documentId
    )
    return document
  }

  return { createDocument, getDocument, getDocumentList, deleteDocument }
}

export default useDatabase
