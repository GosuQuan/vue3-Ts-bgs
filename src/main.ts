import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
//忽略当前文件ts类型的检测否则有红色提示(打包会失败)
//@ts-expect-error ejs打包
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const app = createApp(App);
import "virtual:svg-icons-register";
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
console.log(import.meta.env);
