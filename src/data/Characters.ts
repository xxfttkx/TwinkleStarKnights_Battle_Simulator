import raw from './characters_all.json';
import { type CharacterData } from '../types';

const fieldMap: Record<string, keyof CharacterData> = {
  No: 'id',
  キャラ名: 'name',
  タイプ: 'type',
  画像: 'avatar',
  ATK: 'atk',
  EX: 'ex',
  EX上昇: 'ex_up',
  最小CT: 'ct',
  陣営: 'faction',
  属性: 'element',
  '★': 'star',
  実装日: 'releaseDate',
};

function convertCharacter(item: Record<string, any>): CharacterData {
  const result: any = {};

  for (const [jpKey, enKey] of Object.entries(fieldMap)) {
    let value = item[jpKey];

    if (['id', 'atk', 'ex', 'ex_up', 'ct'].includes(enKey)) {
      value = parseInt(value ?? '0', 10);
    }

    result[enKey] = value ?? '';
  }

  return result as CharacterData;
}

export const characters: CharacterData[] = (raw as any[])
  .filter(item => item['No'] !== 'No') // 忽略表头行
  .map(convertCharacter);
