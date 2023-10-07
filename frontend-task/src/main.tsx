import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { store } from "./app/store"
import Theme from "./theme/Theme"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Theme>
    </Provider>
  </React.StrictMode>,
)
