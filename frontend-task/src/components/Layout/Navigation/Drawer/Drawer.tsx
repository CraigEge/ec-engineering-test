import { Theme, useMediaQuery } from "@mui/material"
import React from "react"
import DesktopDrawer from "./DesktopDrawer"
import MobileDrawer from "./MobileDrawer"

export const DRAWER_WIDTH = 240

export default function Drawer() {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
  if (isMobile) {
    return <MobileDrawer />
  }

  return <DesktopDrawer />
}
