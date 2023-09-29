import {Button} from "@mui/material";
import './styles/pagination.css'
import {useState} from "react";

export const Pagination = ({filters, setFilters, maxStoryAmount}) => {
  const [hideNextButton, setHideNextButton] = useState(false)
  const [hidePreviousButton, setHidePreviousButton] = useState(false)

  const shouldHideNextButton = () => {
    console.log("Next iteration: " + (filters.amount + filters.amountToIncreaseBy))
    console.log("Max: " + maxStoryAmount)
    if (filters.amount + filters.amountToIncreaseBy > maxStoryAmount) {
      if (hideNextButton !== true)
        setHideNextButton(true)
    } else {
      if (hideNextButton !== false)
        setHideNextButton(false)
    }
  }

  const shouldHidePreviousButton = () => {
    if (filters.amount - filters.amountToIncreaseBy <= 0) {
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

  return(
    <div id="paginationContainer">
      <Button variant="contained" id="previousButton" onClick={handlePreviousButton} disabled={hidePreviousButton}>Previous</Button>
      <Button variant="contained" id="nextButton" onClick={handleNextButton} disabled={hideNextButton}>Next</Button>
    </div>
  )
}