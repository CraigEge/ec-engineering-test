import { ListResponse } from "../../model/response"
import { User, UserCreate, UserId } from "../../model/user"
import { api } from "./api"

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => ({
        url: "/users",
      }),
      transformResponse: (response: ListResponse<User>) => response.data,
      providesTags: (result) => {
        const tags = [{ type: "User" as const, id: "LIST" }]

        if (result) {
          result.forEach(({ id }) => tags.push({ type: "User", id }))
        }

        return tags
      },
    }),
    getUser: build.query<User, { id: UserId }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    createUser: build.mutation<User, UserCreate>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: build.mutation<void, { id: UserId }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userApi
