import React, { PropsWithChildren } from "react"

const NavbarOpenContext = React.createContext({
  isNavbarOpen: false,
  setNavbarOpen: (value: boolean) => {},
})

export const useNavbar = () => React.useContext(NavbarOpenContext)

export const NavbarProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isNavbarOpen, setNavbarOpen] = React.useState(false)

  return (
    <NavbarOpenContext.Provider value={{ isNavbarOpen, setNavbarOpen }}>
      {children}
    </NavbarOpenContext.Provider>
  )
}
