import axios from "axios";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import firebase from "firebase/app";
import "firebase/storage";
// helpers
import errorHandling from "./helpers/errorHandling";
// types
export const IMAGE_ACTION_ERROR = "IMAGE_ACTION_ERROR";
export const UPLOAD_STORY_IMG_STARTED = "UPLOAD_STORY_IMG_STARTED";
export const UPLOAD_STORY_IMG_FINISHED = "UPLOAD_STORY_IMG_FINISHED";
export const UPLOAD_AVATAR_IMG_STARTED = "UPLOAD_AVATAR_IMG_STARTED";
export const UPLOAD_AVATAR_IMG_FINISHED = "UPLOAD_AVATAR_IMG_FINISHED";
export const DELETE_IMG_FROM_STORY_STARTED = "DELETE_IMG_FROM_STORY_STARTED";
export const DELETE_IMG_FROM_STORY_FINISHED = "DELETE_IMG_FROM_STORY_FINISHED";

// firebase helpers
const listenToUploadProgress = (uploadTask, uploadToServer, history) => {
  // changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    snapshot => {
      // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");
    },
    error => {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;

        default:
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        // console.log("File available at", downloadURL);

        if (uploadToServer.type === "avatar") {
          postAvatarUrlToServer(uploadToServer, downloadURL, history);
        } else {
          postStoryUrlToServer(uploadToServer, downloadURL);
        }
      });
    }
  );
};

// image action errors
export const imageActionError = () => ({
  type: IMAGE_ACTION_ERROR
});

// upload image to story
const postStoryUrlToServer = async (uploadToServer, downloadURL) => {
  const { storyId, path, dispatch, history } = uploadToServer;

  const imgObj = { path, downloadURL };

  try {
    const res = await axios.post(`/api/story/image/${storyId}`, { imgObj });

    const { msg, payload } = res.data;

    dispatch(uploadStoryImage(payload.story));

    toastr.success("Success", msg);

    history.push(`/storyDetails/${storyId}`);
  } catch (err) {
    errorHandling(dispatch, err, "upload", "story image");
    dispatch(imageActionError());
  }
};

export const uploadStoryImage = update => ({
  type: UPLOAD_STORY_IMG_FINISHED,
  update
});

export const startUploadStoryImage = (file, storyId, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPLOAD_STORY_IMG_STARTED });

    const userId = getState().auth._id;

    const imageName = cuid();

    const path = `${userId}/story_images/${imageName}`;

    const storageRef = firebase.storage().ref(path);

    const uploadTask = storageRef.put(file);

    const uploadToServer = {
      dispatch,
      type: "story",
      path,
      storyId,
      history
    };

    listenToUploadProgress(uploadTask, uploadToServer);
  } catch (err) {
    errorHandling(dispatch, err, "upload", "story image");
    dispatch(imageActionError());
  }
};

// upload avatar image
export const uploadAvatarImage = update => ({
  type: UPLOAD_AVATAR_IMG_FINISHED,
  update
});

export const postAvatarUrlToServer = async (
  uploadToServer,
  downloadURL,
  history
) => {
  const { userId, dispatch } = uploadToServer;
  try {
    const res = await axios.post(`/api/profile/${userId}`, {
      profile: { avatar: downloadURL }
    });

    const { msg, payload } = res.data;

    dispatch(uploadAvatarImage(payload.profile));

    toastr.success("Success", msg);
    history.push(`/profile/${userId}`);
  } catch (err) {
    errorHandling(dispatch, err, "upload", "avatar");
    dispatch(imageActionError());
  }
};

export const startUploadAvatarImage = (file, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPLOAD_AVATAR_IMG_STARTED });
    const userId = getState().auth._id;

    const imageName = `avatar-${userId}`;

    const path = `${userId}/avatar/${imageName}`;

    const storageRef = firebase.storage().ref(path);

    const uploadTask = storageRef.put(file);

    const uploadToServer = {
      dispatch,
      type: "avatar",
      path,
      userId
    };

    listenToUploadProgress(uploadTask, uploadToServer, history);
  } catch (err) {
    errorHandling(dispatch, err, "upload", "avatar");
    dispatch(imageActionError());
  }
};

// delete image from story
export const deleteImageFromStory = update => ({
  type: DELETE_IMG_FROM_STORY_FINISHED,
  update
});

const deleteStoryUrlFromServer = async (dispatch, storyId, imageId) => {
  try {
    const res = await axios.delete(`/api/story/image/${storyId}/${imageId}`);

    const { msg, payload } = res.data;

    toastr.success("Success", msg);

    dispatch(deleteImageFromStory(payload.story));
  } catch (err) {
    errorHandling(dispatch, err, "delete", "story image");
    dispatch(imageActionError());
  }
};

export const startDeleteImageFromStory = imgObj => async dispatch => {
  try {
    dispatch({ type: DELETE_IMG_FROM_STORY_STARTED });
    const { path, storyId, _id: imageId } = imgObj;

    const storageRef = firebase.storage().ref(path);

    await storageRef.delete();

    deleteStoryUrlFromServer(dispatch, storyId, imageId);
  } catch (err) {
    errorHandling(dispatch, err, "delete", "story image");
    dispatch(imageActionError());
  }
};
