import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {getNumberOfStories, getTopStories} from "./api/apiUtil";
import {useEffect, useState} from "react";
import {Story} from "./components/story";
import html2canvas from "html2canvas";
import {Header} from "./components/header";
import {Pagination} from "./components/pagination";
import {CircularProgress} from "@mui/material";
import {Divider} from "@mui/material";

const App = () => {
  const [storyIds, setStoryIds] = useState([])
  const [stories, setStories] = useState([])
  const [filters, setFilters] = useState({page: 1, amount: 20, amountToIncreaseBy: 20})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      console.log("Loading Data")
      setLoading(true)
      const fetchStoryIds = async () => {
        const response = await getTopStories()
        return await response.json()
      }

      const fetchStories = async (ids) => {
        return await getNumberOfStories(ids, filters)
      }

      const ids = await fetchStoryIds()
      setStoryIds(ids)
      const stories = await fetchStories(ids)
      setStories(stories)

      setLoading(false)
      console.log("Data has been loaded successfully")
    })()
  }, [filters])

  //setMaxStoryAmount(storyIds.length)
  const storiesToDisplay = stories.map(story => <Story key={story.id} story={story}></Story>)

  const afterLoad =
    <section id="Stories">
      {storiesToDisplay}
    </section>


  const load = <CircularProgress id="loadingAnimation" />

  return (
    <main id="App">
      <Header/>
      {loading ? load : afterLoad }
      <Pagination filters={filters} setFilters={setFilters} maxStoryAmount={storyIds.length} isLoading={loading}/>
    </main>
  )
}

export default App
