import './styles/story.css'
import {ellipsis, removeHttp} from "../utils/strings";
import {Link} from "react-router-dom";
import {Divider} from "@mui/material";
import StraightIcon from '@mui/icons-material/Straight';
import {useEffect, useState} from "react";
import {getLinkPreview} from "link-preview-js";

export const Story = ({story, filters, index}) => {
  const [storyImage, setStoryImage] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await getLinkPreview(story.url)
        setStoryImage(data)
      } catch (e) {
        console.log(`Caught exception while fetching website preview: '${e}'`)
      }
    })();
  }, [])

  let image
  const hasImage = storyImage && storyImage.images && storyImage.images[0]

  if (hasImage) {
    const imageFile = storyImage.images[0]
    const imageCameFromLiveSite = imageFile.charset
  }
    //(storyImage.images[0]
  if (storyImage && storyImage.images)
    image = <img className="storyImage" alt={story.title} src={storyImage.images[0]} />
  else
    image = <div className="noStoryImage"><p>Preview unavailable</p></div>

  const indexToDisplay = filters.page > 1 ? index + filters.amount - filters.amountToIncreaseBy : index

  return (
    <article className="story">
      <div class="storyContainer">
        <Link to={`storyDetail/${story.id}`} state={{story: story}} className="storyDetailLink">
          <div className="storyTitleContainer">
            <p className="storyIndex">{indexToDisplay + 1}.</p>
            {image}
            <div className="storyHeaderContainer">
              <p className="storyTitle">{story.title}</p>
            </div>
          </div>
        </Link>
        <a className="storyUrl" href={story.url}>({removeHttp(ellipsis(story.url))})</a>
        <Divider className="horizontalDivider" style={{width: '100%'}} role="presentation"></Divider>
        <div className="storyInformationContainer">
          <div className="storyAuthorContainer">
            <p className="points"><StraightIcon style={{color: "orange", fontSize: "16px"}}/>{story.score} points</p>
            <p className="author">by {story.by}</p>
            <Link to={`storyDetail/${story.id}`} state={{story: story}} className="comments">Comments: {story.descendants}</Link>
          </div>
        </div>
      </div>
    </article>
  )
}