import {Link, useLocation} from "react-router-dom";
import {ellipsis} from "../utils/strings";
import {Header} from "../components/header";
import {Divider} from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import './styles/storyDetail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {getComments} from "../api/apiUtil";

export const StoryDetail = () => {
  const location = useLocation()
  const {story, filters, image} = location.state
  const [comments, setComments] = useState([])

  useEffect(() => {
    (async () => {
      const fetchComments = async () => {
        console.log("Fetching comments...")
        if (story.kids && story.kids.length > 0) {
          const commentsResponse = await getComments(story.kids)
          console.log(commentsResponse)
        }
      }

      await fetchComments()
    })()
  }, [])

  console.log(comments)

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
          <div id="commentsSection">
            <EngineeringIcon fontSize="large"/>
            Under Construction
          </div>
        </div>
      </div>
    </section>
  )
}
