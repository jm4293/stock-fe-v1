import { ISvgProps } from '@/asset/svg/interface';
import { useDeviceLayout } from '@/hooks/useDeviceLayout';

interface IProps extends ISvgProps {}

export const BellSvg = (props: IProps) => {
  const { color, onClick, className } = props;
  const { isMobile } = useDeviceLayout();

  return (
    <svg
      width={isMobile ? '26' : '34'}
      height={isMobile ? '26' : '34'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}>
      <path
        d="M12 5C10 5 6 6.2 6 11V15L4 17H9M12 5C16.8 5 18 9 18 11V15L20 17H15M12 5V3M9 17V18C9 19 9.6 21 12 21C14.4 21 15 19 15 18V17M9 17H15"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  );
};
