import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { ConfirmSvg } from '@/asset/svg';
import { Text } from '@/components/text';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  borderColor?: 'gray' | 'green';
  optional?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  className?: string;
  isConfirm?: boolean;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = (props: IProps) => {
  const {
    type,
    title,
    value,
    onChange,
    name,
    placeholder = '',
    disabled,
    borderColor,
    optional = false,
    ref,
    className,
    isConfirm,
    onClick,
    onKeyDown,
  } = props;

  const { isMobile } = useDeviceLayout();

  const border_color = () => {
    switch (borderColor) {
      case 'gray':
        return 'border border-gray-300';
      case 'green':
        return 'border border-green-400';
      default:
        return 'border border-gray-300';
    }
  };

  return (
    <div className="relative flex flex-col gap-3">
      <Text value={title} color="#000000" />
      <input
        ref={ref}
        name={name}
        className={`w-full placeholder:text-[#B5B5B5] placeholder:font-normal py-3 px-4 ${isConfirm ? 'pr-10' : ''} ${border_color()}  ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
        disabled={disabled}
      />
      {isConfirm && <ConfirmSvg className="absolute right-2" color="#989898" onClick={onClick} />}
    </div>
  );
};
