import HomeIcon from '@mui/icons-material/Home'
import './styles/header.css'
import {Link} from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to="/" id="titleContainer" state={{ filters: {page: 1, amount: 20, increaseBy: 20} }}>
        <HomeIcon style={{ fontSize: "medium", color: "white" }}/>
        <p id="headerTitle">HackerCrust</p>
      </Link>
    </header>
  )
}