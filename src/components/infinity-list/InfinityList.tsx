import { useEffect, useRef } from 'react';
import { Loading } from '@/components/loading';

interface IProps<T> {
  data: T[];
  renderItem: (item: T) => JSX.Element[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function InfinityList<T>(props: IProps<T>) {
  const { data, renderItem, fetchNextPage, hasNextPage, isFetchingNextPage } = props;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">{data.map(renderItem)}</div>

      <div ref={loadMoreRef} className="flex justify-center items-center">
        {isFetchingNextPage && <Loading />}
      </div>
    </div>
  );
}
