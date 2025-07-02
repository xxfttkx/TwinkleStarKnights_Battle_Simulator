// src/eventBus.ts
import mitt from 'mitt';

// 定义事件类型
type Events = {
  'custom-event': string;
  'another-event': number;
  'battle-start': void;
  'ex-change': number; //全体
  'ex-edit': [string, number]; // [角色名称, 新的 EX 值]
  'ex-up-edit': [string, number]; // [角色名称, 新的 EX_UP 值]
  'ex-changed': string; // 角色名称
  'ex-up-changed': string; // 角色名称
};

const emitter = mitt<Events>();

export default emitter;
