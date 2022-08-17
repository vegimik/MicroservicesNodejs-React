import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = forwardRef(
  (props, ref) => {
    const [posts, setPosts] = useState({});
    
    React.useImperativeHandle(ref, () => ({
      foo() {
        changeMessage('Called method of child from parent')
        refreshFromList()
      },
    }))

    function refreshFromList(){
      console.log('Refresh from List')
      fetchPosts()      
    }
  


    function changeMessage (mess) {
      console.log(mess)
    };
  
    const fetchPosts = async () => {
      const res = await axios.get("http://posts.com/posts");
      console.log(res)
      setPosts(res.data);
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const renderedPosts = Object.values(posts).map((post) => {
      return (
        <div
          className="card"
          style={{ width: "50%", marginBottom: "20px" }}
          key={post.id}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      );
    });
  
    return (
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
      </div>
    );
  }

);

export default PostList;
