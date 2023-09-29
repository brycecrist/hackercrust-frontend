import HomeIcon from '@mui/icons-material/Home'
import './styles/header.css'

export const Header = () => {
  return (
    <header>
      <HomeIcon style={{ fontSize: "medium", color: "white" }}/>
      <p id="headerTitle">CrustyNews</p>
    </header>
  )
}