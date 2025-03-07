import { Text } from '@/components/text';

interface IProps {
  total: number | undefined;
  renderItem?: JSX.Element;
  children?: React.ReactNode;
}

export const InfinityListWrapper = (props: IProps) => {
  const { total = 0, renderItem, children } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Text value="총" color="black" size="large" />
          <div className="flex">
            <Text value={String(total)} color="gray" />
            <Text value="개" color="gray" />
          </div>
        </div>

        {renderItem && <div>{renderItem}</div>}
      </div>

      <div>{children}</div>
    </div>
  );
};
