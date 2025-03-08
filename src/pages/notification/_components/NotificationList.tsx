import { useNotificationListQuery, useUserMutation } from '@/hooks/user';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { InfinityList, InfinityListWrapper } from '@/components/infinity-list';
import { Text } from '@/components/text';
import dayjs from 'dayjs';
import { CloseSvg } from '@/asset/svg';
import { INotificationListRes } from '@/types/res';

export const NotificationList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useNotificationListQuery();

  const { onReadNotificationMutation, onReadAllNotificationMutation, onDeleteNotificationMutation } = useUserMutation();

  const onClickReadAllHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    event.stopPropagation();

    onReadAllNotificationMutation.mutate();
  };

  const onClickReadHandler = (params: {
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>;
    userNotificationSeq: number;
  }) => {
    const { event, userNotificationSeq } = params;

    event.stopPropagation();

    onReadNotificationMutation.mutate({ userNotificationSeq });
  };

  const onClickDeleteHandler = (params: {
    event: React.MouseEvent<SVGSVGElement, MouseEvent>;
    userNotificationSeq: number;
  }) => {
    const { event, userNotificationSeq } = params;

    event.stopPropagation();

    onDeleteNotificationMutation.mutate(userNotificationSeq);
  };

  const renderItem = (page: AxiosResponse<ResConfig<INotificationListRes>, any>) => {
    const { notifications, total } = page.data.data;

    return total > 0
      ? notifications.map((notification) => (
          <div className="flex flex-col gap-1 mb-4 p-2 rounded-md hover:bg-gray-100">
            <div
              key={notification.userNotificationSeq}
              className="flex justify-between items-center"
              onMouseEnter={(event) =>
                !notification.isRead &&
                onClickReadHandler({ event, userNotificationSeq: notification.userNotificationSeq })
              }>
              <div className="flex items-center gap-2">
                {!notification.isRead && <div className="w-1.5 h-1.5 bg-yellow-300 rounded-3xl" />}
                <Text value={notification.message} color="#000000" />
              </div>

              <CloseSvg
                color="#989898"
                onClick={(event) =>
                  onClickDeleteHandler({ event, userNotificationSeq: notification.userNotificationSeq })
                }
              />
            </div>
            <div className="flex justify-between items-center">
              <Text value={String(dayjs(notification.createdAt).format('YY-MM-DD HH:mm'))} color="#000000" />
            </div>
          </div>
        ))
      : [<Text value="알림이 없습니다." color="#000000" />];
  };

  return (
    <InfinityListWrapper
      total={data?.[0].data.data.total}
      renderHeader={
        <div className="flex justify-end items-center">
          <Text value="모두읽기" color="#000000" onClick={(event) => onClickReadAllHandler(event)} />
        </div>
      }
      renderList={
        <div className="w-full">
          <InfinityList<AxiosResponse<ResConfig<INotificationListRes>, any>>
            data={data || []}
            renderItem={renderItem}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      }
    />
  );
};
