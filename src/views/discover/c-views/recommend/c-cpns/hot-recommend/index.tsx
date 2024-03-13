import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { RecommendWrapper } from "./style"
import AreaHeaderV1 from "@/components/area-header-v1"
import { shallowEqualApp, useAppSelector } from "@/store"
import SongMenuItem from "@/components/song-menu-item"

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  // 从store里面拿到数据
  const { hotRecommends } = useAppSelector(
    (state) => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqualApp
  )

  return (
    <RecommendWrapper>
      {/* 头部 作为了一个公共的组件来进行使用 */}
      <AreaHeaderV1
        title="热门推荐"
        keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
        moreLink="/discover/songs"
      />

      <div className="recommend-list">
        {/* 展示数据，传到子组件里面去 */}
        {hotRecommends.map((item) => {
          return <SongMenuItem key={item.id} itemData={item} />
        })}
      </div>
    </RecommendWrapper>
  )
}

export default memo(HotRecommend)
