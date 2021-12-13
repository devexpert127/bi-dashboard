import { getOptionByKey } from '@mithraic-labs/psy-american';
import { PublicKey } from '@solana/web3.js';
import { useCallback } from 'react';
import { useAmericanPsyOptionsProgram } from '../../utils/useAmericanPsyOptionsProgram';
import { useUpsertOption } from './options';

export const useFetchAndUpsertOption = (): ((optionKey: PublicKey) => void) => {
  const program = useAmericanPsyOptionsProgram();
  const upsertOption = useUpsertOption();

  return useCallback(
    async (optionKey) => {
      if (!program) {
        return;
      }
      const option = await getOptionByKey(program, optionKey);
      if (option) {
        upsertOption(option);
      }
    },
    [program, upsertOption],
  );
};
