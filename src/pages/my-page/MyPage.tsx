import { useMyInfoQuery } from '@/hooks/user';
import { Text } from '@/components/text';
import { useAuthMutation } from '@/hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/components/image';
import { ImageTypeEnum } from '@/constant/enum';

export const MyPage = () => {
  const navigate = useNavigate();

  const myInfoQuery = useMyInfoQuery();

  const { onLogoutMutation } = useAuthMutation();

  const onClickLoginHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    event.preventDefault();

    navigate('/auth/login');
  };

  const onClickLogoutHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    event.preventDefault();

    if (confirm('로그아웃 하시겠습니까?')) {
      onLogoutMutation.mutate();
      navigate('/home');
    }
  };

  return (
    <div>
      {myInfoQuery.isSuccess ? (
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <div>
              <Image src={myInfoQuery.data.thumbnail} alt="profile" type={ImageTypeEnum.THUMBNAIL} />
            </div>
            <div>
              <Text value={myInfoQuery.data.nickname} color="black" size="middle" />
              <Text value={myInfoQuery.data.email} color="gray" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Text value="게시판" color="black" size="middle" />
            <div className="flex flex-col gap-2">
              <Text value="작성한 게시글" color="gray" />
              <Text value="작성한 댓글" color="gray" />
            </div>
          </div>

          <div>
            <Text value="로그아웃" color="red" size="middle" onClick={(event) => onClickLogoutHandler(event)} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Text value="로그인이 필요합니디." color="black" size="middle" />

          <Text value="로그인 하기" color="gray" onClick={(event) => onClickLoginHandler(event)} />
        </div>
      )}
    </div>
  );
};
