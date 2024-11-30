import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
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
            'NImage',
            'NEllipsis',
            'NTable',
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
