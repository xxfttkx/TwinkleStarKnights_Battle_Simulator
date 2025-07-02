import { useState, useMemo } from 'react';
import { characters as allCharacters } from '@/data/Characters';
import { type CharacterData } from '@/types';
import { CharacterRegistry } from '@/utils/CharacterRegistry';

interface Props {
  onChange: (selected: CharacterData[]) => void;
}

export default function CharacterSelector({ onChange }: Props) {
  const [selected, setSelected] = useState<CharacterData[]>([]);
  const toggleSelect = (char: CharacterData) => {
    const isSelected = selected.find(c => c.id === char.id);
    let updated: CharacterData[];
    if (isSelected) {
      updated = selected.filter(c => c.id !== char.id);
    } else {
      if (selected.length >= 5) return; // 最多选择5人
      updated = [...selected, char];
    }
    setSelected(updated);
    onChange(updated); // ✅ 通知父组件
  };

  const uniqueTypes = useMemo(
    () => [...new Set(allCharacters.map(c => c.type))],
    [allCharacters]
  );
  const uniqueElements = useMemo(
    () => [...new Set(allCharacters.map(c => c.element))],
    [allCharacters]
  );
  const uniqueFaction = useMemo(
    () => [...new Set(allCharacters.map(c => c.faction))],
    [allCharacters]
  );
  const uniqueStar = useMemo(
    () => [...new Set(allCharacters.map(c => c.star))],
    [allCharacters]
  );
  const [typeFilter, setTypeFilter] = useState('');
  const [elementFilter, setElementFilter] = useState('');
  const [factionFilter, setFactionFilter] = useState('');
  const [starFilter, setStarFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); // 排序方式：'default', 'releaseDateAsc', 'releaseDateDesc'
  const characters = allCharacters
    .filter(char => {
      return (
        (typeFilter === '' || char.type === typeFilter) &&
        (elementFilter === '' || char.element === elementFilter) &&
        (factionFilter === '' || char.faction === factionFilter) &&
        (starFilter === '' || char.star === starFilter)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'releaseDateAsc') {
        return (
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        ); // 实装顺序
      }
      if (sortOrder === 'releaseDateDesc') {
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        ); // 实装倒序
      }
      return 0; // 默认顺序
    });

  function moveCharacter(index: number, direction: 'up' | 'down') {
    const newList = [...selected];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // 边界检查
    if (targetIndex < 0 || targetIndex >= newList.length) return;

    // 交换元素
    [newList[index], newList[targetIndex]] = [
      newList[targetIndex],
      newList[index],
    ];
    setSelected(newList);
    onChange(newList); // ✅ 通知父组件
  }

  const presets: Record<string, string[]> = {
    人間队: [
      '舞うは九浄の桜花ヘレナ',
      '招福の明星ヴィーナス',
      '霹靂の射手梨緒',
      '正義のハッカーコハルコ',
      '夏空の一番星ヴィーナス',
    ],
    魔族队: [
      '夏のお姉ちゃん♪サーシャ',
      '自称・妹魔王メイプル',
      '聖夜のキャロルルルカ',
      '夏色マジカル☆リーリア',
      'アイシクルノヴァサーシャ《絶氷》',
    ],
    神族队: [
      '煌炎の超天使アナ《煌炎》',
      '初めての海ルリエル',
      '雷薙の晴天使ウズメイア',
      '碧水のミューズロロット',
      '万成の幼天使セシア',
    ],
    闇属性队: [
      '黄昏の超新星トワ先生《黎明》',
      '智謀の黒き微笑みジュリエッテ',
      '渇望の武闘天使イングリット',
      '自称・妹魔王メイプル',
      '夏のお姉ちゃん♪サーシャ',
    ],
    雷属性队: [
      'おちゃめな副会長セーラ',
      '霹靂の射手梨緒',
      '太陽の祝福フィオナ',
      '聖夜のキャロルルルカ',
      '虹色の魔弾使いリーリア',
    ],
    火属性队: [
      '煌炎の超天使アナ《煌炎》',
      '甘愛フレグランスシャルレーヌ',
      'キュートスタイルレミカ',
      '一途アイドルメルエル',
      '歩く図書館モネ',
    ],
  };

  function applyPreset(key: string) {
    const presetIds = presets[key];
    const presetChars = presetIds
      .map(name => allCharacters.find(c => c.name === name))
      .filter((c): c is CharacterData => !!c); // 过滤 null

    setSelected(presetChars);
    onChange(presetChars);
  }

  return (
    <div>
      <div className="mb-4">
        <span className="font-semibold mr-2">预设编成：</span>
        <div className="flex flex-col gap-2">
          {Object.entries(presets).map(([name, presetNames]) => {
            const presetChars = presetNames
              .map(n => allCharacters.find(c => c.name === n))
              .filter((c): c is CharacterData => !!c); // 过滤 null

            return (
              <div key={name} className="flex items-center gap-4">
                <button
                  onClick={() => applyPreset(name)}
                  className="px-2 py-1 text-sm bg-purple-100 hover:bg-purple-200 rounded"
                >
                  {name}
                </button>
                <div className="flex gap-1">
                  {presetChars.map(char => (
                    <img
                      key={char.id}
                      src={char.avatar}
                      alt={char.name}
                      className="w-6 h-6 rounded-full border"
                      title={char.name}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">編成を選べ～</h1>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* 左侧筛选菜单 */}
        <div className="flex flex-wrap gap-2 flex-1 min-w-[250px]">
          <select
            className="border rounded px-2 py-1 w-full sm:w-auto"
            value={factionFilter}
            onChange={e => setFactionFilter(e.target.value)}
          >
            <option value="">全ての陣営</option>
            {uniqueFaction.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 w-full sm:w-auto"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">全てのタイプ</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 w-full sm:w-auto"
            value={elementFilter}
            onChange={e => setElementFilter(e.target.value)}
          >
            <option value="">全ての属性</option>
            {uniqueElements.map(elem => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 w-full sm:w-auto"
            value={starFilter}
            onChange={e => setStarFilter(e.target.value)}
          >
            <option value="">全ての★</option>
            {uniqueStar.map(elem => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </select>
        </div>

        {/* 右侧排序菜单 */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <select
            className="border rounded px-2 py-1 w-full"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="default">デフォルト順</option> {/* 默认顺序 */}
            <option value="releaseDateAsc">実装順</option> {/* 实装顺序 */}
            <option value="releaseDateDesc">実装逆順</option> {/* 实装倒序 */}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {characters.map((char: CharacterData) => {
          const isSelected = selected.some(c => c.id === char.id);
          const isImplemented = CharacterRegistry.hasOwnProperty(char.name);
          return (
            <div
              key={char.id}
              className={`border p-4 rounded-xl text-center cursor-pointer transition hover:shadow-lg
                ${
                  isSelected
                    ? 'bg-blue-200 border-blue-500'
                    : 'bg-white border-gray-300'
                }
              `}
              onClick={() => toggleSelect(char)}
            >
              <div className="relative">
                {!isImplemented && (
                  <div className="absolute top-0 -right-3 bg-green-100 text-black text-xs px-2 py-0.5 rounded-full shadow">
                    未実装
                  </div>
                )}
              </div>
              <img
                src={char.avatar}
                alt={`${char.name}`}
                className="w-16 h-16 mx-auto mb-2 rounded-full"
              />
              <div className="text-lg font-semibold hidden sm:inline">
                {char.name}
              </div>
              <div className="text-sm text-gray-500">{char.type}</div>
              {isSelected && (
                <div className="mt-2 text-green-600 font-bold">✔ 選択済み</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">現在のチーム：</h2>
        <ul className="space-y-2">
          {selected.map((char, index) => (
            <li
              key={char.id}
              className="flex items-center justify-between bg-white shadow rounded p-2"
            >
              {/* 左侧头像 + 名字 */}
              <div className="flex items-center gap-4">
                <img
                  src={char.avatar}
                  alt={char.name}
                  className="w-12 h-12 rounded object-cover border"
                />
                <div className="text-lg">
                  {char.name}（{char.type}）
                </div>
              </div>

              {/* 右侧按钮 */}
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => moveCharacter(index, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button
                  className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => moveCharacter(index, 'down')}
                  disabled={index === selected.length - 1}
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
