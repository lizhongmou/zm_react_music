// 播放器组件，底部播放音乐
import React, { memo, useEffect, useRef, useState } from "react"
import type { FC, ReactNode } from "react"
import { Link } from "react-router-dom"
import { Slider, message } from "antd"
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from "./style"
import { shallowEqualApp, useAppDispatch, useAppSelector } from "@/store"
import { formatTime, getImageSize } from "@/utils/format"
import { getSongPlayUrl } from "@/utils/handle-player"
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction
} from "../store/player"

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  /** 组件内部定义的数据 */
  // 定义播放的状态
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  // 定义播放的ref
  const audioRef = useRef<HTMLAudioElement>(null)

  /** 从redux中获取数据 */
  const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  /** 组件内的副作用操作 */
  useEffect(() => {
    // 1.播放音乐,传递一个id。使用非空断言。这里设置播放地址
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    // 播放音乐的方法，里面有两个回调，播放成功与播放失败
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        // console.log("歌曲播放成功")
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log("歌曲播放失败:", err)
      })

    // 2.获取音乐的总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  /** 音乐播放的进度处理 */
  function handleTimeUpdate() {
    // 1.获取当前的播放时间
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.计算当前歌曲进度
    // 意思是根据是否拖拽来进行设置是否播放，isSliding 是定义拖拽状态
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.根据当前的时间匹配对应的歌词，拿到当前的歌词
    // currentTime/lyrics，用时间去匹配歌词
    // 找到当前时间，但是这个不好找 因此找的是比当前时间大的值，最终使用的缺是当前这个值索引减一的值
    let index = lyrics.length - 1 // 默认是第一句，这样子可以解决最后一句不显示，需要解决第一个值是负一的问题
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        // 拿到前一个
        index = i - 1
        break
      }
    }

    // 4.匹配上对应的歌词的index，在这里解决第一句是负一的问题
    //  只有当发生改变的时候会拿到值。在这里解决了歌词会打印多次的问题
    if (lyricIndex === index || index === -1) return
    // 记录当前的索引
    dispatch(changeLyricIndexAction(index))

    // 5.展示对应的歌词，使用antd库里面的api
    message.open({
      content: lyrics[index].text,
      key: "lyric",
      // 停留的时间， 0 就是不消失，key相同的时候会把之前的移除调
      duration: 0
    })
  }
  // 时间结束了触发
  function handleTimeEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      // 否则调执行下一首
      handleChangeMusic(true)
    }
  }

  /** 组件内部的事件处理 */
  function handlePlayBtnClick() {
    // 调用play的时候播放。play是播放，pause暂停。默认值是false，但是浏览器里面不会在第一次打开页面的时候进行播放，因此设置为false，然后取反
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false)) // 播放失败的时候也会改变状态

    // 2.改变isPlaying的状态。这个是一个异步的状态
    setIsPlaying(!isPlaying)
  }

  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }
  // 切换模式，播放模式
  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true)

    // 1.设置progress
    setProgress(value)

    // 2.获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  function handleSliderChanged(value: number) {
    // 1.获取点击位置的时间
    const currentTime = (value / 100) * duration

    // 2.设置当前播放的时间
    // 根据拖拽改变时间
    audioRef.current!.currentTime = currentTime / 1000

    // 3.currentTime/progress
    setCurrentTime(currentTime)
    setProgress(value)
    // 拖拽完成以后重新设置状态
    setIsSliding(false)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        {/* 播放按键 */}
        {/* isPlaying={isPlaying} 定义播放的时候图标 */}
        <BarControl isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeMusic()}
          ></button>
        </BarControl>

        {/* 头像 进度条。这里是播放的功能 */}
        <BarPlayerInfo>
          <Link to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 50)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* Slider组件，进度组件。value改变进度的百分比。step步长，进度跳转的频率 默认是1 */}
              {/* onAfterChange  自带的api，onChange 可以拖拽 */}
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
              />
              {/* 时间 */}
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>

        {/* 播放器最右面，划分为左右 */}
        <BarOperator playMode={playMode}>
          <div className="left">
            {/* 意思就是精灵图可以放在button里面 作为按键显示的图或文字 */}
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      {/* audio是h5 里面的样式，默认不设置样式不会展示。 handleTimeUpdate 获取播放的时间 */}
      {/*  onEnded={handleTimeEnded} 结束了触发 */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
