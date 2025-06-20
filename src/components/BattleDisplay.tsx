import { useCallback, useEffect, useState } from 'react';
import { CharacterBase } from '../types/CharacterBase';
import { BattleSystem } from '../systems/BattleSystem';
import emitter from '../eventBus';

interface BattleDisplayProps {
  battleSystem: BattleSystem;
}

export default function BattleDisplay({ battleSystem }: BattleDisplayProps) {
  const [logs, setLogs] = useState<string[]>([]); // 📝 保存日志
  const [teamEx, setTeamEx] = useState(battleSystem.getTeamEx());
  const [allowNegativeEx, setAllowNegativeEx] = useState(
    battleSystem.allowNegativeEx
  );

  const appendLog = useCallback((msg: string) => {
    console.log(`日志: ${msg}`); // 控制台输出日志
    // 更新日志状态
    setLogs(prev => [...prev, msg]);
  }, []);

  useEffect(() => {
    const handler = (data: string) => {
      appendLog(data);
    };

    const battleStartHandler = () => {
      setLogs([]);
      handler('battle-start');
    };
    const handleExChange = (amount: number) => {
      setTeamEx(amount);
    };
    emitter.on('custom-event', handler);
    emitter.on('battle-start', battleStartHandler);
    emitter.on('ex-change', handleExChange);

    return () => {
      emitter.off('custom-event', handler);
      emitter.off('battle-start', battleStartHandler);
      emitter.off('ex-change', handleExChange);
    };
  }, []);
  const useSkill = (character: CharacterBase, skill: string) => {
    battleSystem.tryUseSkill(character.data.name, skill);
  };

  return (
    <div className="mt-6 grid grid-cols-6 gap-4">
      {/* 队伍成员 */}
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-4">队伍成员</h2>
        <div className="grid grid-cols-5 gap-4">
          {battleSystem.team.map(character => (
            <div
              key={character.data.id}
              className="border p-4 rounded-lg text-center"
            >
              <img
                src={character.data.avatar}
                alt={`${character.data.name} 的头像`}
                className="w-16 h-16 mx-auto mb-2 rounded-full"
              />
              <div className="text-lg font-semibold">{character.data.name}</div>
              <div className="text-sm text-gray-500">ct: {character.ct}</div>
              <div className="text-sm text-gray-500">
                ex: {character.data.ex}
              </div>
              <div className="text-sm text-gray-500">
                ex_up: {character.getEx_up()}
              </div>
              <div className="text-sm text-gray-500">
                ct_bonus: {character.getCTBonus().toFixed(2)}
              </div>
              {character.ct == 0 && (
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => useSkill(character, 'skill1')}
                  >
                    Ex1
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => useSkill(character, 'skill2')}
                  >
                    Ex2
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => useSkill(character, 'atk')}
                  >
                    atk
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 队伍状态 */}
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-4">队伍状态</h2>
        <div className="border p-4 rounded-lg mb-4">
          <p className="text-lg">队伍整体 EX 量：</p>
          <p className="text-2xl font-bold text-blue-600">{teamEx}</p>
        </div>
        <label className="flex items-center mt-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="mr-2"
            checked={allowNegativeEx}
            onChange={e => {
              battleSystem.allowNegativeEx = e.target.checked;
              setAllowNegativeEx(e.target.checked);
            }}
          />
          允许 EX 为负数
        </label>
      </div>
      {/* 日志显示区域 */}
      <div className="border p-4 rounded-lg h-64 overflow-y-auto bg-gray-50">
        <h3 className="text-lg font-bold mb-2">日志输出</h3>
        <ul className="text-sm list-disc pl-5 space-y-1">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
