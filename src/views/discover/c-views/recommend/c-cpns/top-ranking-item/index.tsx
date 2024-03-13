import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { RankingItemWrapper } from "./style"
import { getImageSize } from "@/utils/format"
import { useAppDispatch } from "@/store"
import { fetchCurrentSongAction } from "@/views/player/store/player"

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  // 解构里面需要遍历的数组，在页面渲染的列表
  const { tracks = [] } = itemData
  // 播放热门榜单里面
  const dispatch = useAppDispatch()
  function handlePlayClick(id: number) {
    // 在这里通过改变网络请求需要传递的number的值，然后播放别的歌曲。在这里修改number
    dispatch(fetchCurrentSongAction(id))
  }
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          {/* 模板，使用精灵图 */}
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          {/* 飙升榜 */}
          <div className="name">{itemData.name}</div>
          {/* 点击这些图标，使用精灵图 */}
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>

      <div className="list">
        {tracks?.slice(0, 10)?.map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
