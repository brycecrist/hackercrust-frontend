import {Button} from "@mui/material";
import './styles/pagination.css'
import {useState} from "react";
import {Link} from "react-router-dom";

export const Pagination = ({filters, maxStoryAmount, isLoading}) => {
  const [hideNextButton, setHideNextButton] = useState(false)
  const [hidePreviousButton, setHidePreviousButton] = useState(false)

  const shouldHideNextButton = () => {
    if (filters.amount + filters.increaseBy > maxStoryAmount || isLoading) {
      if (hideNextButton !== true)
        setHideNextButton(true)
    } else {
      if (hideNextButton !== false)
        setHideNextButton(false)
    }
  }

  const shouldHidePreviousButton = () => {
    if (filters.amount - filters.increaseBy <= 0 || isLoading) {
      if (hidePreviousButton !== true)
        setHidePreviousButton(true)
    } else {
      if (hidePreviousButton !== false)
        setHidePreviousButton(false)
    }
  }

  shouldHidePreviousButton()
  shouldHideNextButton()

  const nextState = {
    page: filters.page + 1,
    amount: filters.amount + filters.increaseBy,
    increaseBy: filters.increaseBy
  }

  const previousState = {
    page: filters.page - 1,
    amount: filters.amount - filters.increaseBy,
    increaseBy: filters.increaseBy
  }

  return(
    <div id="paginationContainer">
      <Link to={`/stories/${previousState.page}`} state={{filters: previousState}} className="storyDetailLink">
        <Button variant="outlined" color="primary" id="previousButton" disabled={hidePreviousButton}>Previous</Button>
      </Link>
      <Link to={`/stories/${nextState.page}`} state={{filters: nextState}} className="storyDetailLink">
        <Button variant="outlined" color="primary" id="nextButton" disabled={hideNextButton}>Next</Button>
      </Link>
    </div>
  )
}