import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useCallback, useState } from 'react';
import { NavbarBoard, NavbarHome, NavbarMyPage, NavbarStock } from '@/asset/svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split('/')[1];

  const onClickHandler = useCallback((event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    const { id } = event.currentTarget;
    navigate(id);
  }, []);

  return (
    <div className="navbar">
      <NavbarHome color={currentPath.includes('home') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarStock color={currentPath.includes('stock') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarBoard color={currentPath.includes('board') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarMyPage color={currentPath.includes('mypage') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
    </div>
  );
};

export default memo(Navbar);
