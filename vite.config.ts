import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  console.log(env.VITE_SERVER)
  return {
    //css config
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVER,
          changeOrigin: true,

        },
      },
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        //写法更新
        enable: command === "serve", //保证只有开发环境可用
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
  };
});
