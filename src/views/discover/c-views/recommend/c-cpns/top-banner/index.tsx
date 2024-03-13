import React, { memo, useRef, useState } from "react"
import type { FC, ReactNode, ElementRef } from "react"
import { Carousel } from "antd"
import classNames from "classnames"

import { shallowEqualApp, useAppSelector } from "@/store"
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from "./style"

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  /** 定义内部的数据 */
  // 定义现在是那个图片
  const [currentIndex, setCurrentIndex] = useState(0)
  // ref使用的时候需要绑定组件的类型，在这里并不是单纯的使用的 string类型
  // 在这里 useref本来就是一个函数，使用的时候接收一个泛型<ElementRef >，这个泛型本来没有指定数据类型，因此在后面又传递一个类型<typeof Carousel>
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  /** 从store中获取数据 */
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  /** 事件处理函数 */
  function handleBeforeChange() {
    // setCurrentIndex(-1)
  }
  // 设置
  function handleAfterChange(current: number) {
    setCurrentIndex(current)
  }
  // 切换图片，通过ref来调用
  function handlePrevClick() {
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }

  /** 获取背景图片，这个背景图是高斯模糊，通过服务器进行高斯模糊 */
  let bgImageUrl
  // 证明有值的情况
  // 会操作两次，因为这个的执行时机不一样
  if (currentIndex >= 0 && banners?.length > 0) {
    // 这里的高斯模糊使用的是在请求到图片以后在链接后面添加了 "?imageView&blur=40x20" 这个。
    // 然后将这个绑定到背景上面
    bgImageUrl = banners[currentIndex].imageUrl + "?imageView&blur=40x20"
    // console.log(currentIndex, bgImageUrl)
  }

  return (
    // 在组件上面添加轮播图背景切换的效果
    <BannerWrapper
      style={{
        background: `url('${bgImageUrl}') center center / 6000px`
      }}
    >
      {/* 嵌套 让所有的元素居中 */}
      <div className="banner wrap-v2">
        <BannerLeft>
          {/* 轮播图，使用的是andz里面的  ref={bannerRef} 这个是操作轮播图左右的插槽？effect 做动画*/}
          {/* dots 因此默认指示器 */}
          <Carousel
            autoplay
            dots={false}
            autoplaySpeed={10000}
            effect="fade"
            ref={bannerRef}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
          >
            {banners?.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          {/* 设置指示器，就是轮播图下面的点   */}
          <ul className="dots">
            {banners?.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  {/* 动态添加clas */}
                  <span
                    className={classNames("item", {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
