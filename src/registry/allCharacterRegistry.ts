import { ManualCharacterRegistry } from './manualCharacterRegistry';
import { AutoCharacterRegistry } from './autoCharacterRegistry';
import type { CharacterConstructor } from '@/types/CharacterBase';

export const AllCharacterRegistry: Record<string, CharacterConstructor> = {
  ...ManualCharacterRegistry,
  ...AutoCharacterRegistry,
};
