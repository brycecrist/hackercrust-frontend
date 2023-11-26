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
import * as data from "./utils/data";
import {cachedStories} from "./utils/data";

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

      console.log(storiesAreInCache())

      if (storiesAreInCache()) {
        console.log("GOT IT BYE!")
        setLoading(false)
        return
      }

      const fetchStoryIds = async () => await getTopStories()
      const fetchStories = async () => await getNumberOfStories(storyFilters)

      const storyIds = await fetchStoryIds()
      if (storyIds)
        setStoryIds(storyIds)
      if (storyFilters) {
        console.log("Fetching Stories")
        setStories(await fetchStories())
        console.log(stories)
      }

      setLoading(false)
    })()
  }, [storyFilters])

  useEffect(() => {
    if (!cachedStories.hasOwnProperty(storyFilters.page)) {
      console.log("Hola")
      if (stories.length > 0) {
        const entry = {
          page: storyFilters.page,
          stories: stories
        }

        cachedStories.viewed.push(entry)
        console.log(cachedStories.viewed)
      }
    }
  }, [stories])

  const storiesAreInCache = () => {
    let foundPage = false
    cachedStories.viewed.forEach(i => {
      console.log("I!")
      console.log(i)
      if (i.page === storyFilters.page) {
        console.log("FOUND IT!")
        setStories(i.stories)
        foundPage = true
      }
    })

    return foundPage
  }

  // If no stories due to server being down, give empty list/*
  const storiesToDisplay = stories ? stories.map(
    (story, index) => <Story key={story.id} story={story} filters={storyFilters} index={index}></Story>) : []

  const noStories = <div id="noStories" hidden={stories.length > 0}>500! Oh No!<br/> No stories to be found here... <br/>try again later :(</div>

  const afterLoad = stories.length > 0 ?
    <section id="Stories">
      {storiesToDisplay}
    </section> : noStories

  const load = <CircularProgress id="loadingAnimation" />

  return (
    <main id="App">
      <Header/>
      <div id="topLevelContainer">
        <div id="statement">
          <sub>A crusty <a href="https://news.ycombinator.com/">Hacker News</a> client based in the Rockies</sub>
          <sub id="version">Bruce Crust | 2023 | v{packageJson.version}</sub>
        </div>
        {loading ? load : afterLoad }
        {stories.length > 0 ?
          <Pagination filters={storyFilters} maxStoryAmount={storyIds.length} isLoading={loading}/> :
          <div></div>}
      </div>
    </main>
  )
}

export default App

