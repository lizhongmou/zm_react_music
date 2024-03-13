// 1.手动切换
export const BASE_URL = "http://codercba.com:9002"
// export const BASE_URL = " http://localhost:3000"
// export const BASE_URL = 'http://codercba.prod:9002'
export const TIME_OUT = 10000

// 2.依赖当前环境: development/production 开发/生产 环境
// console.log(process.env.NODE_ENV) 查看是什么环境
// let BASE_URL = ''
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://codercba.dev:9002'
// } else {
//   BASE_URL = 'http://codercba.prod:9002'
// }

// export { BASE_URL }

// 3.从定义的环境变量的配置文件中, 加载变量。动态加载
// z这个加载的是undefined。意思就是这个上面定义的文件是没有添加进去
// console.log(process.env.REACT_APP_BASE_URL)
