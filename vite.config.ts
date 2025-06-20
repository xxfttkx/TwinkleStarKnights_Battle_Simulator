import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TwinkleStarKnights_Battle_Simulator/', // 设置项目的子路径
});
