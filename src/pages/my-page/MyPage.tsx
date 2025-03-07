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

  const onClickHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    event.preventDefault();

    const id = event.currentTarget.id;

    switch (id) {
      case 'my-board':
        navigate('/mypage/board');
        break;
      case 'my-comment':
        navigate('/mypage/comment');
        break;
      default:
        break;
    }
  };

  return myInfoQuery.isSuccess ? (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <div>
          <Image src={myInfoQuery.data.thumbnail} alt="profile" type={ImageTypeEnum.THUMBNAIL} />
        </div>
        <div>
          <Text value={myInfoQuery.data.nickname} color="#000000" />
          <Text value={myInfoQuery.data.email} color="#000000" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Text value="게시판" color="#000000" size="lg" />
        <div className="flex flex-col gap-2">
          <Text value="작성한 게시글" color="#000000" id="my-board" onClick={(event) => onClickHandler(event)} />
          <Text value="작성한 댓글" color="#000000" id="my-comment" onClick={(event) => onClickHandler(event)} />
        </div>
      </div>

      <div>
        <Text value="로그아웃" color="#000000" size="lg" onClick={(event) => onClickLogoutHandler(event)} />
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      <Text value="로그인이 필요합니다." color="#000000" />

      <Text value="로그인 하기" color="#000000" onClick={(event) => onClickLoginHandler(event)} />
    </div>
  );
};
