import { useEffect, useState } from 'react';
import { CharacterBase } from './types/CharacterBase';
import { BattleSystem } from './systems/BattleSystem';
import BattleDisplay from './components/BattleDisplay';
import CharacterSelector from './components/CharacterSelector';
import { type CharacterData } from '@/types';

export default function App() {
  const [selected, setSelected] = useState<CharacterData[]>([]);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleSystem, setBattleSystem] = useState<BattleSystem | null>(null); // 存储 BattleSystem 实例
  const [startSignal, setStartSignal] = useState(0);

  // 父组件中
  const handleSelectChange = (selected: CharacterData[]) => {
    console.log('当前选择：', selected);
    setSelected(selected);
  };

  useEffect(() => {
    if (battleStarted && battleSystem) {
      battleSystem.start(); // 等组件挂载完才触发
    }
  }, [startSignal]);

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
      <CharacterSelector onChange={handleSelectChange} />
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={startBattle}
        >
          バトル開始
        </button>
      </div>
      {/* 渲染 BattleDisplay 组件 */}
      {battleStarted && battleSystem && (
        <BattleDisplay battleSystem={battleSystem} />
      )}
      <div className="mt-6 text-center text-sm text-gray-500">
        貢献したい方はこちらへ：
        <a
          href="https://github.com/xxfttkx/TwinkleStarKnights_Battle_Simulator"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
