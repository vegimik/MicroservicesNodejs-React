import React, { useState } from "react";
import axios from "axios";

const PostCreate = (props) => {
  const [title, setTitle] = useState("");

  function showUpCurrentStatus(){
  console.log('here', props)
  }
  
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post("http://posts.com/posts/create", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>  
      <button type="button" className="btn btn-primary"  onClick={props.refresh}>Refresh Me!</button>
      
    </div>
  );
};

export default PostCreate;
