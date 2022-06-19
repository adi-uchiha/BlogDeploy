import React from 'react'
import './singlePost.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config'

export default function SinglePost() {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path)
      // console.log(res)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)

    };
    getPost()
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, { data: { username: user.username } });
      window.location.replace('/');
    } catch (err) {
      console.log(err);
    }
  }
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, 
        { username: user.username, title, desc}
      )
      // window.location.reload();
      setUpdateMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.postPhoto &&
          <img src={post.postPhoto}
            alt=""
            className="singlePostImg" />
        }
        {updateMode ? <input 
        className="singlePostTitleInput" 
        type="text" 
        autoFocus={true}
        value = {title}
        onChange={e=>setTitle(e.target.value)}
        /> : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username &&  // [?] to not give an error if the username do not exist
              <div className="singlePostEdit">
                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)} ></i>
                <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
              </div>
            }
          </h1>
        )}




        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author:
            <Link className='link' to={`/?user=${post.username}`} >
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode? <textarea 
        value = {desc}
        onChange={(e)=>setDesc(e.target.value)}
        className="singlePostDesInput"

        />:
        (<p className="singlePostDes" >
        {desc}
        </p>)
        }
        {updateMode && 
           <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        }
      </div>
    </div>
  );
}   
