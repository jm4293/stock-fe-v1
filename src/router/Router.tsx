import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '@/pages/auth';
import { Layout } from '@/common/layout';
import { Home } from '@/pages/home';
import { Stock } from 'pages/stock';
import { Board, BoardDetail } from '@/pages/board';
import { MyPage, MyPageBoard, MyPageBoardComment } from '@/pages/my-page';
import { Register } from 'pages/auth/register';
import { Notification } from '@/pages/notification';
import { NotFound } from '@/components/not-found';

export const Router = () => {
  // const _BASE_URL = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/:provider" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/board/detail/:boardSeq" element={<BoardDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/board" element={<MyPageBoard />} />
          <Route path="/mypage/comment" element={<MyPageBoardComment />} />
          <Route path="/notification" element={<Notification />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
