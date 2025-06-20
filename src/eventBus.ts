// src/eventBus.ts
import mitt from 'mitt';

// 定义事件类型
type Events = {
  'custom-event': string;
  'another-event': number;
  'battle-start': void;
  'ex-change': number;
};

const emitter = mitt<Events>();

export default emitter;
