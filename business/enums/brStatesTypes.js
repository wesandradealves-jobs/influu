import { getStates } from '@brazilian-utils/brazilian-utils';

const brStatesTypes = getStates().map(v => ({
  text: v.name,
  value: v.code
}));
export default brStatesTypes;
