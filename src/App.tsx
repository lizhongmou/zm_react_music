import React, { Suspense } from "react"
import { useRoutes } from "react-router-dom"
import AppHeader from "./components/app-header"
import AppFooter from "./components/app-footer"
import AppPlayerBar from "./views/player/app-player-bar"

import routes from "./router"

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      {/* 播放器工具栏 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
