import ParcIcon from "@mui/icons-material/Apartment"
import BookingIcon from "@mui/icons-material/CalendarMonth"
import UserIcon from "@mui/icons-material/Person"
import { List } from "@mui/material"
import React from "react"
import NavigationEntry from "./NavigationEntry"

export default function Navigation() {
  return (
    <List>
      <NavigationEntry icon={<UserIcon />} text="Users" to="/users" />
      <NavigationEntry icon={<ParcIcon />} text="Parcs" to="/parcs" />
      <NavigationEntry icon={<BookingIcon />} text="Bookings" to="/bookings" />
    </List>
  )
}
