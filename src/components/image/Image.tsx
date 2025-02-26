import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { ImageTypeEnum } from '@/types/enum';

interface IProps {
  src: string;
  type: ImageTypeEnum;
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export const Image = (props: IProps) => {
  const { src, type, alt, onClick } = props;

  const { isMobile } = useDeviceLayout();

  const image_type = () => {
    switch (type) {
      case ImageTypeEnum.LARGE_LOGO:
        return isMobile ? 300 : 383;
      case ImageTypeEnum.SMALL_LOGO:
        return isMobile ? 200 : 300;
      case ImageTypeEnum.LARGE:
        return isMobile ? 100 : 120;
      case ImageTypeEnum.MEDIUM:
        return isMobile ? 80 : 100;
      case ImageTypeEnum.SMALL:
        return isMobile ? 60 : 80;
      default:
        return isMobile ? 80 : 100;
    }
  };

  return (
    <img
      className={`${onClick ? 'cursor-pointer' : ''}`}
      src={src}
      alt={alt}
      width={image_type()}
      height={image_type()}
      onClick={(event) => onClick && onClick(event)}
    />
  );
};
