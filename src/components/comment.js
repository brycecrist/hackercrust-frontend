import './styles/comment.css'
import parse from 'html-react-parser'
import remarkGfm from "remark-gfm";

export const Comment = ({comment}) => {
  console.log(comment.by)
  const parsedText = parse(comment.text)
  const textToDisplay = typeof parsedText !== "string" ? parsedText[0] : parsedText

  return (
    <div className="comment">
      <div className="commentAuthorContainer">
        <p className="commentAuthor">{comment.by}</p>
      </div>
      <div className="commentTextContainer">
        <div className="commentText">{textToDisplay}</div>
      </div>
    </div>
  )
}