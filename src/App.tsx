/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import TopNav from './components/TopNav';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PolicySearch from './pages/PolicySearch';
import ReportWorkstation from './pages/ReportWorkstation';
import { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  return (
    <div className="flex flex-col h-screen bg-stone-50 text-stone-900 overflow-hidden font-sans select-none selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <TopNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 flex overflow-hidden">
        {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
        {currentPage === 'search' && <PolicySearch />}
        {currentPage === 'workstation' && <ReportWorkstation />}
      </main>
    </div>
  );
}
