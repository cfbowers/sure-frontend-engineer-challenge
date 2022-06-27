import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const renderWithProviders = (
  ui: ReactElement,
  opts: Partial<Parameters<typeof render>[1]> = {}
) =>
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{ui} </QueryClientProvider>
    </BrowserRouter>,
    opts
  );
