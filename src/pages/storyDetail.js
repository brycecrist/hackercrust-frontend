import { useLocation} from "react-router-dom";
import {ellipsis} from "../utils/strings";
import {Header} from "../components/header";
import {Divider} from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import './styles/storyDetail.css'

export const StoryDetail = () => {
  const location = useLocation()
  const {story} = location.state
  console.log(story)
  return (
    <section id="storyDetailContainer">
      <Header></Header>
      <div id="storyContainer">
        <div id="titleContainer">
          <div className="storyTitleContainer">
            <p className="storyTitle">{story.title}</p>
          </div>
          <a className="storyUrl" href={story.url}>({ellipsis(story.url)})</a>
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
