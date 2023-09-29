import './styles/story.css'
import {ellipsis} from "../utils/strings";
import {Link} from "react-router-dom";

export const Story = ({story}) => {
  return (
    <article className="story">
      <Link to={`storyDetail/${story.id}`} state={{story: story}} className="storyDetailLink">
        <div className="storyTitleContainer">
          <p className="storyTitle">{story.title}</p>
        </div>
      </Link>
      <a className="storyUrl" href={story.url}>({ellipsis(story.url)})</a>
    </article>
  )
}