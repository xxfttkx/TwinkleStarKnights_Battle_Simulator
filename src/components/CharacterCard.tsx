import React, { useEffect, useState } from 'react';
import { CharacterBase } from '../types/CharacterBase'; // 假设你有类型定义
import emitter from '../eventBus';

interface CharacterCardProps {
  character: CharacterBase;
  useSkill: (character: CharacterBase, skill: 'ex1' | 'ex2' | 'atk') => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  useSkill,
}) => {
  // 初始化状态，默认用 character 里对应的值
  const [ex, setEx] = useState(String(character.getEx()));
  const [exUp, setExUp] = useState(String(character.getEx_up()));

  useEffect(() => {
    const handler = (name: string) => {
      if (name === character.data.name) {
        setExUp(String(character.getEx_up()));
      }
    };

    emitter.on('ex-up-changed', handler);
    return () => emitter.off('ex-up-changed', handler);
  }, [character]);

  // 输入框内容变化处理
  const handleExChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEx(e.target.value);
    emitter.emit('ex-edit', [character.data.name, Number(e.target.value)]);
  };

  const handleExUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExUp(e.target.value);
    emitter.emit('ex-up-edit', [character.data.name, Number(e.target.value)]);
  };

  return (
    <div className="border p-4 rounded-lg text-center space-y-1">
      <img
        src={character.data.avatar}
        alt={`${character.data.name} 的头像`}
        className="w-16 h-16 mx-auto mb-2 rounded-full"
      />
      {/* 可编辑 ex */}
      <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
        <label htmlFor={`ex-${character.data.id}`}>ex:</label>
        <input
          id={`ex-${character.data.id}`}
          type="number"
          value={ex}
          onChange={handleExChange}
          className="h-5 border rounded px-2 py-1 w-20 text-center text-black"
        />
        <button
          type="button"
          onClick={() => {
            setEx(String(character.getEx()));
            emitter.emit('ex-edit', [character.data.name, 0]);
          }}
          className="text-xs bg-gray-200 hover:bg-gray-300 rounded px-2 py-0.5"
          title="Reset"
        >
          ↻
        </button>
      </div>

      {/* 可编辑 ex_up */}
      <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
        <label htmlFor={`exup-${character.data.id}`}>ex_up:</label>
        <input
          id={`exup-${character.data.id}`}
          type="number"
          value={exUp}
          onChange={handleExUpChange}
          className="h-5 border rounded px-2 py-1 w-20 text-center text-black"
        />
        <button
          type="button"
          onClick={() => {
            setExUp(String(character.getEx_up()));
            emitter.emit('ex-up-edit', [character.data.name, 0]);
          }}
          className="text-xs bg-gray-200 hover:bg-gray-300 rounded px-2 py-0.5"
          title="R"
        >
          ↻
        </button>
      </div>

      <div className="text-sm text-gray-500">
        ct_bonus: {character.getCTBonus().toFixed(2)}
      </div>
      <div className="text-sm text-gray-800 font-semibold">
        ct: {character.ct}
      </div>
      {character.ct === 0 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => useSkill(character, 'ex1')}
          >
            Ex1
          </button>
          <button
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => useSkill(character, 'ex2')}
          >
            Ex2
          </button>
          <button
            className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={() => useSkill(character, 'atk')}
          >
            atk
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
