export const getTime = () => {
  let msg = "";
  const hours = new Date().getHours();

  if (hours > 5 && hours < 11) {
    msg = "早上";
  } else if (hours > 10 && hours < 13) {
    msg = "中午";
  } else if (hours >= 13 && hours < 19) {
    msg = "下午";
  } else if ((hours >= 0 && hours < 6) || (hours >= 19 && hours <= 23)) {
    msg = "晚上";
  }
  return msg;
};
