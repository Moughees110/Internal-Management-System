import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useSidebar } from './context/Sidebarcontext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import { useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const { collapsed, setCollapsed, activeComponent, setActiveComponent } = useSidebar();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/tokens/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Logout request failed:', error);
    }

    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {isAuthenticated && (
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={() => setCollapsed((prev) => !prev)}
          active={activeComponent}
          setActive={setActiveComponent}
          onLogout={handleLogout}
        />
      )}

      <div className="flex-1 flex flex-col overflow-y-auto">
        {isAuthenticated && (
          <Header
            activeComponent={activeComponent}
            collapsed={collapsed}
            toggleSidebar={() => setCollapsed((prev) => !prev)}
          />
        )}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}