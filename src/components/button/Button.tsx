import { useDeviceLayout } from '@/hooks/useDeviceLayout';

interface IProps {
  className?: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

export const Button = (props: IProps) => {
  const { className, text, onClick, disabled } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <button
      className={`w-full bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] ${isMobile ? 'py-4' : 'py-5'} ${className}`}
      name={text}
      onClick={(event) => onClick(event)}
      disabled={disabled}>
      <p className="text-white text-base font-normal whitespace-nowrap">{text}</p>
    </button>
  );
};
