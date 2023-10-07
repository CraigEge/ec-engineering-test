import { Divider, Drawer as MuiDrawer, styled } from "@mui/material"
import React from "react"
import { useNavbar } from "../../NavbarContextProvider"
import Navigation from "../Navigation"
import { DRAWER_WIDTH } from "./Drawer"
import DrawerHeader from "./DrawerHeader"

const Drawer = styled(MuiDrawer)(() => ({
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
  },
}))

export default function MobileDrawer() {
  const { isNavbarOpen, setNavbarOpen } = useNavbar()

  const handleDrawerClose = () => {
    setNavbarOpen(false)
  }

  return (
    <Drawer
      variant="temporary"
      open={isNavbarOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <DrawerHeader />
      <Divider />
      <Navigation />
    </Drawer>
  )
}
