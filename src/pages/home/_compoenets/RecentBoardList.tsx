import { useHomeRecentBoardListQuery } from '@/hooks/home';
import { Loading } from '@/components/loading';
import { Text } from '@/components/text';

export const RecentBoardList = () => {
  const homeRecentBoardListQuery = useHomeRecentBoardListQuery();

  return homeRecentBoardListQuery.isSuccess ? (
    <>
      <Text value="추천 게시글" color="#000000" size="xl" />

      {homeRecentBoardListQuery.data.map((board) => (
        <div key={board.boardSeq}>
          <Text value={board.title} color="#000000" size="lg" weight="bold" />
          <Text value={board.content} color="#000000" size="base" />
          <div className="flex gap-4">
            <div className="flex gap-2">
              <Text value="추천수: " color="#000000" size="base" />
              <Text value={String(board.likeCount)} color="#000000" size="base" />
            </div>
            <div className="flex gap-2">
              <Text value="조회수: " color="#000000" size="base" />
              <Text value={String(board.viewCount)} color="#000000" size="base" />
            </div>
          </div>
        </div>
      ))}
    </>
  ) : (
    <Loading />
  );
};
