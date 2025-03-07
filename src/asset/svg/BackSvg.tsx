import { ISvgProps } from '@/asset/svg/interface';

interface IProps extends ISvgProps {}

export const BackSvg = (props: IProps) => {
  const { color, onClick, className } = props;

  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.2803 6.46967C15.5732 6.76256 15.5732 7.23744 15.2803 7.53033L10.8107 12L15.2803 16.4697C15.5732 16.7626 15.5732 17.2374 15.2803 17.5303C14.9874 17.8232 14.5126 17.8232 14.2197 17.5303L9.21967 12.5303C8.92678 12.2374 8.92678 11.7626 9.21967 11.4697L14.2197 6.46967C14.5126 6.17678 14.9874 6.17678 15.2803 6.46967Z"
        fill={color}
      />
    </svg>
  );
};
