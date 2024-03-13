/// <reference types="react-scripts" />
// 在这里添加类型声明
declare namespace NodeJS {
  // 重新定义的时候会对源码里面定义的类型进行扩展、最后合并到源码里面去
  interface ProcessEnv {
    readonly REACT_APP_BASE_URL: string
  }
}
