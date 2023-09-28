import {useEffect} from "react";

export const Story = (story) => {
  const storyToDisplay = story.story
  console.log(storyToDisplay.id)
  return(
    <article className="story">
      <p className="storyTitle" key="FSAAHLFKAS">{storyToDisplay.title}</p>
    </article>
  )
}