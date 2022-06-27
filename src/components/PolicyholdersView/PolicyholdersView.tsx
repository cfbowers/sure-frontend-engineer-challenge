import { Box, Button } from '@mui/material';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import InfoTable from '../InfoTable';
import { fetchPolicyHolders, getPolicyHolderRows, postPolicyHolder } from './helpers';
import { TPolicyHolder } from './types';

export default function PolicyholdersView() {
  const [policyHolders, setPolicyHolders] = React.useState<TPolicyHolder[]>([]);

  useQuery('getPolicyHolders', async () => {
    const policyHoldersResponse = await fetchPolicyHolders();
    const { policyHolders } = await policyHoldersResponse.json();
    setPolicyHolders(policyHolders);
  });

  const { mutate } = useMutation('createPolicyHolder', postPolicyHolder, {
    onSuccess: async (data) => {
      const { policyHolders } = await data.json();
      setPolicyHolders(policyHolders);
    },
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      {policyHolders &&
        policyHolders.map((ph) => (
          <Box
            key={`policy-holder-${ph.name}-${ph.age}`}
            sx={{ marginBottom: '16px' }}
          >
            <InfoTable header={ph.name} rows={getPolicyHolderRows(ph)} />
          </Box>
        ))}
        <Button onClick={() => mutate()}>Add Policy Holder</Button>
    </Box>
  );
}
