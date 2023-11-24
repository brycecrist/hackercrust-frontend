import './styles/story.css'
import {ellipsis, removeHttp} from "../utils/strings";
import {Link} from "react-router-dom";
import {Divider} from "@mui/material";
import StraightIcon from '@mui/icons-material/Straight';
import {epochToDay} from "../utils/date";

export const Story = ({story, filters, index}) => {
  let image

  if (story.preview)
    image = <img className="storyImage" alt={story.title} src={story.preview.images[0]} />
  else if (!story.url)
    image = <div className="noImage"><p style={{color: "orange"}}>HN</p></div>
  else
    image = <div className="noImage"><p></p></div>

  const indexToDisplay = filters.page > 1 ? index + filters.amount - filters.increaseBy : index

  const convertedDateTime = epochToDay(story.time)

  return (
    <article className="story">
      <div className="storyContainer">
        <div className="storyHeadline">
          <p className="storyIndex">{indexToDisplay + 1}.</p>
          <div className="thumbnailContainer">
            {image}
            <a className="storyUrl" href={story.url} hidden={!story.url}>{story.url ? removeHttp(ellipsis(story.url)) : ''}</a>
          </div>
          <Divider orientation="vertical" flexItem />
          <Link to={`/storyDetails?page=${filters.page}&id=${story.id}`}
                state={{story: story, filters: filters, image: story.preview ? story.preview.images[0] : ""}} className="storyDetailLink">
            <div className="storyTitleContainer">
              <div className="storyHeaderContainer">
                <p className="storyTitle">{story.title}</p>
              </div>
            </div>
          </Link>
        </div>
        <Divider className="horizontalDivider" style={{width: '100%'}} role="presentation"></Divider>
        <div className="storyInformationContainer">
          <div className="storyAuthorContainer">
            <p className="points"><StraightIcon style={{color: "orange", fontSize: "16px"}}/>{story.score} points</p>
            <p className="author">by {story.by}</p>
            <p>on {convertedDateTime.toLocaleDateString()}</p>
            <Link to={`/storyDetails?page=${filters.page}&id=${story.id}`}
                  state={{story: story, filters: filters, image: story.preview ? story.preview.images[0] : ""}}
                  className="comments">Comments: {story.descendants}</Link>
          </div>
        </div>
      </div>
    </article>
  )
}