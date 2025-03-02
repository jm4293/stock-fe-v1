import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Header } from '@/common/layout/Header';

export const Layout = () => {
  // const jwt = useAtomValue(jwtStore.getJwt);
  // const decryptEmail = localStorage.getItem('state');

  // const { onRefreshTokenMutation } = useAuthMutation();

  // useEffect(() => {
  //   if (!jwt && decryptEmail) {
  //     onRefreshTokenMutation.mutate();
  //   }
  // }, []);

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
