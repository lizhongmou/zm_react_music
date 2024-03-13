import React, { memo, useRef } from "react"
import type { FC, ReactNode, ElementRef } from "react"
import { Carousel } from "antd"
import { AlbumWrapper } from "./style"
import AreaHeaderV1 from "@/components/area-header-v1"
import { useAppSelector } from "@/store"
import NewAlbumItem from "@/components/new-album-item"

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  /** 定义内部数据 */
  // 拿到轮播图 对这个组件进行操作
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  /** redux中获取数据 */
  const { newAlbums } = useAppSelector((state) => ({
    newAlbums: state.recommend.newAlbums
  }))

  /** 事件处理函数 */
  function handlePrevClick() {
    // 拿到这个组件以后，调用轮播图带的api来切换图片
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }

  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        {/* 左 */}
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePrevClick}
        ></button>
        <div className="banner">
          {/*  speed={1500} 轮播图的速度 */}
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {/* 是双层遍历 */}
            {/* 、两个页面，第一层遍历。第二个遍历是为了显示这个里面的元素，即每一个页面的5个子元素 */}
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  {/* 嵌套了一个div，防止使用的是轮播图这个组件里面内联样式 */}
                  <div className="album-list">
                    {/* 、item * 5, (item + 1) * 5 这个是一个小算法，为了截取其中的五条数据。这个算法的关键是从第0 条开始的 */}
                    {/* 依赖上面的 0 1，需要进行双层遍历 */}
                    {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <NewAlbumItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        {/* 右 */}
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
