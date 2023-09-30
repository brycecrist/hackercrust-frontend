import './styles/story.css'
import {ellipsis} from "../utils/strings";
import {Link} from "react-router-dom";
import {Divider} from "@mui/material";

export const Story = ({story}) => {
  return (
    <article className="story">
      <Link to={`storyDetail/${story.id}`} state={{story: story}} className="storyDetailLink">
        <div className="storyTitleContainer">
          <p className="storyTitle">{story.title}</p>
        </div>
      </Link>
      <div id="verticalDivider"></div>
      <Divider id="horizontalDivider" style={{width: '100%'}} role="presentation"></Divider>
      <a className="storyUrl" href={story.url}>({ellipsis(story.url)})</a>
    </article>
  )
}