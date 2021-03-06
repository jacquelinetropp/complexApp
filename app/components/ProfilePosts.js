import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import Post from "./Post";

const ProfilePosts = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {
          cancelToken: ourRequest.token,
        });
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("there was a problem");
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    };
  }, [username]);
  if (isLoading)
    return (
      <div>
        <LoadingIcon />
      </div>
    );
  return (
    <div className="list-group">
      {posts.map((post) => {
        return <Post post={post} key={post._id} noAuthor={true} />;
      })}
    </div>
  );
};

export default ProfilePosts;
