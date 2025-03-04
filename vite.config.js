import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import px2rem from "postcss-px2rem";
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和 rem.js中相同
  remUnit: 16,
});

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @use "sass:string";
          @use "sass:meta";
          @use "@/assets/common.scss" as *;
        `,
      },
    },
    postcss: {
      plugins: [postcss],
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets", //静态资源的存放目录
    rollupOptions: {
      output: {
        // 控制JS文件的输出目录
        entryFileNames: "js/[name]-[hash].js", // 入口 JS 文件输出到 js 文件夹
        chunkFileNames: "js/[name]-[hash].js", // 分割的 JS 文件也输出到 js 文件夹
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "css/[name]-[hash][extname]"; // CSS文件输出到 css 文件夹
          }

          if (
            /\.(png|jpe?g|gif|svg|webp|avif|bmp|ico|eot|ttf|woff|woff2)$/.test(
              assetInfo.name
            )
          ) {
            return "img/[name]-[hash][extname]"; // 图片文件输出到 img 文件夹
          }
          return "assets/[name]-[hash][extname]"; // 其他文件默认放到 assets 文件夹
        },
      },
    },
    assetsInlineLimit: 4096, //图片转base64编码的阈值
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
