export interface ILyric {
  time: number
  text: string
}

// [02:11.842]这世界有那么多人
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString: string) {
  // 1.拿到一行行的歌词
  const lines: string[] = lyricString.split("\n")

  // 2.对每句歌词进行解析, 解析成对应的对象
  const lyrics: ILyric[] = []
  for (const line of lines) {
    // 1.匹配结果，执行正则表达式
    const results = timeRegExp.exec(line)
    if (!results) continue

    // 2.获取每一组的时间，一块三组结果
    const time1 = Number(results[1]) * 60 * 1000
    const time2 = Number(results[2]) * 1000
    //判断毫秒的位数
    const time3 =
      results[3].length === 2 ? Number(results[3]) * 10 : Number(results[3])
    // 将最后的值转换为毫秒以后相加
    const time = time1 + time2 + time3

    // 3.获取每一组的文本，replace 传递一个正则表达式
    // 前面的字符串转换为空的字符串，最后只剩余歌词了
    const text = line.replace(timeRegExp, "")

    lyrics.push({ time, text })
  }
  // 将最终的歌词返回出去
  return lyrics
}
