import InfoTable from '../InfoTable';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { useMutation, useQuery } from 'react-query';
import { TPolicyHolder } from './types';
import {
  fetchPolicyHolders,
  getPolicyHolderRows,
  postPolicyHolder,
} from './helpers';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Box justifyContent="flex-end">
        <Button variant='contained' onClick={() => mutate()}>
          {policyHolders.length <= 1 && <AddOutlined fontSize="small" />}
          <p style={{ margin: 'auto 4px' }}>{`${
            policyHolders.length <= 1 ? 'Add' : 'Update Last'
          } Policy Holder`}</p>
        </Button>
      </Box>
      {policyHolders &&
        policyHolders.map((ph) => (
          <Box key={`policy-holder-${ph.name}-${ph.age}`} marginBottom="48px">
            <InfoTable header={ph.name} rows={getPolicyHolderRows(ph)} />
          </Box>
        ))}
      <Box marginBottom="48px">
        <Typography variant="h5" textAlign="left" marginBottom="16px">
          Before production deployment
        </Typography>
        <ul style={{ textAlign: 'left' }} >
          <li>Integration tests</li>
          <li>End to end tests</li>
          <li>Loading indicators (e.g. skeletons, spinner) for when waiting for API calls</li>
          <li>Error handling for unhandled exceptions with an Error Boundary at least at App.tsx level</li>
          <li>Error handling for API call failures with useErrorHandler from react-error-boundary</li>
          <li>More memes</li>
        </ul>
      </Box>
    </Box>
  );
}
