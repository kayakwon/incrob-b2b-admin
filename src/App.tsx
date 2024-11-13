import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TestManagement from './components/TestManagement';
import KitManagement from './components/KitManagement';
import UserManagement from './components/UserManagement';
import PartnerManagement from './components/PartnerManagement';
import FaqManagement from './components/FaqManagement';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const titles = {
      dashboard: 'IncroB Admin | 대시보드',
      tests: 'IncroB Admin | 검사 관리',
      kits: 'IncroB Admin | 검사키트 관리',
      users: 'IncroB Admin | 회원 관리',
      partners: 'IncroB Admin | 파트너 관리',
      faq: 'IncroB Admin | FAQ 관리'
    };
    document.title = titles[currentView as keyof typeof titles];
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'tests':
        return <TestManagement />;
      case 'kits':
        return <KitManagement />;
      case 'users':
        return <UserManagement />;
      case 'partners':
        return <PartnerManagement />;
      case 'faq':
        return <FaqManagement />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;