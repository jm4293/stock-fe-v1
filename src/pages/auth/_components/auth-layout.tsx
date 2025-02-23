import { useDeviceLayout } from '@/hooks/useDeviceLayout';

interface IProps {
  children: React.ReactNode;
}

export const AuthLayout = (props: IProps) => {
  const { children } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <div className="h-[100vh] flex justify-center overflow-x-hidden overflow-y-auto">
      <div
        className={`${isMobile ? 'w-full' : 'w-[80vw]'} max-w-[960px] px-10 pb-[50px] flex flex-col items-center overflow-y-auto`}>
        {children}
      </div>
    </div>
  );
};
