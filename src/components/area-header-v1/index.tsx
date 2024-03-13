import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { Link } from "react-router-dom"
import { HeaderV1Wrapper } from "./style"

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}

const AreaHeaderV1: FC<IProps> = (props) => {
  // 从定义的 IProps 里面拿值
  const {
    title = "默认标题",
    keywords = [],
    moreText = "更多",
    // 接收跳转的路由地址
    moreLink = "/"
  } = props

  return (
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        {/* to 页面跳转 */}
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        {/* sprite_02 这个是使用精灵图 */}
        <i className="sprite_02 icon"></i>
      </div>
    </HeaderV1Wrapper>
  )
}

export default memo(AreaHeaderV1)
