import './styles/story.css'
import {ellipsis, removeHttp} from "../utils/strings";
import {Link} from "react-router-dom";
import {Divider} from "@mui/material";
import StraightIcon from '@mui/icons-material/Straight';
import {epochToDay} from "../utils/date";
import { ReactComponent as NoStoryImage } from "../images/browser_icon_2.svg"

export const Story = ({story, filters, index}) => {
  let image
  let preview = story.preview ? story.preview : null
  const hasImage = preview && preview.images && preview.images.length > 0

  if (hasImage) {
    image = <img className="storyImage" alt={story.preview.description} src={story.preview.images[0]}/>
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
            <a className="storyUrl" href={story.url}>{story.url ? removeHttp(ellipsis(story.url, 20)) : ''}</a>
          </div>
          <section className="mainContentContainer">
            <Link to={`/storyDetails?page=${filters.page}&id=${story.id}`}
                  state={{story: story, filters: filters, image: hasImage ? preview.images[0] : ""}} className="storyDetailLink">
              <div className="storyTitleContainer">
                <div className="storyHeaderContainer">
                  <p className="storyTitle">{ellipsis(story.title, 80)}</p>
                </div>
              </div>
            </Link>
            <Divider className="horizontalDivider" style={{width: '100%'}} role="presentation" flexItem></Divider>
            <div className="storyInformationContainer">
              <div className="storyAuthorContainer">
                <p className="points"><StraightIcon style={{color: "orange", fontSize: "16px"}}/>{story.score}</p>
                <p className="author">{ellipsis(story.by, 10)}</p>
                <p>on {convertedDateTime.toLocaleDateString()}</p>
              </div>
              <div className="commentContainer">
                <Link to={`/storyDetails?page=${filters.page}&id=${story.id}`}
                      state={{story: story, filters: filters, image: hasImage ? preview.images[0] : ""}}
                      className="comments">Comments: {story.descendants ? story.descendants : "0"}</Link>
              </div>
            </div>
          </section>
        </div>

      </div>
    </article>
  )
}