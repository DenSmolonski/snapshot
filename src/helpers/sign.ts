import { getAddress } from '@ethersproject/address';
import type { Web3Provider } from '@ethersproject/providers';
import type { Wallet } from '@ethersproject/wallet';

const domain = {
  name: 'snapshot',
  version: '0.1.4'
};

type DataType = Record<string, { name: string; type: string }[]>;

export const SubscribeType: DataType = {
  Subscribe: [
    { name: 'from', type: 'address' },
    { name: 'email', type: 'string' }
  ]
};

export interface ISubscribe {
  from?: string;
  timestamp?: number;
  email: string;
}

export default async function sign(
  web3: Web3Provider | Wallet,
  address: string,
  message: ISubscribe,
  types: DataType
) {
  const signer = 'getSigner' in web3 ? web3.getSigner() : web3;
  const checksumAddress = getAddress(address);
  message.from = message.from ? getAddress(message.from) : checksumAddress;

  return await signer._signTypedData(domain, types, message);
}