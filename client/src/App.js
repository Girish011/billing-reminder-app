import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import CreateBill from './CreateBill';
import BillList from './BillList';

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/create-bill" element={<CreateBill />} />
                    <Route path="/bills" element={<BillList />} />
                    {/* Add other routes here */}
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
