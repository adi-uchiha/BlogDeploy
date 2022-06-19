import { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    

    if (file) {
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
      let postURL
      try {
        const imgres = await axiosInstance.post("/uploadPost", data, config);
        postURL = imgres.data.url
      } catch (err) {console.log(err)}
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
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
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
          Publish
        </button>
      </form>
    </div>
  );
}