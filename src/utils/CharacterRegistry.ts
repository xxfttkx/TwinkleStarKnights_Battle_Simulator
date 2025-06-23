// characterRegistry.ts
import { CharacterBase } from '@/types/CharacterBase';
import type { CharacterData } from '@/types';
import { 夏空の一番星_ヴィーナス } from '@/characters/夏空の一番星_ヴィーナス';
import { 招福の明星_ヴィーナス } from '@/characters/招福の明星_ヴィーナス';
import { 正義のハッカー_コハルコ } from '@/characters/正義のハッカー_コハルコ';
import { 舞うは九浄の桜花_ヘレナ } from '@/characters/舞うは九浄の桜花_ヘレナ';
import { 霹靂の射手_梨緒 } from '@/characters/霹靂の射手_梨緒';
import { 聖夜のキャロル_ルルカ } from '@/characters/聖夜のキャロル_ルルカ';
import { 太陽の祝福_フィオナ } from '@/characters/太陽の祝福_フィオナ';
import { 夏のお姉ちゃん_サーシャ } from '@/characters/夏のお姉ちゃん_サーシャ';
import { 黄昏の超新星_トワ先生_黎明 } from '@/characters/黄昏の超新星トワ先生《黎明》';
import { 自称妹魔王_メイプル } from '@/characters/自称妹魔王_メイプル';
import { 渇望の武闘天使_イングリット } from '@/characters/渇望の武闘天使_イングリット';
import { 智謀の黒き微笑み_ジュリエッテ } from '@/characters/智謀の黒き微笑み_ジュリエッテ';
// …其他角色类

type CharacterConstructor = new (
  char: CharacterData,
  battle: any
) => CharacterBase;

export const CharacterRegistry: Record<string, CharacterConstructor> = {
  夏空の一番星ヴィーナス: 夏空の一番星_ヴィーナス,
  招福の明星ヴィーナス: 招福の明星_ヴィーナス,
  正義のハッカーコハルコ: 正義のハッカー_コハルコ,
  舞うは九浄の桜花ヘレナ: 舞うは九浄の桜花_ヘレナ,
  霹靂の射手梨緒: 霹靂の射手_梨緒,
  聖夜のキャロルルルカ: 聖夜のキャロル_ルルカ,
  太陽の祝福フィオナ: 太陽の祝福_フィオナ,
  '夏のお姉ちゃん♪サーシャ': 夏のお姉ちゃん_サーシャ,
  '黄昏の超新星トワ先生《黎明》': 黄昏の超新星_トワ先生_黎明,
  '自称・妹魔王メイプル': 自称妹魔王_メイプル,
  渇望の武闘天使イングリット: 渇望の武闘天使_イングリット,
  智謀の黒き微笑みジュリエッテ: 智謀の黒き微笑み_ジュリエッテ,
};
