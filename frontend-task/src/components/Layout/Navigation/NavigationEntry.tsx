import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material"
import React, { ReactNode } from "react"
import { NavLink, To } from "react-router-dom"
import { useNavbar } from "../NavbarContextProvider"

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  transition: theme.transitions.create("margin-right", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

type NavigationEntryProps = {
  to: To
  icon: ReactNode
  text: string
}

export default function NavigationEntry({
  icon,
  text,
  to,
}: NavigationEntryProps) {
  const { isNavbarOpen } = useNavbar()

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={NavLink}
        to={to}
        sx={{
          minHeight: 48,
          justifyContent: isNavbarOpen ? "initial" : "center",
          px: 2.5,
        }}
      >
        <StyledListItemIcon
          sx={{
            minWidth: 0,
            mr: isNavbarOpen ? 3 : 0,
            justifyContent: "center",
          }}
        >
          {icon}
        </StyledListItemIcon>
        <StyledListItemText
          primary={text}
          sx={{ opacity: isNavbarOpen ? 1 : 0, color: "text.primary" }}
        />
      </ListItemButton>
    </ListItem>
  )
}
