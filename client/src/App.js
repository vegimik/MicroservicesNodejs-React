import React, { useState , useRef} from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  const [refreshListData, setRefreshListData]=useState(false)
  
  const child = useRef()

  const handleOnClick = () => {
    console.log(child.current);
    if (child.current) {
      child.current.foo()
    }
  }

  function refresh(){
    console.log('Refresh is being executed');
    handleOnClick()
    //PostList.refreshFromList()
  }


  

  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate refresh={refresh}/>
      <hr />
      <h1>Posts</h1>
      <PostList  ref={child} />
    </div>
  );
};
export default App;
