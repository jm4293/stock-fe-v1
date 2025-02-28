import { useDeviceLayout } from '@/hooks/useDeviceLayout';

interface IProps {
  color: '#9470DC' | '#989898';
  onClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  className?: string;
}

export const BackButton = (props: IProps) => {
  const { color, onClick, className } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <svg
      width={isMobile ? '32' : '40'}
      height={isMobile ? '32' : '40'}
      viewBox="0 0 1024 1024"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}>
      <path fill={color} d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z" />
      <path
        fill={color}
        d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z"
      />
    </svg>
  );
};
