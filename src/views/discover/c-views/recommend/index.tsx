import React, { memo, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { useAppDispatch } from "@/store"
import {
  fetchRankingDataAction,
  // fetchBannerDataAction,
  // fetchHotRecommendAction,
  // fetchNewAlbumAction
  fetchRecommendDataAction
} from "./store/recommend"
import { RecommendWrapper } from "./style"
import TopBanner from "./c-cpns/top-banner"
import HotRecommend from "./c-cpns/hot-recommend"
import NewAlbum from "./c-cpns/new-album"
import TopRanking from "./c-cpns/top-ranking"
import UserLogin from "./c-cpns/user-login"
import SettleSinger from "./c-cpns/settle-singer"
import HotAnchor from "./c-cpns/hot-anchor"

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  /** 发起action(获取数据) */
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendDataAction())
    dispatch(fetchRankingDataAction())
    // dispatch(fetchBannerDataAction())
    // dispatch(fetchHotRecommendAction())
    // dispatch(fetchNewAlbumAction())
  }, [])

  /** render函数的返回jsx */
  return (
    <div>
      <RecommendWrapper>
        <TopBanner />
        {/* 下面2划分左右两个区域 */}
        <div className="content wrap-v2">
          <div className="left">
            <HotRecommend />
            <NewAlbum />
            <TopRanking />
          </div>
          <div className="right">
            <UserLogin />
            <SettleSinger />
            <HotAnchor />
          </div>
        </div>
      </RecommendWrapper>
    </div>
  )
}

export default memo(Recommend)
