import {Button} from "@mui/material";
import './styles/pagination.css'
import {useState} from "react";
import {Link} from "react-router-dom";

export const Pagination = ({filters, setFilters, maxStoryAmount, isLoading}) => {
  const [hideNextButton, setHideNextButton] = useState(false)
  const [hidePreviousButton, setHidePreviousButton] = useState(false)

  const shouldHideNextButton = () => {
    if (filters.amount + filters.amountToIncreaseBy > maxStoryAmount || isLoading) {
      if (hideNextButton !== true)
        setHideNextButton(true)
    } else {
      if (hideNextButton !== false)
        setHideNextButton(false)
    }
  }

  const shouldHidePreviousButton = () => {
    if (filters.amount - filters.amountToIncreaseBy <= 0 || isLoading) {
      if (hidePreviousButton !== true)
        setHidePreviousButton(true)
    } else {
      if (hidePreviousButton !== false)
        setHidePreviousButton(false)
    }
  }

  const handleNextButton = (e) => {
    shouldHideNextButton()
    setFilters({
      page: filters.page + 1,
      amount: filters.amount + filters.amountToIncreaseBy,
      amountToIncreaseBy: filters.amountToIncreaseBy
    })
  }

  const handlePreviousButton = (e) => {
    console.log("Previous iteration: " + (filters.amount - filters.amountToIncreaseBy))
    shouldHidePreviousButton()
    setFilters({
      page: filters.page - 1,
      amount: filters.amount - filters.amountToIncreaseBy,
      amountToIncreaseBy: filters.amountToIncreaseBy
    })
  }

  shouldHidePreviousButton()
  shouldHideNextButton()

  console.log(filters.page)

  const nextState = {
    page: filters.page + 1,
    amount: filters.amount + filters.amountToIncreaseBy,
    amountToIncreaseBy: filters.amountToIncreaseBy
  }

  const previousState = {
    page: filters.page - 1,
    amount: filters.amount - filters.amountToIncreaseBy,
    amountToIncreaseBy: filters.amountToIncreaseBy
  }

  return(
    <div id="paginationContainer">
      <Link to={`/stories/${previousState.page}`} state={{newFilters: previousState}} className="storyDetailLink">
        <Button variant="outlined" color="primary" id="previousButton" disabled={hidePreviousButton}>Previous</Button>
      </Link>
      <Link to={`/stories/${nextState.page}`} state={{newFilters: nextState}} className="storyDetailLink">
        <Button variant="outlined" color="primary" id="nextButton" disabled={hideNextButton}>Next</Button>
      </Link>
    </div>
  )
}