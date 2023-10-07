export type UserId = string

export type User = {
  id: UserId
  name: string
  email: string
}

export type UserCreate = Omit<User, "id">
