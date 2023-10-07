import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import BookingList from "./pages/Booking/BookingList"
import Home from "./pages/Home"
import ParcList from "./pages/Parcs/ParcList"
import UserList from "./pages/Users/UserList"

function App() {
  return (
    <React.Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/users">
            <Route index element={<UserList />} />
          </Route>
          <Route path="/parcs">
            <Route index element={<ParcList />} />
          </Route>
          <Route path="/bookings">
            <Route index element={<BookingList />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default App
