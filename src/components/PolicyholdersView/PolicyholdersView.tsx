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

  const { isLoading: loadingPolicyHolders } = useQuery(
    'getPolicyHolders',
    async () => {
      const policyHoldersResponse = await fetchPolicyHolders();
      const { policyHolders } = await policyHoldersResponse.json();
      setPolicyHolders(policyHolders);
    }
  );

  const { mutate } = useMutation('createPolicyHolder', postPolicyHolder, {
    onSuccess: async (data) => {
      const { policyHolders } = await data.json();
      setPolicyHolders(policyHolders);
    },
  });

  //show loading indicator if coming into the screen for the first time
  if (loadingPolicyHolders && policyHolders.length === 0)
    return <img
      src="https://media.giphy.com/media/3y0oCOkdKKRi0/giphy.gif"
      alt="loading-gif"
      style={{ maxWidth: '100%' }}
    />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Box justifyContent="flex-end">
        <Button variant="contained" onClick={() => mutate()}>
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
        <ul style={{ textAlign: 'left' }}>
          <li>Loading indicators (e.g. skeletons, spinner) when waiting for API calls &#9989;</li>
          <li>Test PolicyholdersView with mocked API responses &#9989;</li>
          <li>End to end tests</li>
          <li>Error handling for unhandled exceptions with an Error Boundary at least at App.tsx level</li>
          <li>Error handling for API call failures with useErrorHandler from react-error-boundary</li>
          <li>More memes</li>
        </ul>
      </Box>
    </Box>
  );
}
