const path = require("path");
import { builtinModules } from "module";
import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import resolve from "vite-plugin-resolve";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import pkg from "../../package.json";

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  plugins: [
    vue(),
    resolveElectron(),
    // 下面两个插件是为了按需引入element-ui而用的
    // https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    /**
     * you can custom other module in here
     * 🚧 need to make sure custom-resolve-module in `dependencies`, that will ensure that the electron-builder can package them correctly
     * @example
     * {
     *   'electron-store': 'const Store = require("electron-store"); export defalut Store;',
     * }
     */
  ],
  base: "./",
  build: {
    emptyOutDir: true,
    outDir: "../../dist/renderer",
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          "group-view": [
            "./render/src/views/ComputedAndWatch.vue",
            "./render/src/views/Home.vue",
          ],
        },
      },
    },
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
});

// ------- For use Electron, NodeJs in Renderer-process -------
// https://github.com/caoxiemeihao/electron-vue-vite/issues/52
export function resolveElectron(
  resolves: Parameters<typeof resolve>[0] = {}
): Plugin[] {
  const builtins = builtinModules.filter((t) => !t.startsWith("_"));

  return [
    {
      name: "vite-plugin-electron-config",
      config(config) {
        if (!config.optimizeDeps) config.optimizeDeps = {};
        if (!config.optimizeDeps.exclude) config.optimizeDeps.exclude = [];

        config.optimizeDeps.exclude.push("electron", ...builtins);
      },
    },
    // https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/resolve#readme
    resolve({
      electron: electronExport(),
      ...builtinModulesExport(builtins),
      ...resolves,
    }),
  ];

  function electronExport() {
    return `
  /**
   * All exports module see https://www.electronjs.org -> API -> Renderer Process Modules
   */
  const electron = require("electron");
  const {
    clipboard,
    nativeImage,
    shell,
    contextBridge,
    crashReporter,
    ipcRenderer,
    webFrame,
    desktopCapturer,
    deprecate,
  } = electron;
  
  export {
    electron as default,
    clipboard,
    nativeImage,
    shell,
    contextBridge,
    crashReporter,
    ipcRenderer,
    webFrame,
    desktopCapturer,
    deprecate,
  }
  `;
  }

  function builtinModulesExport(modules: string[]) {
    return modules
      .map((moduleId) => {
        const nodeModule = require(moduleId);
        const requireModule = `const __builtinModule = require("${moduleId}");`;
        const exportDefault = `export default __builtinModule`;
        const exportMembers =
          Object.keys(nodeModule)
            .map((attr) => `export const ${attr} = __builtinModule.${attr}`)
            .join(";\n") + ";";
        const nodeModuleCode = `
${requireModule}

${exportDefault}

${exportMembers}
  `;

        return { [moduleId]: nodeModuleCode };
      })
      .reduce((memo, item) => Object.assign(memo, item), {});
  }
}
