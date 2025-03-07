interface IProps {
  value: string;
  color: '#000000' | '#282828' | '#444444' | '#666666';
  id?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  onClick?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  className?: string;
}

const textColor = {
  '#000000': 'text-black',
  '#282828': 'text-[#282828]',
  '#444444': 'text-[#444444]',
  '#666666': 'text-[#666666]',
};

const textSize = {
  sm: 'text-sm', // 14px
  base: 'text-base', // 16px
  lg: 'text-lg', // 18px
  xl: 'text-xl', // 20px
};

const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Text = (props: IProps) => {
  const { value, id, color, size = 'base', align = 'left', onClick, className } = props;

  return (
    <p
      className={`${textColor[color]} ${textSize[size]} ${textAlign[align]} ${onClick && 'cursor-pointer'} ${className}`}
      id={id}
      onClick={(event) => onClick && onClick(event)}
      style={{ wordBreak: 'break-word' }}>
      {value}
    </p>
  );
};
