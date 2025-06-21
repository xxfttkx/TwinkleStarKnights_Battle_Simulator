import { useCallback, useEffect, useState } from 'react';
import { CharacterBase } from '../types/CharacterBase';
import { BattleSystem } from '../systems/BattleSystem';
import emitter from '../eventBus';
import CharacterCard from './CharacterCard';

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
    <div className="mt-6 space-y-6">
      {/* 队伍成员 */}
      <h2 className="text-xl font-bold mb-4">队伍成员</h2>
      <div className="grid grid-cols-5 gap-4">
        {battleSystem.team.map(character => (
          <CharacterCard
            key={character.data.id}
            character={character}
            useSkill={useSkill}
          />
        ))}
      </div>

      {/* 第二行：队伍状态 + 日志区域 并排 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 队伍状态 */}
        <div className="col-span-1">
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
        <div className="col-span-2">
          <div className="border p-4 rounded-lg h-64 overflow-y-auto bg-gray-50">
            <h3 className="text-lg font-bold mb-2">日志输出</h3>
            <ul className="text-sm list-disc pl-5 space-y-1">
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
