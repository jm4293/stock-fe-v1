import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Header } from '@/common/layout/Header';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai/index';
import { jwtStore } from '@/store/jwt';
import { useAuthMutation } from '@/hooks/auth';

export const Layout = () => {
  const jwt = useAtomValue(jwtStore.getJwt);

  const { onRefreshTokenMutation } = useAuthMutation();

  useEffect(() => {
    if (!jwt) {
      onRefreshTokenMutation.mutate();
    }
  }, []);

  return (
    <div className="layout">
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};
