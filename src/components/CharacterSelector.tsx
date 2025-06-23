import { useState } from 'react';
import { characters as allCharacters } from '@/data/Characters';
import { type CharacterData } from '@/types';

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

  const [typeFilter, setTypeFilter] = useState('');
  const [elementFilter, setElementFilter] = useState('');
  const [factionFilter, setFactionFilter] = useState('');
  const [starFilter, setStarFilter] = useState('');

  const characters = allCharacters.filter(char => {
    return (
      (typeFilter === '' || char.type === typeFilter) &&
      (elementFilter === '' || char.element === elementFilter) &&
      (factionFilter === '' || char.faction === factionFilter) &&
      (starFilter === '' || char.star === starFilter)
    );
  });

  const uniqueTypes = [...new Set(allCharacters.map(c => c.type))];
  const uniqueElements = [...new Set(allCharacters.map(c => c.element))];
  const uniqueFaction = [...new Set(allCharacters.map(c => c.faction))];
  const uniqueStar = [...new Set(allCharacters.map(c => c.star))];

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">編成を選べ～</h1>
      <div className="flex flex-wrap gap-2 mb-4">
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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {characters.map((char: CharacterData) => {
          const isSelected = selected.some(c => c.id === char.id);
          return (
            <div
              key={char.id}
              className={`border p-4 rounded-xl text-center cursor-pointer transition hover:shadow-lg ${
                isSelected
                  ? 'bg-blue-200 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
              onClick={() => toggleSelect(char)}
            >
              <img
                src={char.avatar}
                alt={`${char.name} 的头像`}
                className="w-16 h-16 mx-auto mb-2 rounded-full"
              />
              <div className="text-lg font-semibold">{char.name}</div>
              <div className="text-sm text-gray-500">{char.type}</div>
              {isSelected && (
                <div className="mt-2 text-green-600 font-bold">✔ 已选择</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">已选择队伍：</h2>
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
