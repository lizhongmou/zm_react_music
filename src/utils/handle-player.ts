// 通过传递一个id来确定当前播放什么音乐
export function getSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
