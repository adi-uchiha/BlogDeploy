import { useContext, useState } from "react";
import "./write.css";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [imgMsg, setImgMsg] = useState(null);
  const [publishBuffer, setPublishBuffer] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(title)
    console.log(desc)    
    if (title === ""){
      setEmptyData(true)
      return
    }
    if (desc === ''){
      setEmptyData(true)
      return
    }
    console.log("procced")
    setEmptyData(false)
    let postURL = ''

    if(!file){
      setImgMsg(true)
      return
    }

    
    if (file) {
      setImgMsg(false)
      setPublishBuffer(true)
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      data.append("userid", user._id)
    
      const config = {
        header: {
          'content-type': 'multipart/form-data',
        }
      }


      
      if(file){

        try {
          const imgres = await axiosInstance.post("/uploadPost", data, config);
          postURL = imgres.data.url
        } catch (err) {console.log(err)}
      }
    
      const newPost = {
        username: user.username,
        title,
        desc,
        postPhoto: postURL
      };
      try {

        const res = await axiosInstance.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (err) {}
    
    }
    setPublishBuffer(false)
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
     
      {imgMsg && <p>Give img!</p>}
      {emptyData && <p>Title and body cannot be empty</p> }
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {setFile(e.target.files[0])
            setImgMsg(!imgMsg)
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          {publishBuffer && <i class="fa fa-refresh fa-spin"></i>}Publish
        </button>

      </form>

    </div>
  );
}