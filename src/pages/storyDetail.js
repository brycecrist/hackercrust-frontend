import {Link, useLocation} from "react-router-dom";
import {ellipsis} from "../utils/strings";
import {Header} from "../components/header";
import {Divider} from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import './styles/storyDetail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const StoryDetail = () => {
  const location = useLocation()
  const {story} = location.state
  return (
    <section id="storyDetailContainer">
      <Header></Header>
      <div id="storyContainer">
        <div id="textContainer">
          <Link to="/">
            <ArrowBackIcon id="backButton" />
          </Link>
          <div className="storyDetailTitleContainer">
            <a className="storyDetailTitle" href={story.url}>{story.title}</a>
            <a className="storyDetailUrl" href={story.url}>({ellipsis(story.url)})</a>
          </div>
        </div>
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
