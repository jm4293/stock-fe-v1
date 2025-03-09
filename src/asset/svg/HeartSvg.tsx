import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { ISvgProps } from '@/asset/svg/interface';

interface IProps extends ISvgProps {
  isFilled?: boolean;
}

export const HeartSvg = (props: IProps) => {
  const { color, onClick, className, isFilled = false } = props;
  const { isMobile } = useDeviceLayout();

  console.log('HeartSvg is rendering!', isFilled);

  return (
    <svg
      width={isMobile ? '22' : '30'}
      height={isMobile ? '22' : '30'}
      viewBox="0 0 32 32"
      fill={isFilled ? 'red' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}>
      <path
        d="M17.0942 7.43883L15.9999 8.53551L14.9022 7.43784C12.1035 4.63908 7.56579 4.63908 4.76704 7.43784C1.96828 10.2366 1.96828 14.7743 4.76704 17.5731L15.2942 28.1001C15.6847 28.4907 16.3179 28.4907 16.7084 28.1001L27.2436 17.5711C30.0362 14.7631 30.041 10.2381 27.2418 7.43883C24.4379 4.63497 19.898 4.63497 17.0942 7.43883ZM25.8255 16.1608L16.0012 25.9789L6.18125 16.1588C4.16353 14.1411 4.16353 10.8698 6.18125 8.85205C8.19896 6.83433 11.4703 6.83433 13.488 8.85205L15.2979 10.662C15.6951 11.0591 16.3414 11.0514 16.7288 10.6448L18.5084 8.85304C20.5312 6.83024 23.8047 6.83024 25.8275 8.85304C27.8458 10.8712 27.8423 14.1329 25.8255 16.1608Z"
        stroke={isFilled ? 'none' : color}
        strokeWidth={isFilled ? 0 : 1}
      />
    </svg>
  );
};
