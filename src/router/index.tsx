import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import type { RouteObject } from "react-router-dom"

// import Discover from '@/views/discover'
// import Mine from '@/views/mine'
// import Focus from '@/views/focus'
// import Download from '@/views/download'

// 需要传递的是一个组件实例
// 对路由进行了懒加载、分包、增加了路由加载的效率
const Discover = lazy(() => import("@/views/discover"))
const Recommend = lazy(() => import("@/views/discover/c-views/recommend"))
const Ranking = lazy(() => import("@/views/discover/c-views/ranking"))
const Songs = lazy(() => import("@/views/discover/c-views/songs"))
const Djradio = lazy(() => import("@/views/discover/c-views/djradio"))
const Artist = lazy(() => import("@/views/discover/c-views/artist"))
const Album = lazy(() => import("@/views/discover/c-views/album"))

const Mine = lazy(() => import("@/views/mine"))
const Focus = lazy(() => import("@/views/focus"))
const Download = lazy(() => import("@/views/download"))

const routes: RouteObject[] = [
  {
    path: "/",
    // 重定向到默认路径
    element: <Navigate to="/discover" />
  },
  {
    path: "/discover",
    // 传递的是组件实例
    element: <Discover />,
    // 二级路由
    children: [
      {
        // 或者理解为，打开的discover的时候，默认显示的是recommend这个组件
        path: "/discover",
        // 这里的双引号相当于jsx里面的value
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: "/discover/recommend",
        element: <Recommend />
      },
      {
        path: "/discover/ranking",
        element: <Ranking />
      },
      {
        path: "/discover/songs",
        element: <Songs />
      },
      {
        path: "/discover/djradio",
        element: <Djradio />
      },
      {
        path: "/discover/artist",
        element: <Artist />
      },
      {
        path: "/discover/album",
        element: <Album />
      }
    ]
  },
  {
    path: "/mine",
    element: <Mine />
  },
  {
    path: "/focus",
    element: <Focus />
  },
  {
    path: "/download",
    element: <Download />
  }
]

export default routes
