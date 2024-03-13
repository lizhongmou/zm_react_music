export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + "万"
  } else {
    return count
  }
}

// 接收三个参数，最后一个参数可以不传，默认使用第二个
export function getImageSize(
  imageUrl: string,
  width: number,
  height: number = width
) {
  // 返回的是拼接以后的url
  return imageUrl + `?param=${width}y${height}`
}

// 时间格式化，传一个时间戳，格式化为分秒
export function formatTime(time: number) {
  // 1.将毫秒转成秒钟
  const timeSeconds = time / 1000

  // 2.获取分钟和秒钟
  // 100s => 01:40
  // 200s => 03:20
  // Math.floor(100 / 60) => 1
  const minute = Math.floor(timeSeconds / 60)
  const second = Math.floor(timeSeconds) % 60

  // 3.格式化时间
  const formatMinute = String(minute).padStart(2, "0")
  const formatSecond = String(second).padStart(2, "0")

  return `${formatMinute}:${formatSecond}`
}
