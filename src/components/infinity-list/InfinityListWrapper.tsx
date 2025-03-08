import { Text } from '@/components/text';

interface IProps {
  total: number | undefined;
  renderHeader?: JSX.Element;
  renderList?: JSX.Element;
}

export const InfinityListWrapper = (props: IProps) => {
  const { total = 0, renderHeader, renderList } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Text value="총" color="#000000" size="lg" />
          <div className="flex">
            <Text value={String(total)} color="#000000" />
            <Text value="개" color="#000000" />
          </div>
        </div>

        {renderHeader && <div>{renderHeader}</div>}
      </div>

      <div>{renderList}</div>
    </div>
  );
};
