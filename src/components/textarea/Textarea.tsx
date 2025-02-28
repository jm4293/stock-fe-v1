import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { useEffect, useRef } from 'react';

interface IProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  borderColor?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Textarea = (props: IProps) => {
  const {
    value,
    onChange,
    name,
    placeholder = '',
    disabled,
    borderColor,
    optional = false,
    className,
    children,
  } = props;

  const { isMobile } = useDeviceLayout();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange(event);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20vh';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      name={name}
      className={`${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${border_color()} ${className} w-full max-h-[60vh] rounded-2xl resize-none`}
      value={value}
      onChange={handleInput}
      placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
      disabled={disabled}
    />
  );
};
