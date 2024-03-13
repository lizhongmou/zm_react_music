import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getArtistList,
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail
} from "../service/recommend"

// 这个写法是没有传递参数的时候这样子写，只需要进行一次网络请求，即可拿到所有数据
export const fetchRecommendDataAction = createAsyncThunk(
  "fetchdata",
  //  _ 这个表示在这里传递的参数，如果需要参数 则需要写入多个值 一一对应。但是这里没有传递
  (_, { dispatch }) => {
    // 在这里写三个请求，这里不能使用await asyun，因为必须等有结果了才能进行下一个
    getBanners().then((res) => {
      dispatch(changeBannersAction(res.banners))
    })
    getHotRecommend(8).then((res) => {
      dispatch(changeHotRecommendsAction(res.result))
    })
    getNewAlbum().then((res) => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
    getArtistList(5).then((res) => {
      dispatch(changeSettleSingersAction(res.artists))
    })
  }
)

// 意思就是在这里定义了数组，定义了这些数组的类型。
const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  "rankingData",

  (_, { dispatch }) => {
    // 获取榜单的数据，两种处理数据的思路
    // 1.每一个请求单独处理，最后单独进行dispatch
    // for (const id of rankingIds) {
    //   getPlaylistDetail(id).then((res) => {
    //     switch (id) {
    //       case 19723756:
    //         console.log('飙升榜的数据', res)
    //         break
    //       case 3779629:
    //         console.log('新歌榜的数据', res)
    //         break
    //       case 2884035:
    //         console.log('原创榜的数据', res)
    //         break
    //     }
    //   })
    // }

    // 2.将三个结果都拿到, 统一放到一个数组中管理\
    // 保障一: 获取到所有的结果后, 进行dispatch操作
    // 保障二: 获取到的结果一定是有正确的顺序
    // 发送请求顺序与拿到数据的顺序没有关系
    // 定义了一个promises数组，类型是一个promise，这个接收一个泛型（必须传），这个是约束调用时候的数据类型。
    const promises: Promise<any>[] = []
    // 通过这里拿到了id，就是在前面定义的数据。每一个分组的类型
    for (const id of rankingIds) {
      // 然后给这里添加进去
      promises.push(getPlaylistDetail(id))
    }

    // 全部发起网络请求，发送的网络请求为在前面依次添加的
    Promise.all(promises).then((res) => {
      // // 拿到了映射以后单个数据，即请求到的数据。进行了过滤
      // const playlists = res?.map((item) => item.playlist)
      // // console.log(playlists)
      // // 放到了 rankings 里面
      // dispatch(changeRankingsAction(playlists))

      // 确定有值的时候执行 item.playlist
      const playlists = res
        .filter((item) => item.playlist)
        .map((item) => item.playlist)
      dispatch(changeRankingsAction(playlists))
    })
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  settleSingers: []
  rankings: any[]
  // upRanking: any
  // newRanking: any
  // originRanking: any
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  settleSingers: []
}

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendsAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeSettleSingersAction(state, { payload }) {
      state.settleSingers = payload
    }
  }
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
  changeNewAlbumsAction,
  changeRankingsAction,
  changeSettleSingersAction
} = recommendSlice.actions
export default recommendSlice.reducer
