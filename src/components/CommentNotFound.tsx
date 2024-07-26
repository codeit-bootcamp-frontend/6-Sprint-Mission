import img_empty from '../assets/img_empty.png'

function CommentNotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={img_empty} className="h-52 w-52" />
      <p className="text-btn4">아직 문의가 없습니다.</p>
    </div>
  )
}

export default CommentNotFound
