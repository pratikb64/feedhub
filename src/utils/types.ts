import type { Models } from "appwrite"

export interface HTMLElementEvent extends MouseEvent {
  target: HTMLElement
}

export interface Project {
  domain: string
  owner: string
  teamId: string
}

export type ProjectDocument = Models.Document & Project

export interface Comment {
  pathname: string
  message: string
  project: string
  positionX: number
  positionY: number
  xPath: string
  innerWidth: number
  owner: string
}

export type CommentDocument = Models.Document & Comment
