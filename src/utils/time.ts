export const getTime = () => {
  let msg = "";
  let hours = new Date().getHours();
  if (hours > 5 && hours < 11) {
    msg = "早上";
    return msg;
  }
  if (hours > 10 && hours < 13) {
    msg = "中午";
    return msg;
  }
  if ((hour > 0 && hours < 6) || (hours > 19 && hours < 24)) {
    msg = "晚上";
    return msg;
  }
};
