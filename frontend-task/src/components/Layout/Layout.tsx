import {
  Box,
  BoxProps,
  Fade,
  LinearProgress as MuiLinearProgress,
  styled,
} from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import useAppearDelay from "../../util/useAppearDelay"
import AppBar from "./AppBar/AppBar"
import { NavbarProvider } from "./NavbarContextProvider"
import Drawer from "./Navigation/Drawer/Drawer"

const LinearProgress = styled(MuiLinearProgress)(() => ({
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 9991,
  height: 1,
}))

const ContentBox = styled((props: BoxProps) => (
  <Box component="main" {...props} />
))(() => ({
  display: "flex",
  flexGrow: 1,
  overflow: "auto",
}))

export default function Layout() {
  const isLoading = useAppSelector((state) =>
    Object.values(state.eurocampApi.queries).some(
      (query) => query?.status === "pending",
    ),
  )

  const isLoadingVisible = useAppearDelay(isLoading)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Fade
        in={isLoadingVisible}
        style={{
          transitionDelay: isLoadingVisible ? "800ms" : "0ms",
        }}
        unmountOnExit
      >
        <LinearProgress />
      </Fade>

      <NavbarProvider>
        <AppBar />
        <Box display="flex" overflow="hidden" height="100%">
          <Drawer />

          <ContentBox>
            <React.Suspense>
              <Outlet />
            </React.Suspense>
          </ContentBox>
        </Box>
      </NavbarProvider>
    </Box>
  )
}
