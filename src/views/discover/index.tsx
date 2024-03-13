import React, { memo, Suspense } from "react"
import type { FC, ReactNode } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./c-cpns/nav-bar"

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <div>
      <NavBar />
      {/* 二级路由的显示 需要在这里添加占位，也需要添加 Suspense */}
      <Suspense fallback="">
        {/* 这个是占位 */}
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)
