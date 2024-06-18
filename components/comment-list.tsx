import { CommentProps } from '@/types';
import Image from 'next/image';
import getFormatTime from '@/lib/utils/time';
import icKebab from '@/public/images/icons/ic_kebab.svg';
import icProfile from '@/public/images/icons/ic_profile.png';
import imageReplyEmpty from '@/public/images/Img_reply_empty.png';

type Props = {
  comments: CommentProps[];
};

export default function CommentList({ comments }: Props) {
  return (
    <>
      {comments.length === 0 ? (
        <div className='my-5 text-center text-cool-gray400'>
          <Image className='m-auto' src={imageReplyEmpty} width={140} alt='말풍선' />
          아직 댓글이 없어요.
          <br />
          지금 댓글을 달아보세요!
        </div>
      ) : (
        <div className='mb-10'>
          {comments.map(comment => (
            <div key={comment.id} className='flex flex-col gap-3 pb-4 mt-4 border-b'>
              <div className='flex justify-between'>
                {comment.content}
                <Image src={icKebab} width={24} alt='케밥 메뉴' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-[32px]'>
                  <Image src={icProfile} width={32} alt='프로필 기본 사진' />
                </div>
                <div className='flex-col'>
                  <div className='text-cool-gray600'>{comment.writer.nickname}</div>
                  <div className='text-cool-gray400'>{getFormatTime(comment.createdAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
