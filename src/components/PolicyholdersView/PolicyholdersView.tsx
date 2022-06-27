import React from 'react';
import { useQuery } from 'react-query';

type TPolicyHolder = {
  address: string;
  age: number;
  isPrimary: boolean;
  phoneNumber: string;
};

const fetchPolicyHolders = () =>
  fetch(
    'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
    { method: 'GET' }
  );

export default function PolicyholdersView() {
  const [policyHolders, setPolicyHolders] = React.useState<TPolicyHolder[]>([]);

  useQuery('getPolicyholders', async () => {
    const policyHoldersResponse = await fetchPolicyHolders();
    const { policyHolders } = await policyHoldersResponse.json();
    setPolicyHolders(policyHolders);
  });

  return null;
}
