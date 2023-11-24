import {Link, useLocation, useSearchParams} from "react-router-dom";
import {ellipsis} from "../utils/strings";
import {Header} from "../components/header";
import {CircularProgress, Divider} from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import './styles/storyDetail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {getComments, getStory} from "../api/apiUtil";
import {Comment} from "../components/comment";

export const StoryDetail = () => {
  const [comments, setComments] = useState([])
  const [storyLoading, setStoryLoading] = useState(false)
  const [commentLoading, setCommentLoading] = useState(false)

  const location = useLocation()
  console.log(`LOCATION: `)
  console.log(location.state)
  let { story, filters } = location.state || {}

  console.log("BEGINNING")
  console.log(story)
  console.log(filters)

  let retrievedState = !!story

  const [searchParams] = useSearchParams()

  useEffect(() => {
    (async () => {
      setStoryLoading(true)

      const getStoryDetails = async () => {
        const story = await getStory(searchParams.get("id"))
        return {story: story, filters: {page: searchParams.get("page")}, image: null}
      }

      if (!retrievedState) {
        setStoryLoading(true)

        const details = await getStoryDetails()
        console.log(details.filters)
        story = details.story
        filters = details.filters
        console.log(filters)

        retrievedState = true
      }

      setStoryLoading(false)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      setCommentLoading(true)
      const fetchComments = async () => {
        if (story && story.kids) {
          const commentsResponse = await getComments(story.kids)
          setComments(commentsResponse.comments)
        }
      }

      await fetchComments()
      setCommentLoading(false)
    })()
  }, [story])

  const commentsToDisplay = comments ? comments.map(
    (comment) => {
      if (comment.text)
        return <Comment key={comment.id} comment={comment}></Comment>
    }) : []

  const afterLoad = <div id="commentsSection">
                      {commentsToDisplay}
                    </div>

  const load = <CircularProgress id="loadingAnimation" />

  let thumbnail = (story && story.preview) ?
    <img className="storyDetailImage" alt={story.title} src={story.preview.images[0]} /> :
    <div></div>

  const storyUrl = story ? story.url : ""

  console.log(filters)

  const storyDetailInformation =
    <div id="storyDetailInformationContainer">
      <div id="textContainer">
        <Link to={`/stories/${filters ? filters.page : 1}`} state={{filters: filters}}>
          <ArrowBackIcon id="backButton" />
        </Link>
        <div className="storyDetailTitleContainer">
          <a className="storyDetailTitle" href={storyUrl}>{story ? story.title : ""}</a>
          <a className="storyDetailUrl" href={storyUrl}>{story.url ? `(${ellipsis(storyUrl)})` : ""}</a>
        </div>
      </div>
      {thumbnail}
    </div>

  return (
    <section id="storyDetailContainer">
      <Header></Header>
      <div id="subDetailContainer">
        {storyLoading ? load : storyDetailInformation}

        <div id="commentsContainer">
          <Divider id="commentsDivider">Comments</Divider>
          {commentLoading ? load : afterLoad }
        </div>
      </div>
    </section>
  )
}
