type User = {
  id: string
  name: string
  email: string
}

export type ContactModel = {
  id: string
  name: string
  user: User
  phone: string
  createdAt?: Date
  updatedAt?: Date
}