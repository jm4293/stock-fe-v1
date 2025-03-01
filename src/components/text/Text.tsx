interface IProps {
  value: string;
  color: 'gray' | 'black';
  id?: string;
  size?: 'small' | 'middle' | 'large';
  onClick?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  className?: string;
}

export const Text = (props: IProps) => {
  const { value, color, id, size = 'middle', onClick, className } = props;

  const textColor = () => {
    switch (color) {
      case 'gray':
        return 'text-[#989898]';
      case 'black':
        return 'text-black';
      default:
        return 'text-black';
    }
  };

  const textSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'middle':
        return 'text-base';
      case 'large':
        return 'text-xl';
      default:
        return 'text';
    }
  };

  return (
    <p
      className={`${textColor()} ${textSize()} ${onClick && 'cursor-pointer'} ${className}`}
      id={id}
      onClick={(event) => onClick && onClick(event)}
      style={{ wordBreak: 'break-word' }}>
      {value}
    </p>
  );
};
