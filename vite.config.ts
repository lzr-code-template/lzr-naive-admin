import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { getRootPath, getSrcPath } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression(),
    DefineOptions(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
            'NTag',
            'NButton',
            'NEllipsis',
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '~': getRootPath(),
      '@': getSrcPath(),
    },
  },
})
