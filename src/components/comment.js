import './styles/comment.css'
import Markdown from 'https://esm.sh/react-markdown@9'
import parse from 'html-react-parser'
import remarkGfm from "remark-gfm";

export const Comment = ({comment}) => {
  console.log(comment.by)
  const parsedText = parse(comment.text)
  const textToDisplay = typeof parsedText !== "string" ? parsedText[0] : parsedText
  const commentText = comment.text ? <Markdown remarkPlugins={[remarkGfm]} className="commentText">{textToDisplay}</Markdown> : ""

  return (
    <div className="comment">
      <div className="commentAuthorContainer">
        <p className="commentAuthor">{comment.by}</p>
      </div>
      <div className="commentTextContainer">
        {commentText}
      </div>
    </div>
  )
}