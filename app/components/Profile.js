import React, { useEffect, useContext, useState } from "react";
import { autoComplete, useParams } from "react-router-dom";

import Axios from "axios";
import StateContext from "../StateContext";

import Page from "./Page";
import ProfilePosts from "./ProfilePosts";

const Profile = (props) => {
  const appSate = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: {
      postCount: "",
      follwerCount: "",
      follwingCount: "",
    },
  });

  const { username } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.post(
          `/profile/${username}`,
          {
            token: appSate.user.token,
          },
          { cancelToken: ourRequest.token }
        );
        setProfileData(response.data);
      } catch (e) {
        console.log("there was a problem");
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);
  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} />{" "}
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.follwerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.follwingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  );
};

export default Profile;
