import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
// 这个是将这些状态进行拦截到一块
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import App from "@/App"
import "normalize.css"
import "@/assets/css/index.less"
import store from "./store"
import theme from "./assets/theme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // 使用store的时候必须这样子
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>
)
