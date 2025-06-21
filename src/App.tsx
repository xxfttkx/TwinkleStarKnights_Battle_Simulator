import { useEffect, useState } from 'react';
import characters from './data/characters.json';
import { CharacterBase, type CharacterData } from './types/CharacterBase';
import { BattleSystem } from './systems/BattleSystem';
import BattleDisplay from './components/BattleDisplay';

export default function App() {
  const [selected, setSelected] = useState<CharacterData[]>([]);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleSystem, setBattleSystem] = useState<BattleSystem | null>(null); // 存储 BattleSystem 实例
  const [startSignal, setStartSignal] = useState(0);

  useEffect(() => {
    if (battleStarted && battleSystem) {
      battleSystem.start(); // 等组件挂载完才触发
    }
  }, [startSignal]);

  const toggleSelect = (char: CharacterData) => {
    const isSelected = selected.find(c => c.id === char.id);
    if (isSelected) {
      setSelected(selected.filter(c => c.id !== char.id));
    } else {
      if (selected.length >= 5) return; // 最多选择5人
      setSelected([...selected, char]);
    }
  };

  const startBattle = () => {
    if (selected.length <= 0) return;
    let system = battleSystem;
    if (!system) {
      system = new BattleSystem();
      setBattleSystem(system);
    }
    const characters: CharacterBase[] = [];
    for (const char of selected) {
      const character = system.createCharacter(char);
      characters.push(character);
    }
    setBattleStarted(true);
    system.init(characters);
    setStartSignal(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">选择你的5人小队</h1>

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
        <ul className="list-disc ml-6 text-lg">
          {selected.map(char => (
            <li key={char.id}>
              {char.name}（{char.type}）
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={startBattle}
        >
          开始战斗
        </button>
      </div>

      {/* 渲染 BattleDisplay 组件 */}
      {battleStarted && battleSystem && (
        <BattleDisplay battleSystem={battleSystem} />
      )}
    </div>
  );
}
