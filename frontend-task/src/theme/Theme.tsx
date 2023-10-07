import CssBaseline from "@mui/material/CssBaseline"
import createTheme from "@mui/material/styles/createTheme"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import useMediaQuery from "@mui/material/useMediaQuery"
import React, { useMemo } from "react"

type Props = {
  children: React.ReactNode
}

export default function Theme({ children }: Props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  )
}
