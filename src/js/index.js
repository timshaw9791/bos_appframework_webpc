// 时间戳转天数
export function stampToNow(time, cFormat) {
  if (isNaN(time)) {
      console.error("时间格式有误");
      return 'timeError';
  }
  let timeStamp = (Date.now() - +time) / 1000,
      dateObj = {
          mounth: Math.floor(timeStamp / (60 * 60 * 24 * 30)),
          day: Math.floor(timeStamp / (60 * 60 * 24)),
          hour: Math.floor(timeStamp / (60 * 60)),
          minute: Math.floor(timeStamp / 60)
      };
  if (dateObj.mounth >= 12) {
      return parseTime(+time, cFormat);
  } else if (dateObj.mounth >= 1) {
      return dateObj.mounth + "个月前";
  } else if (dateObj.day >= 1) {
      return dateObj.day + "天前";
  } else if (dateObj.hour >= 1) {
      return dateObj.hour + "个小时前";
  } else if (dateObj.minute >= 1) {
      return dateObj.minute + "分钟前";
  } else {
      return "刚刚"
  }
}

// 时间戳转距今间隔(供组件使用)
export function interval(time) {
  if (isNaN(time)) {
      console.error("时间格式有误");
      return 'timeError';
  }
  let timeStamp = (+time - Date.now()) / 24 / 3600 / 1000;
  return timeStamp < 1 ? '0天' : timeStamp < 2 ? '1天' : timeStamp < 3 ? '2天' : '3天';
}