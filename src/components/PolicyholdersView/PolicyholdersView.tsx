import { Box } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import InfoTable from '../InfoTable';
import { fetchPolicyHolders, getPolicyHolderRows } from './helpers';
import { TPolicyHolder } from './types';


export default function PolicyholdersView() {
  const [policyHolders, setPolicyHolders] = React.useState<TPolicyHolder[]>([]);

  useQuery('getPolicyHolders', async () => {
    const policyHoldersResponse = await fetchPolicyHolders();
    const { policyHolders } = await policyHoldersResponse.json();
    setPolicyHolders(policyHolders);
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      {policyHolders &&
        policyHolders.map((ph) => (
          <Box
            key={`policy-holder-${ph.name}-${ph.age}`}
            sx={{ marginBottom: '16px' }}
          >
            <InfoTable header="Policy Holders" rows={getPolicyHolderRows(ph)} />
          </Box>
        ))}
    </Box>
  );
}
