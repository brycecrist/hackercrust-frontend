import {useEffect} from "react";
import './styles/story.css'
import {ellipsis} from "../utils/strings";

export const Story = (story) => {
  const storyToDisplay = story.story
  return(
    <article className="story">
      <p className="storyTitle">{storyToDisplay.title}</p>
      <a className="storyUrl" href={storyToDisplay.url}>({ellipsis(storyToDisplay.url)})</a>
    </article>
  )
}