import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {getNumberOfStories, getTopStories} from "./api/apiUtil";
import {useEffect, useState} from "react";
import {Story} from "./components/story";

const App = () => {
  const [stories, setStories] = useState([])

  useEffect(() => {
    (async () => {
      const fetchStoryIds = async () => {
        const response = await getTopStories()
        return await response.json()
      }

      const fetchStories = async (ids) => {
        const response = await getNumberOfStories(ids, {page: 1, amount: 1})
        return response
      }

      const ids = await fetchStoryIds()
      const stories = await fetchStories(ids)
      setStories(stories)
    })()
  }, [])

  const storiesToDisplay = stories.map(story => <Story key={story.id} story={story}></Story>)

  return (
    <main id="App">
        <section id="Stories">
          {storiesToDisplay}
        </section>
    </main>
  )
}

export default App
