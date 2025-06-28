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
import { 煌炎の超天使_アナ_煌炎 } from '@/characters/煌炎の超天使アナ《煌炎》';
import { 甘愛フレグランス_シャルレーヌ } from '@/characters/甘愛フレグランスシャルレーヌ';
import { はにかみチシャ猫_ヒトリ } from '@/characters/はにかみチシャ猫ヒトリ';
import { 一途アイドル_メルエル } from '@/characters/一途アイドルメルエル';
import { 歩く図書館_モネ } from '@/characters/歩く図書館モネ';
import { キュートスタイル_レミカ } from '@/characters/キュートスタイルレミカ';
import { 流星の姫君_フィオナ } from '@/characters/流星の姫君フィオナ';
import { グロウンヒーロー_アポロ_大人 } from '@/characters/グロウンヒーロー_アポロ_大人';
import { 最幸の真魔法少女_サチ_運命 } from '@/characters/最幸の真魔法少女_サチ_運命';
import { 蒐集の魔女_トレジアンナ } from '@/characters/蒐集の魔女_トレジアンナ';
import { 白うさぎの純情_蘭美 } from '@/characters/白うさぎの純情_蘭美';
import { 嵐を翔る射手_聖沙 } from '@/characters/嵐を翔る射手_聖沙';
import { 命脈の幼アバター_アルモタヘル_ちぃ } from '@/characters/命脈の幼アバター_アルモタヘル_ちぃ';
import { 万成の幼天使_セシア } from '@/characters/万成の幼天使_セシア';
import { お転婆バサラ姫_パルミエ } from '@/characters/お転婆バサラ姫_パルミエ';
import { 美の冒涜者_ヴァレリー } from '@/characters/美の冒涜者_ヴァレリー';
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
  '煌炎の超天使アナ《煌炎》': 煌炎の超天使_アナ_煌炎,
  甘愛フレグランスシャルレーヌ: 甘愛フレグランス_シャルレーヌ,
  はにかみチシャ猫ヒトリ: はにかみチシャ猫_ヒトリ,
  一途アイドルメルエル: 一途アイドル_メルエル,
  歩く図書館モネ: 歩く図書館_モネ,
  キュートスタイルレミカ: キュートスタイル_レミカ,
  流星の姫君フィオナ: 流星の姫君_フィオナ,
  'グロウンヒーローアポロ(大人)': グロウンヒーロー_アポロ_大人,
  '最幸の真魔法少女サチ《運命》': 最幸の真魔法少女_サチ_運命,
  蒐集の魔女トレジアンナ: 蒐集の魔女_トレジアンナ,
  白うさぎの純情蘭美: 白うさぎの純情_蘭美,
  嵐を翔る射手聖沙: 嵐を翔る射手_聖沙,
  '命脈の幼アバターアルモタヘル（ちぃ）': 命脈の幼アバター_アルモタヘル_ちぃ,
  万成の幼天使セシア: 万成の幼天使_セシア,
  お転婆バサラ姫パルミエ: お転婆バサラ姫_パルミエ,
  美の冒涜者ヴァレリー: 美の冒涜者_ヴァレリー,
};
