import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {getNumberOfStories, getTopStories} from "./api/apiUtil";
import {useEffect, useState} from "react";
import {Story} from "./components/story";
import {Header} from "./components/header";
import {Pagination} from "./components/pagination";
import {CircularProgress} from "@mui/material";
import packageJson from "../package.json"
import {useLocation} from "react-router-dom";

const App = () => {
  const [storyIds, setStoryIds] = useState([])
  const [stories, setStories] = useState([])
  const [filters, setFilters] = useState({page: 1, amount: 20, increaseBy: 20})
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  if (location.state) {
    const {newFilters} = location.state
    if (filters !== newFilters)
      setFilters(newFilters)
  }

  useEffect(() => {
    (async () => {
      setLoading(true)

      const fetchStoryIds = async () => await getTopStories()
      const fetchStories = async () => await getNumberOfStories(filters)

      const storyIds = await fetchStoryIds()
      if (storyIds)
        setStoryIds(storyIds)
      const stories = await fetchStories()
      if (stories)
        setStories(stories)

      setLoading(false)
    })()
  }, [filters])

  // If no stories due to server being down, give empty list
  const storiesToDisplay = stories ? stories.map(
    (story, index) => <Story key={story.id} story={story} filters={filters} index={index}></Story>) : []

  const afterLoad =
    <section id="Stories">
      {storiesToDisplay}
    </section>

  const load = <CircularProgress id="loadingAnimation" />

  return (
    <main id="App">
      <Header/>
      <div id="statement">
        <sub>
          A redesign of the Hackernews client. I love the site, but dislike the interface, so I've opted to make my own.
          Forgive me for any bugs and/or the general lack of content.
        </sub>
        <sub id="version">Bruce Crust | 2023 | v{packageJson.version}</sub>
      </div>
      {loading ? load : afterLoad }
      <Pagination filters={filters} setFilters={setFilters} maxStoryAmount={storyIds.length} isLoading={loading}/>
    </main>
  )
}

export default App

