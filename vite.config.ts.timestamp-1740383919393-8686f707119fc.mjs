// vite.config.ts
import fs from "node:fs";
import path from "node:path";
import electron from "file:///E:/vue-project/ds-lic/node_modules/vite-plugin-electron/dist/simple.mjs";
import Vue from "file:///E:/vue-project/ds-lic/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///E:/vue-project/ds-lic/node_modules/vite/dist/node/index.js";
import Unocss from "file:///E:/vue-project/ds-lic/node_modules/unocss/dist/vite.mjs";
import Components from "file:///E:/vue-project/ds-lic/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///E:/vue-project/ds-lic/node_modules/unplugin-vue-components/dist/resolvers.js";
import AutoImport from "file:///E:/vue-project/ds-lic/node_modules/unplugin-auto-import/dist/vite.js";
import removeNoMatch from "file:///E:/vue-project/ds-lic/node_modules/vite-plugin-router-warn/dist/index.mjs";
import VueRouter from "file:///E:/vue-project/ds-lic/node_modules/unplugin-vue-router/dist/vite.js";
import VueMacros from "file:///E:/vue-project/ds-lic/node_modules/unplugin-vue-macros/dist/vite.js";
import { VueRouterAutoImports } from "file:///E:/vue-project/ds-lic/node_modules/unplugin-vue-router/dist/index.js";

// package.json
var package_default = {
  name: "light-ink-craftsman",
  type: "module",
  version: "1.0.3",
  private: true,
  description: "base on Electron + Vue + Naive UI created project.",
  author: "Dascom",
  license: "MIT",
  keywords: [
    "electron",
    "rollup",
    "vite",
    "vue3",
    "vue"
  ],
  main: "dist-electron/main/index.js",
  debug: {
    env: {
      VITE_DEV_SERVER_URL: "http://127.0.0.1:3344/"
    }
  },
  scripts: {
    dev: "vite",
    build: "vue-tsc --noEmit && vite build && electron-builder",
    preview: "vite preview",
    lint: "eslint",
    "lint:fix": "eslint --fix",
    typecheck: "npm run typecheck:node && npm run typecheck:web",
    start: "electron-vite preview",
    postinstall: "electron-builder install-app-deps",
    "build:unpack": "npm run build && electron-builder --dir",
    "build:win": "vite build && electron-builder --win",
    "build:mac": "vite build && electron-builder --mac",
    "build:linux": "vite build && electron-builder --linux",
    up: "taze major -I"
  },
  dependencies: {
    "@types/node": "^22.7.4",
    "ant-design-vue": "^4.2.5",
    axios: "^1.6.7",
    "electron-icon-builder": "^2.0.1",
    "vue-i18n": "9.9.0",
    "vue3-count-to": "^1.1.2",
    "vue3-seamless-scroll": "^2.0.1",
    "vxe-pc-ui": "4.3.6",
    "vxe-table": "4.9.8"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.23.2",
    "@arco-design/color": "^0.4.0",
    "@unocss/eslint-config": "^0.61.5",
    "@unocss/eslint-plugin": "^0.61.5",
    "@unocss/preset-rem-to-px": "^0.61.5",
    "@unocss/reset": "^0.61.5",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vueuse/core": "^10.11.0",
    "@vueuse/head": "^2.0.0",
    autoprefixer: "^10.4.20",
    electron: "^29.1.1",
    "electron-builder": "^24.13.3",
    eslint: "^9.7.0",
    "eslint-plugin-format": "^0.1.2",
    less: "^4.0.0",
    "less-loader": "^8.0.0",
    "lint-staged": "^15.2.7",
    "naive-ui": "^2.39.0",
    pinia: "^2.1.7",
    postcss: "^8.4.47",
    sass: "^1.81.0",
    "simple-git-hooks": "^2.11.1",
    tailwindcss: "^3.4.13",
    taze: "^0.16.1",
    typescript: "^5.4.2",
    unocss: "^0.61.5",
    "unplugin-auto-import": "^0.17.6",
    "unplugin-vue-components": "^0.27.2",
    "unplugin-vue-macros": "^2.10.0",
    "unplugin-vue-router": "^0.10.1",
    vite: "^5.1.5",
    "vite-plugin-electron": "^0.28.4",
    "vite-plugin-electron-renderer": "^0.14.5",
    "vite-plugin-router-warn": "^1.0.0",
    "vite-plugin-vue-layouts": "^0.11.0",
    vue: "^3.4.21",
    "vue-router": "^4.4.0",
    "vue-tsc": "^2.0.6"
  },
  "simple-git-hooks": {
    "pre-commit": "yarn lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
};

// vite.config.ts
var vite_config_default = defineConfig(({ command }) => {
  fs.rmSync("dist-electron", { recursive: true, force: true });
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  const viteDevServerUrl = process.env.VSCODE_DEBUG ? package_default.debug.env.VITE_DEV_SERVER_URL : "http://localhost:6101";
  return {
    plugins: [
      VueRouter({
        extensions: [".vue"],
        dts: "src/typed-router.d.ts"
      }),
      VueMacros({
        plugins: {
          vue: Vue()
        }
      }),
      AutoImport({
        imports: [
          "vue",
          "@vueuse/head",
          "@vueuse/core",
          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            "vue-router/auto": ["useLink"]
          }
        ],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/composables"],
        vueTemplate: true
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: false
      }),
      Unocss(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: "electron/main/index.ts",
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */
                "[startup] Electron App"
              );
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys(
                  "dependencies" in package_default ? package_default.dependencies : {}
                )
              }
            }
          }
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in package_default ? package_default.dependencies : {}
                )
              }
            }
          }
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {}
      }),
      removeNoMatch()
      // vueI18nPlugin({
      //   include: path.resolve(__dirname, "./src/i18n/locales"),
      //   runtimeOnly: false,
      // }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
        "~": path.resolve(process.cwd())
      }
    },
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(package_default.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port
      };
    })(),
    clearScreen: false,
    build: {
      chunkSizeWarningLimit: 1024,
      // chunk 大小警告的限制（单位kb）
      target: "esnext"
    },
    define: {
      __SERVER_URL__: JSON.stringify(viteDevServerUrl)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcdnVlLXByb2plY3RcXFxcZHMtbGljXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx2dWUtcHJvamVjdFxcXFxkcy1saWNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Z1ZS1wcm9qZWN0L2RzLWxpYy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcclxuaW1wb3J0IGVsZWN0cm9uIGZyb20gJ3ZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZSc7XHJcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnO1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcclxuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XHJcbmltcG9ydCByZW1vdmVOb01hdGNoIGZyb20gJ3ZpdGUtcGx1Z2luLXJvdXRlci13YXJuJztcclxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnO1xyXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSc7XHJcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcic7XHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xyXG4vLyBpbXBvcnQgdnVlSTE4blBsdWdpbiBmcm9tIFwiQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xyXG4gIC8vIGNvbnN0IHZpdGVFbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIGZzLnJtU3luYygnZGlzdC1lbGVjdHJvbicsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KTtcclxuXHJcbiAgY29uc3QgaXNTZXJ2ZSA9IGNvbW1hbmQgPT09ICdzZXJ2ZSc7XHJcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCc7XHJcbiAgY29uc3Qgc291cmNlbWFwID0gaXNTZXJ2ZSB8fCAhIXByb2Nlc3MuZW52LlZTQ09ERV9ERUJVRztcclxuXHJcbiAgLy8gXHU1QjlBXHU0RTQ5XHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHJcbiAgY29uc3Qgdml0ZURldlNlcnZlclVybCA9IHByb2Nlc3MuZW52LlZTQ09ERV9ERUJVR1xyXG4gICAgPyBwa2cuZGVidWcuZW52LlZJVEVfREVWX1NFUlZFUl9VUkxcclxuICAgIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NjEwMSc7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIFZ1ZVJvdXRlcih7XHJcbiAgICAgICAgZXh0ZW5zaW9uczogWycudnVlJ10sXHJcbiAgICAgICAgZHRzOiAnc3JjL3R5cGVkLXJvdXRlci5kLnRzJyxcclxuICAgICAgfSksXHJcbiAgICAgIFZ1ZU1hY3Jvcyh7XHJcbiAgICAgICAgcGx1Z2luczoge1xyXG4gICAgICAgICAgdnVlOiBWdWUoKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcclxuICAgICAgICAgICdAdnVldXNlL2NvcmUnLFxyXG4gICAgICAgICAgVnVlUm91dGVyQXV0b0ltcG9ydHMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGFkZCBhbnkgb3RoZXIgaW1wb3J0cyB5b3Ugd2VyZSByZWx5aW5nIG9uXHJcbiAgICAgICAgICAgICd2dWUtcm91dGVyL2F1dG8nOiBbJ3VzZUxpbmsnXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICAgIGRpcnM6IFsnc3JjL2NvbXBvc2FibGVzJ10sXHJcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgZHRzOiBmYWxzZSxcclxuICAgICAgfSksXHJcbiAgICAgIFVub2NzcygpLFxyXG4gICAgICBlbGVjdHJvbih7XHJcbiAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgLy8gU2hvcnRjdXQgb2YgYGJ1aWxkLmxpYi5lbnRyeWBcclxuICAgICAgICAgIGVudHJ5OiAnZWxlY3Ryb24vbWFpbi9pbmRleC50cycsXHJcbiAgICAgICAgICBvbnN0YXJ0KHsgc3RhcnR1cCB9KSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5WU0NPREVfREVCVUcpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIC8qIEZvciBgLnZzY29kZS8uZGVidWcuc2NyaXB0Lm1qc2AgKi8gJ1tzdGFydHVwXSBFbGVjdHJvbiBBcHAnLFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN0YXJ0dXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpdGU6IHtcclxuICAgICAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgICBzb3VyY2VtYXAsXHJcbiAgICAgICAgICAgICAgbWluaWZ5OiBpc0J1aWxkLFxyXG4gICAgICAgICAgICAgIG91dERpcjogJ2Rpc3QtZWxlY3Ryb24vbWFpbicsXHJcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLy8gU29tZSB0aGlyZC1wYXJ0eSBOb2RlLmpzIGxpYnJhcmllcyBtYXkgbm90IGJlIGJ1aWx0IGNvcnJlY3RseSBieSBWaXRlLCBlc3BlY2lhbGx5IGBDL0MrK2AgYWRkb25zLFxyXG4gICAgICAgICAgICAgICAgLy8gd2UgY2FuIHVzZSBgZXh0ZXJuYWxgIHRvIGV4Y2x1ZGUgdGhlbSB0byBlbnN1cmUgdGhleSB3b3JrIGNvcnJlY3RseS5cclxuICAgICAgICAgICAgICAgIC8vIE90aGVycyBuZWVkIHRvIHB1dCB0aGVtIGluIGBkZXBlbmRlbmNpZXNgIHRvIGVuc3VyZSB0aGV5IGFyZSBjb2xsZWN0ZWQgaW50byBgYXBwLmFzYXJgIGFmdGVyIHRoZSBhcHAgaXMgYnVpbHQuXHJcbiAgICAgICAgICAgICAgICAvLyBPZiBjb3Vyc2UsIHRoaXMgaXMgbm90IGFic29sdXRlLCBqdXN0IHRoaXMgd2F5IGlzIHJlbGF0aXZlbHkgc2ltcGxlLiA6KVxyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKFxyXG4gICAgICAgICAgICAgICAgICAnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30sXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJlbG9hZDoge1xyXG4gICAgICAgICAgLy8gU2hvcnRjdXQgb2YgYGJ1aWxkLnJvbGx1cE9wdGlvbnMuaW5wdXRgLlxyXG4gICAgICAgICAgLy8gUHJlbG9hZCBzY3JpcHRzIG1heSBjb250YWluIFdlYiBhc3NldHMsIHNvIHVzZSB0aGUgYGJ1aWxkLnJvbGx1cE9wdGlvbnMuaW5wdXRgIGluc3RlYWQgYGJ1aWxkLmxpYi5lbnRyeWAuXHJcbiAgICAgICAgICBpbnB1dDogJ2VsZWN0cm9uL3ByZWxvYWQvaW5kZXgudHMnLFxyXG4gICAgICAgICAgdml0ZToge1xyXG4gICAgICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICAgIHNvdXJjZW1hcDogc291cmNlbWFwID8gJ2lubGluZScgOiB1bmRlZmluZWQsIC8vICMzMzJcclxuICAgICAgICAgICAgICBtaW5pZnk6IGlzQnVpbGQsXHJcbiAgICAgICAgICAgICAgb3V0RGlyOiAnZGlzdC1lbGVjdHJvbi9wcmVsb2FkJyxcclxuICAgICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoXHJcbiAgICAgICAgICAgICAgICAgICdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSxcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBQbG95ZmlsbCB0aGUgRWxlY3Ryb24gYW5kIE5vZGUuanMgQVBJIGZvciBSZW5kZXJlciBwcm9jZXNzLlxyXG4gICAgICAgIC8vIElmIHlvdSB3YW50IHVzZSBOb2RlLmpzIGluIFJlbmRlcmVyIHByb2Nlc3MsIHRoZSBgbm9kZUludGVncmF0aW9uYCBuZWVkcyB0byBiZSBlbmFibGVkIGluIHRoZSBNYWluIHByb2Nlc3MuXHJcbiAgICAgICAgLy8gU2VlIFx1RDgzRFx1REM0OSBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24tdml0ZS92aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlclxyXG4gICAgICAgIHJlbmRlcmVyOiB7fSxcclxuICAgICAgfSksXHJcbiAgICAgIHJlbW92ZU5vTWF0Y2goKSxcclxuICAgICAgLy8gdnVlSTE4blBsdWdpbih7XHJcbiAgICAgIC8vICAgaW5jbHVkZTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9pMThuL2xvY2FsZXNcIiksXHJcbiAgICAgIC8vICAgcnVudGltZU9ubHk6IGZhbHNlLFxyXG4gICAgICAvLyB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYycpLFxyXG4gICAgICAgICd+JzogcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCkpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjpcclxuICAgICAgcHJvY2Vzcy5lbnYuVlNDT0RFX0RFQlVHXHJcbiAgICAgICYmICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwa2cuZGVidWcuZW52LlZJVEVfREVWX1NFUlZFUl9VUkwpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBob3N0OiB1cmwuaG9zdG5hbWUsXHJcbiAgICAgICAgICBwb3J0OiArdXJsLnBvcnQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSkoKSxcclxuICAgIGNsZWFyU2NyZWVuOiBmYWxzZSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAyNCwgLy8gY2h1bmsgXHU1OTI3XHU1QzBGXHU4QjY2XHU1NDRBXHU3Njg0XHU5NjUwXHU1MjM2XHVGRjA4XHU1MzU1XHU0RjREa2JcdUZGMDlcclxuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcclxuICAgIH0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgX19TRVJWRVJfVVJMX186IEpTT04uc3RyaW5naWZ5KHZpdGVEZXZTZXJ2ZXJVcmwpLFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJsaWdodC1pbmstY3JhZnRzbWFuXCIsXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjNcIixcclxuICBcInByaXZhdGVcIjogdHJ1ZSxcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiYmFzZSBvbiBFbGVjdHJvbiArIFZ1ZSArIE5haXZlIFVJIGNyZWF0ZWQgcHJvamVjdC5cIixcclxuICBcImF1dGhvclwiOiBcIkRhc2NvbVwiLFxyXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxyXG4gIFwia2V5d29yZHNcIjogW1xyXG4gICAgXCJlbGVjdHJvblwiLFxyXG4gICAgXCJyb2xsdXBcIixcclxuICAgIFwidml0ZVwiLFxyXG4gICAgXCJ2dWUzXCIsXHJcbiAgICBcInZ1ZVwiXHJcbiAgXSxcclxuICBcIm1haW5cIjogXCJkaXN0LWVsZWN0cm9uL21haW4vaW5kZXguanNcIixcclxuICBcImRlYnVnXCI6IHtcclxuICAgIFwiZW52XCI6IHtcclxuICAgICAgXCJWSVRFX0RFVl9TRVJWRVJfVVJMXCI6IFwiaHR0cDovLzEyNy4wLjAuMTozMzQ0L1wiXHJcbiAgICB9XHJcbiAgfSxcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAmJiB2aXRlIGJ1aWxkICYmIGVsZWN0cm9uLWJ1aWxkZXJcIixcclxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50XCIsXHJcbiAgICBcImxpbnQ6Zml4XCI6IFwiZXNsaW50IC0tZml4XCIsXHJcbiAgICBcInR5cGVjaGVja1wiOiBcIm5wbSBydW4gdHlwZWNoZWNrOm5vZGUgJiYgbnBtIHJ1biB0eXBlY2hlY2s6d2ViXCIsXHJcbiAgICBcInN0YXJ0XCI6IFwiZWxlY3Ryb24tdml0ZSBwcmV2aWV3XCIsXHJcbiAgICBcInBvc3RpbnN0YWxsXCI6IFwiZWxlY3Ryb24tYnVpbGRlciBpbnN0YWxsLWFwcC1kZXBzXCIsXHJcbiAgICBcImJ1aWxkOnVucGFja1wiOiBcIm5wbSBydW4gYnVpbGQgJiYgZWxlY3Ryb24tYnVpbGRlciAtLWRpclwiLFxyXG4gICAgXCJidWlsZDp3aW5cIjogXCJ2aXRlIGJ1aWxkICYmIGVsZWN0cm9uLWJ1aWxkZXIgLS13aW5cIixcclxuICAgIFwiYnVpbGQ6bWFjXCI6IFwidml0ZSBidWlsZCAmJiBlbGVjdHJvbi1idWlsZGVyIC0tbWFjXCIsXHJcbiAgICBcImJ1aWxkOmxpbnV4XCI6IFwidml0ZSBidWlsZCAmJiBlbGVjdHJvbi1idWlsZGVyIC0tbGludXhcIixcclxuICAgIFwidXBcIjogXCJ0YXplIG1ham9yIC1JXCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjIuNy40XCIsXHJcbiAgICBcImFudC1kZXNpZ24tdnVlXCI6IFwiXjQuMi41XCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNi43XCIsXHJcbiAgICBcImVsZWN0cm9uLWljb24tYnVpbGRlclwiOiBcIl4yLjAuMVwiLFxyXG4gICAgXCJ2dWUtaTE4blwiOiBcIjkuOS4wXCIsXHJcbiAgICBcInZ1ZTMtY291bnQtdG9cIjogXCJeMS4xLjJcIixcclxuICAgIFwidnVlMy1zZWFtbGVzcy1zY3JvbGxcIjogXCJeMi4wLjFcIixcclxuICAgIFwidnhlLXBjLXVpXCI6IFwiNC4zLjZcIixcclxuICAgIFwidnhlLXRhYmxlXCI6IFwiNC45LjhcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAYW50ZnUvZXNsaW50LWNvbmZpZ1wiOiBcIl4yLjIzLjJcIixcclxuICAgIFwiQGFyY28tZGVzaWduL2NvbG9yXCI6IFwiXjAuNC4wXCIsXHJcbiAgICBcIkB1bm9jc3MvZXNsaW50LWNvbmZpZ1wiOiBcIl4wLjYxLjVcIixcclxuICAgIFwiQHVub2Nzcy9lc2xpbnQtcGx1Z2luXCI6IFwiXjAuNjEuNVwiLFxyXG4gICAgXCJAdW5vY3NzL3ByZXNldC1yZW0tdG8tcHhcIjogXCJeMC42MS41XCIsXHJcbiAgICBcIkB1bm9jc3MvcmVzZXRcIjogXCJeMC42MS41XCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNFwiLFxyXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuMTEuMFwiLFxyXG4gICAgXCJAdnVldXNlL2hlYWRcIjogXCJeMi4wLjBcIixcclxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMjBcIixcclxuICAgIFwiZWxlY3Ryb25cIjogXCJeMjkuMS4xXCIsXHJcbiAgICBcImVsZWN0cm9uLWJ1aWxkZXJcIjogXCJeMjQuMTMuM1wiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOS43LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1mb3JtYXRcIjogXCJeMC4xLjJcIixcclxuICAgIFwibGVzc1wiOiBcIl40LjAuMFwiLFxyXG4gICAgXCJsZXNzLWxvYWRlclwiOiBcIl44LjAuMFwiLFxyXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjdcIixcclxuICAgIFwibmFpdmUtdWlcIjogXCJeMi4zOS4wXCIsXHJcbiAgICBcInBpbmlhXCI6IFwiXjIuMS43XCIsXHJcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjQ3XCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS44MS4wXCIsXHJcbiAgICBcInNpbXBsZS1naXQtaG9va3NcIjogXCJeMi4xMS4xXCIsXHJcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xM1wiLFxyXG4gICAgXCJ0YXplXCI6IFwiXjAuMTYuMVwiLFxyXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNC4yXCIsXHJcbiAgICBcInVub2Nzc1wiOiBcIl4wLjYxLjVcIixcclxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy42XCIsXHJcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjcuMlwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtbWFjcm9zXCI6IFwiXjIuMTAuMFwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtcm91dGVyXCI6IFwiXjAuMTAuMVwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMS41XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWVsZWN0cm9uXCI6IFwiXjAuMjguNFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlclwiOiBcIl4wLjE0LjVcIixcclxuICAgIFwidml0ZS1wbHVnaW4tcm91dGVyLXdhcm5cIjogXCJeMS4wLjBcIixcclxuICAgIFwidml0ZS1wbHVnaW4tdnVlLWxheW91dHNcIjogXCJeMC4xMS4wXCIsXHJcbiAgICBcInZ1ZVwiOiBcIl4zLjQuMjFcIixcclxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjQuMFwiLFxyXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMC42XCJcclxuICB9LFxyXG4gIFwic2ltcGxlLWdpdC1ob29rc1wiOiB7XHJcbiAgICBcInByZS1jb21taXRcIjogXCJ5YXJuIGxpbnQtc3RhZ2VkXCJcclxuICB9LFxyXG4gIFwibGludC1zdGFnZWRcIjoge1xyXG4gICAgXCIqXCI6IFwiZXNsaW50IC0tZml4XCJcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxPQUFPLFFBQVE7QUFDdFEsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sY0FBYztBQUNyQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxv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
