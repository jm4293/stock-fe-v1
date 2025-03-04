import { useDeviceLayout } from '@/hooks/useDeviceLayout';

interface IProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: 'gray' | 'green';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = (props: IProps) => {
  const { text, onClick, color = 'gray', disabled, className, children } = props;

  const { isMobile } = useDeviceLayout();

  const style = () => {
    switch (color) {
      case 'gray':
        return 'bg-gray-400 text-white hover:bg-gray-500';
      case 'green':
        return 'bg-green-500 text-white hover:bg-green-600';
      default:
        return 'bg-gray-300 text-white';
    }
  };

  return (
    <button
      className={`w-full ${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${style()} ${className} ${children}`}
      onClick={(event) => onClick(event)}
      disabled={disabled}
      name={text}>
      <p className="whitespace-nowrap">{text}</p>
    </button>
  );
};
