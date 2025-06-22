import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 或 './' 根据你的目录结构
    },
  },
  plugins: [tailwindcss(), react()],
  base: '/TwinkleStarKnights_Battle_Simulator/', // 设置项目的子路径
});
