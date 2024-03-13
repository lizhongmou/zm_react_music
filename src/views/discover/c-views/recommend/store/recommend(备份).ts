import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getBanners, getHotRecommend, getNewAlbum } from "../service/recommend"

// 在这里发送网络请求 arg为传递的参数
export const fetchBannerDataAction = createAsyncThunk(
  "banners",
  async (arg, { dispatch }) => {
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
  }
)
export const fetchHotRecommendAction = createAsyncThunk(
  "hotRecommend",
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    dispatch(changeHotRecommendsAction(res.result))
  }
)
export const fetchNewAlbumAction = createAsyncThunk(
  "newAlbum",
  async (arg, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumsAction(res.albums))
  }
)
interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
}

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  // 这个是方法一 对请求到的数据进行处理 将数据放到  initialState 里面
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendsAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    }
  }
  // 请求到数据对请求到的数据进行处理两种写法，方法二。将数据放到  initialState 里面
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log('rejected')
  //     })
  // }
})

export const {
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction
} = recommendSlice.actions
export default recommendSlice.reducer
