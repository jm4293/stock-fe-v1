import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useCallback, useState } from 'react';
import { NavbarBoard, NavbarHome, NavbarMyPage, NavbarStock } from '@/asset/svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickHandler = useCallback((event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    const { id } = event.currentTarget;
    navigate(id);
  }, []);

  return (
    <div className="navbar">
      <NavbarHome color={location.pathname.includes('/home') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarStock color={location.pathname.includes('/stock') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarBoard color={location.pathname.includes('/board') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarMyPage color={location.pathname.includes('/mypage') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
    </div>
  );
};

export default memo(Navbar);
