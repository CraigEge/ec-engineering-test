export type ParcId = string

export type Parc = {
  id: ParcId
  name: string
  description: string
}

export type ParcCreate = Omit<Parc, "id">
