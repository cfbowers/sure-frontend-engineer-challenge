import { Route, BrowserRouter, Routes } from 'react-router-dom';
import TableDemoView from './components/TableDemoView';
import HomeView from './components/HomeView';
import RedirectView from './components/RedirectView';
import YouCanDoItView from './components/YouCanDoItView';
import Layout from './components/Layout';
import { useState } from 'react';
import Modal from './components/Modal';
import Instructions from './components/Instructions';
import PolicyholdersView from './components/PolicyholdersView/PolicyholdersView';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout onFooterClick={() => setIsModalOpen(true)}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/policyholders" element={<PolicyholdersView />} />
            <Route path="/table" element={<TableDemoView />} />
            <Route path="/you-can-do-it" element={<YouCanDoItView />} />
            <Route path="*" element={<RedirectView />} />
          </Routes>
        </Layout>
      </QueryClientProvider>
      <Modal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="Sure Technical Challenge"
      >
        <Instructions />
      </Modal>
    </BrowserRouter>
  );
}

export default App;
