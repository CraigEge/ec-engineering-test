import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL as string,
})

export default baseQuery
