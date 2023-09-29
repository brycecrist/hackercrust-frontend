import {Button} from "@mui/material";
import './styles/pagination.css'

export const Pagination = ({filters, setFilters}) => {

  const handleNextButton = (e) => {
    console.log("Next")
    const amount = filters.amount
    const maxAmount = filters.maxAmount
    const page = filters.page
    const newFilters = {page: page + 1, amount: amount + maxAmount, maxAmount: maxAmount}
    setFilters(newFilters)
  }

  const handlePreviousButton = (e) => {
    console.log("Previous")
    setFilters({page: filters.page - 1, amount: filters.amount - filters.maxAmount, maxAmount: filters.maxAmount})
    console.log(filters)
  }

  return(
    <div id="paginationContainer">
      <Button variant="contained" id="previousButton" onClick={handlePreviousButton}>Previous</Button>
      <Button variant="contained" id="nextButton" onClick={handleNextButton}>Next</Button>
    </div>
  )
}