import { Parc, ParcCreate, ParcId } from "../../model/parc"
import { ListResponse } from "../../model/response"
import { api } from "./api"

export const parcApi = api.injectEndpoints({
  endpoints: (build) => ({
    getParcs: build.query<Parc[], void>({
      query: () => ({
        url: "/parcs",
      }),
      transformResponse: (response: ListResponse<Parc>) => response.data,
      providesTags: (result) => {
        const tags = [{ type: "Parc" as const, id: "LIST" }]

        if (result) {
          result.forEach(({ id }) => tags.push({ type: "Parc", id }))
        }

        return tags
      },
    }),
    getParc: build.query<Parc, { id: ParcId }>({
      query: ({ id }) => ({
        url: `/parcs/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Parc", id: arg.id }],
    }),
    createParc: build.mutation<Parc, ParcCreate>({
      query: (body) => ({
        url: "/parcs",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Parc", id: "LIST" }],
    }),
    deleteParc: build.mutation<void, { id: ParcId }>({
      query: ({ id }) => ({
        url: `/parcs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Parc", id: arg.id }],
    }),
  }),
})

export const {
  useGetParcsQuery,
  useGetParcQuery,
  useCreateParcMutation,
  useDeleteParcMutation,
} = parcApi
