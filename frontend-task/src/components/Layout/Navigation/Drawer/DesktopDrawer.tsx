import ChevronLeft from "@mui/icons-material/ChevronLeft"
import {
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  styled,
  Theme,
} from "@mui/material"
import React from "react"
import { useNavbar } from "../../NavbarContextProvider"
import Navigation from "../Navigation"
import { DRAWER_WIDTH } from "./Drawer"
import DrawerHeader from "./DrawerHeader"

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "&& .MuiDrawer-paper": {
    position: "absolute",
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function DesktopDrawer() {
  const { isNavbarOpen, setNavbarOpen } = useNavbar()

  const handleDrawerClose = () => {
    setNavbarOpen(false)
  }

  return (
    <Drawer variant="permanent" open={isNavbarOpen}>
      <DrawerHeader>
        {isNavbarOpen && (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <Navigation />
    </Drawer>
  )
}
