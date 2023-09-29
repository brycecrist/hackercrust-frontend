import {useLocation} from "react-router-dom";

export const StoryDetail = () => {
  const location = useLocation()
  const {story} = location.state
  console.log(story)
  return (
    <section id="storyDetailContainer">
      <div id="titleContainer">
      </div>
    </section>
  )
}