import {Link, useLocation} from "react-router-dom";
import {ellipsis} from "../utils/strings";
import {Header} from "../components/header";
import {CircularProgress, Divider} from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import './styles/storyDetail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {getComments} from "../api/apiUtil";
import {Comment} from "../components/comment";

export const StoryDetail = () => {
  const location = useLocation()
  const {story, filters, image} = location.state
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)

      const fetchComments = async () => {
        console.log("Fetching comments...")
        if (story.kids && story.kids.length > 0) {
          const commentsResponse = await getComments(story.kids)
          setComments(commentsResponse.comments)
        }
      }

      await fetchComments()
      setLoading(false)
    })()
  }, [])


  const commentsToDisplay = comments ? comments.map(
    (comment) => {
      if (comment.text)
        return <Comment key={comment.id} comment={comment}></Comment>
    }) : []

  const afterLoad = <div id="commentsSection">
                      {commentsToDisplay}
                    </div>

  const load = <CircularProgress id="loadingAnimation" />

  let thumbnail
  if (image)
    thumbnail = <img className="storyDetailImage" alt={story.title} src={image} />
  else
    thumbnail = <div className="noStoryDetailImage"><p>Preview unavailable</p></div>

  // Comment for deployment
  return (
    <section id="storyDetailContainer">
      <Header></Header>
      <div id="subDetailContainer">
        <div id="textContainer">
          <Link to={`/stories/${filters.page}`}>
            <ArrowBackIcon id="backButton" />
          </Link>
          <div className="storyDetailTitleContainer">
            <a className="storyDetailTitle" href={story.url}>{story.title}</a>
            <a className="storyDetailUrl" href={story.url}>({ellipsis(story.url)})</a>
          </div>
        </div>
        {thumbnail}
        <div id="commentsContainer">
          <Divider id="commentsDivider">Comments</Divider>
          {loading ? load : afterLoad }
        </div>
      </div>
    </section>
  )
}
