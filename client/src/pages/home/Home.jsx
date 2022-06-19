import {useState, useEffect} from "react";
import Header from '../..//components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation(); //for cheacking only query urls
  useEffect(() =>{
    const fetchPosts = async()=>{
      const res = await axiosInstance.get('/posts'+search);
      // console.log(res)
      setPosts(res.data);
    }
    fetchPosts();
  },[search]);

  return (
    <>
      <Header />
      <div className="home" >
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  )
}
