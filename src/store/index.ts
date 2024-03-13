import { configureStore } from "@reduxjs/toolkit"
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  shallowEqual
} from "react-redux"

import counterReducer from "./modules/counter"
import recommendReducer from "../views/discover/c-views/recommend/store/recommend"
import playerReducer from "../views/player/store/player"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer
  }
})
// 获取类型 store.getState
// 然后将数据类型进行了赋值？
type GetStateFnType = typeof store.getState
// ReturnType 这个是一个工具.获取函数返回值类型，导出这个数据类型，用于显示歌词时候定义的getstate里面数据类型的使用
export type IRootState = ReturnType<GetStateFnType>
// 获取数据类型
type DispatchType = typeof store.dispatch

// useAppSelector的hook
// 使用了函数的签名
//  意思是将 useSelector 这个函数浅拷贝给 useAppSelector，但是里面没有定义任何的方法 然后使用了函数签名？
// useAppSelector的类型设置为 TypedUseSelectorHook 但是调用 IRootState 里面的方法
// 函数签名相当于调用了 IRootState 里面的方法
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
