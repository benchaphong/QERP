import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import { AppProvider } from './context/AppContext';

// Modules
import Dashboard from './modules/dashboard/Dashboard';
import Purchasing from './modules/purchasing/Purchasing';
import Sales from './modules/sales/Sales';
import Accounting from './modules/accounting/Accounting';
import Inventory from './modules/inventory/Inventory';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purchasing" element={<Purchasing />} />
            <Route path="sales" element={<Sales />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
