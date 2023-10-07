import Menu from "@mui/icons-material/Menu"
import {
  AppBar as MuiAppBar,
  Container,
  IconButton,
  styled,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar"
import React from "react"
import { useNavbar } from "../NavbarContextProvider"
import { DRAWER_WIDTH } from "../Navigation/Drawer/Drawer"

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [theme.breakpoints.up("sm")]: {
    ...(open && {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}))

export default function AppBar() {
  const { isNavbarOpen, setNavbarOpen } = useNavbar()

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

  const handleDrawerOpen = () => {
    setNavbarOpen(isMobile ? !isNavbarOpen : true)
  }

  return (
    <StyledAppBar position="static" open={isNavbarOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            transition: (theme) =>
              theme.transitions.create(["margin-right", "opacity"]),
            marginRight: { xs: 1, sm: 5 },
            ...(isNavbarOpen && {
              mr: { sm: -4 },
              opacity: { sm: 0 },
              pointerEvents: { sm: "none" },
            }),
          }}
        >
          <Menu />
        </IconButton>
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Eurocamp
          </Typography>
        </Container>
      </Toolbar>
    </StyledAppBar>
  )
}
