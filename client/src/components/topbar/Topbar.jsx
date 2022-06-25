
import "./topbar.css";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {

  const {user, dispatch} = useContext(Context);
  const handleLogout = ()=>{
    dispatch({type: 'LOGOUT'})
  }
  return (
    <div className="top">
       <div className="topLeft"> 

       <a href="https://facebook.com" target="_blank">
       <i className="topIcon fa-brands fa-facebook-square"></i>       
       </a>
       <a href="https://instagram.com" target="_blank">
       <i className="topIcon fa-brands fa-instagram-square"></i>
       </a>
       <a href="https://twitter.com" target="_blank">
       <i className="topIcon fa-brands fa-twitter-square"></i>
       </a>
       <a href="https://pinterest.com" target="_blank">
       <i className="topIcon fa-brands fa-pinterest-square"></i>
       </a>
       <a href="https://github.com/adi-uchiha/Blog" target="_blank">
       <i className="topIcon fa-brands fa-github-square"></i>
       </a>
       </div>
       <div className="center">
         <ul className="topList">
           <li className="topListItem">
            <Link className="link" to='/'>HOME</Link>
           </li>
           <li className="topListItem">
            <Link className="link" to='/about'> ABOUT</Link>
           </li>
           <li className="topListItem">
            <Link className="link" to='/contact'>CONTACT</Link>
           </li>
           <li className="topListItem">
            <Link className="link" to='/write'>WRITE</Link>
           </li>
           <li className="topListItem" onClick={handleLogout}>
            {user&&'LOGOUT'}
           </li>
          </ul>
        
       </div>
       <div className="topRight">
        { 
          user ?
          <Link to='/settings'><img className="topImg" 
          src={user.profilePic} 
          alt="  "  />
          </Link>
          
          :   <ul className="topList">
            <li className="topListItem">
              <Link className="link" to='/register'>REGISTER</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to='/login'>LOGIN</Link>
            </li>
          </ul>
        }
       <i class="topSearchIcon fa-solid fa-magnifying-glass"></i>

       </div>

    </div>
  )
}
