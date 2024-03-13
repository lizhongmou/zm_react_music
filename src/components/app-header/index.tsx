import React, { memo } from "react"
import type { FC, ReactNode } from "react"
// 这个有react的状态，默认有active这个类 当路径匹配的时候自动添加
import { NavLink } from "react-router-dom"
import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { HeaderLeft, HeaderRight, HeaderWrapper } from "./style"

import headerTitles from "@/assets/data/header_titles.json"

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  /** 定义组件内部的状态 */
  // const [currentIndex, setCurrentIndex] = useState(0)

  /** 组件的展示逻辑 */
  function showItem(item: any) {
    if (item.type === "path") {
      //  className={({ isActive }) => { return isActive ? "active" : undefined   }} 手动添加active 就是选中以后的状态
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? "active" : undefined
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          {/* 在这里使用的图标是一个组件 */}
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
