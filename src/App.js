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
  const [loading, setLoading] = useState(false)
  // YOu have to have this silly
  const [storyFilters, setStoryFilters] = useState({ page: 1, amount: 20, increaseBy: 20 })

  const location = useLocation()
  const { filters } = location.state || {}

  if ((filters && storyFilters) && (filters !== storyFilters))
    setStoryFilters(filters)


  useEffect(() => {
    (async () => {
      setLoading(true)

      const fetchStoryIds = async () => await getTopStories()
      const fetchStories = async () => await getNumberOfStories(storyFilters)

      const storyIds = await fetchStoryIds()
      if (storyIds)
        setStoryIds(storyIds)
      if (storyFilters)
        setStories(await fetchStories())

      setLoading(false)
    })()
  }, [storyFilters])

  // If no stories due to server being down, give empty list/*
  const storiesToDisplay = stories ? stories.map(
    (story, index) => <Story key={story.id} story={story} filters={storyFilters} index={index}></Story>) : []

  const noStories = <div id="noStories">500! Oh No!<br/> No stories to be found here... <br/>try again later :(</div>

  const afterLoad = stories.length > 0 ?
    <section id="Stories">
      {storiesToDisplay}
    </section> : noStories

  const load = <CircularProgress id="loadingAnimation" />

  return (
    <main id="App">
      <Header/>
      <div id="statement">
        <sub>A <a href="https://news.ycombinator.com/">Hacker News</a> client based in the Rocky Mountains</sub>
        <sub id="version">Bruce Crust | 2023 | v{packageJson.version}</sub>
      </div>
      {loading ? load : afterLoad }
      {stories.length > 0 ?
        <Pagination filters={storyFilters} maxStoryAmount={storyIds.length} isLoading={loading}/> :
        <div></div>}
    </main>
  )
}

export default App

