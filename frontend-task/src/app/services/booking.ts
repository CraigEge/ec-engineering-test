import moment from "moment/moment"
import {
  Booking,
  BookingCreate,
  BookingId,
  BookingServerResponse,
} from "../../model/booking"
import { ListResponse } from "../../model/response"
import { api } from "./api"

export const bookingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBookings: build.query<Booking[], void>({
      query: () => ({
        url: "/bookings",
      }),
      transformResponse: (response: ListResponse<BookingServerResponse>) =>
        response.data.map((booking) => ({
          ...booking,
          bookingdate: moment(booking.bookingdate),
        })),
      providesTags: (result) => {
        const tags = [{ type: "Booking" as const, id: "LIST" }]

        if (result) {
          result.forEach(({ id }) => tags.push({ type: "Booking", id }))
        }

        return tags
      },
    }),
    getBooking: build.query<Booking, { id: BookingId }>({
      query: ({ id }) => ({
        url: `/bookings/${id}`,
      }),
      transformResponse: (response: BookingServerResponse) => ({
        ...response,
        bookingdate: moment(response.bookingdate),
      }),
      providesTags: (result, error, arg) => [{ type: "Booking", id: arg.id }],
    }),
    createBooking: build.mutation<Booking, BookingCreate>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body: {
          ...body,
          bookingdate: body.bookingdate.format(),
        },
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),
    deleteBooking: build.mutation<void, { id: BookingId }>({
      query: ({ id }) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Booking", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi
