import { Moment } from "moment/moment"
import { ParcId } from "./parc"
import { UserId } from "./user"

export type BookingId = string

export type BookingServerResponse = {
  id: BookingId
  user: UserId
  parc: ParcId
  bookingdate: string
  comments: string
}

export type Booking = {
  id: BookingId
  user: UserId
  parc: ParcId
  bookingdate: Moment
  comments: string
}

export type BookingCreate = Omit<Booking, "id">
