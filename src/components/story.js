import './styles/story.css'
import {ellipsis, removeHttp} from "../utils/strings";
import {Link} from "react-router-dom";
import {Divider} from "@mui/material";
import StraightIcon from '@mui/icons-material/Straight';
import {epochToDay} from "../utils/date";
import { ReactComponent as NoStoryImage } from "../images/browser_icon_2.svg"

export const Story = ({story, filters, index}) => {
  let image

  if (story.preview) {
    const preview = story.preview
    if (preview.images.length > 0) {
      image = <img className="storyImage" alt={story.preview.description} src={story.preview.images[0]}/>
    } else {
      image = <NoStoryImage className="storyImage"/>
    }
  } else {
    image = <NoStoryImage className="storyImage"/>
  }

  const indexToDisplay = filters.page > 1 ? index + filters.amount - filters.increaseBy : index

  const convertedDateTime = epochToDay(story.time)

  return (
    <article className="story">
      <div className="storyContainer">
        <div className="storyHeadline">
          <p className="storyIndex">{indexToDisplay + 1}.</p>
          <div className="thumbnailContainer">
            {image}
            <a className="storyUrl" href={story.url}>{story.url ? removeHttp(ellipsis(story.url)) : ''}</a>
          </div>
          <section className="mainContentContainer">
            <Divider className="verticalDivider" orientation="vertical" flexItem></Divider>
            <Link to={`/storyDetails?page=${filters.page}&id=${story.id}`}
                  state={{story: story, filters: filters, image: story.preview ? story.preview.images[0] : ""}} className="storyDetailLink">
              <div className="storyTitleContainer">
                <div className="storyHeaderContainer">
                  <p className="storyTitle">{ellipsis(story.title, 100)}</p>
                </div>
              </div>
            </Link>
            <Divider className="horizontalDivider" style={{width: '100%'}} role="presentation" flexItem></Divider>
            <div className="storyInformationContainer">
              <div className="storyAuthorContainer">
                <p className="points"><StraightIcon style={{color: "orange", fontSize: "16px"}}/>{story.score} points</p>
                <p className="author">by {story.by}</p>
                <p>on {convertedDateTime.toLocaleDateString()}</p>
              </div>
              <div className="commentContainer">
                <Link to={`/storyDetails?page=${filters.page}&id=${story.id}`}
                      state={{story: story, filters: filters, image: story.preview ? story.preview.images[0] : ""}}
                      className="comments">Comments: {story.descendants}</Link>
              </div>
            </div>
          </section>
        </div>

      </div>
    </article>
  )
}