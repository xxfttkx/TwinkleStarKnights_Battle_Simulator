const modules = import.meta.glob('@/characters/*.ts', { eager: true });

import { type CharacterConstructor } from '@/types/CharacterBase';

export const AutoCharacterRegistry: Record<string, CharacterConstructor> = {};

for (const path in modules) {
  const mod = modules[path] as any;
  const CharacterClass = mod.default;

  if (!CharacterClass) continue;
  // console.log(`[INFO] キャラ「${path}」は 定義されています。`);
  const id = CharacterClass.id;

  if (typeof id === 'string') {
    AutoCharacterRegistry[id] = CharacterClass;
    console.log(`[INFO] キャラ「${path}」は static id が定義されています。`);
  } else {
    // 没有 static id 的就不管
    console.warn(`[WARN] キャラ「${path}」は static id が定義されていません。`);
  }
}
