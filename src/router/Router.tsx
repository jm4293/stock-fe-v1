import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '@/pages/auth';
import { Layout } from '@/common/layout';
import { Home } from '@/pages/home';
import { Stock } from 'pages/stock';
import { Board } from '@/pages/board';
import { MyPage } from '@/pages/my-page';
import { SignUp } from '@/pages/auth/sign-up';

export const Router = () => {
  // const _BASE_URL = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/auth/login`} />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign-up" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/board" element={<Board />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
