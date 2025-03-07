import { Text } from '@/components/text';

interface IProps {
  total: number | undefined;
  children?: React.ReactNode;
}

export const InfinityListWrapper = (props: IProps) => {
  const { total = 0, children } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <Text value="총" color="black" size="large" />
        <div className="flex">
          <Text value={String(total)} color="gray" />
          <Text value="개" color="gray" />
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
