import PolicyholdersView from './PolicyholdersView';
import { renderWithProviders } from '../../utils/test';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { waitFor } from '@testing-library/react';
import { TPolicyHolder } from './types';

describe('PolicyholdersView', () => {
  const mockPolicyHolder: TPolicyHolder = {
    name: 'Fake Policy Holder',
    age: 28,
    phoneNumber: '5208009268',
    isPrimary: false,
    address: {
      state: 'AZ',
      city: 'Tucson',
      line1: '6456 E Calle Luna',
      postalCode: '85710'
    }
  };

  //define handlers that will return mock data for the policyholders api call
  const server = setupServer(
    rest.get(
      'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
      (_req, res, ctx) => res(ctx.json({ policyHolders: [mockPolicyHolder] }))
    )
  );

  it('should render the mocked policy holder returned from the mocked network call', async () => {
    server.listen();
    const { getByText, getAllByText } = renderWithProviders(<PolicyholdersView />);

    //the name should show up twice -- once for the header and once for the name row
    await waitFor(() => expect(getAllByText('Fake Policy Holder')).toHaveLength(2));
    expect(getByText('28')).toBeInTheDocument();
    expect(getByText('5208009268')).toBeInTheDocument();
    expect(getByText('6456 E Calle Luna, Tucson, AZ 85710')).toBeInTheDocument();

    server.close();
  });
});
