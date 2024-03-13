import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { SingerWrapper } from "./style"
import AreaHeaderV2 from "@/components/area-header-v2"
import { useAppSelector } from "@/store"
import { getImageSize } from "@/utils/format"

interface IProps {
  children?: ReactNode
}
interface SettleSingers {
  id: number
  img1v1Url: string
  name: string
  alias?: any
}

const SettleSinger: FC<IProps> = () => {
  const { settleSingers }: { settleSingers: SettleSingers[] } = useAppSelector(
    (state) => ({
      settleSingers: state.recommend.settleSingers
    })
  )

  return (
    <SingerWrapper>
      {/* 顶部header */}
      <AreaHeaderV2
        title="入驻歌手"
        moreText="查看全部 &gt;"
        moreLink="#/discover/artist"
      />
      <div className="artists">
        {settleSingers.map((item) => {
          return (
            <a href="#/discover/artist" className="item" key={item?.id}>
              <img src={getImageSize(item?.img1v1Url, 80)} alt="" />
              <div className="info">
                <div className="name">{item?.name}</div>
                <div className="alia">{item?.alias.join(" ")}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="#/">申请成为网易音乐人</a>
      </div>
    </SingerWrapper>
  )
}

export default memo(SettleSinger)
