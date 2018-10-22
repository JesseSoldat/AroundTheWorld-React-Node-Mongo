import axios from "axios";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import * as firebase from "firebase/app";
import "firebase/storage";
// helpers
import errorHandling from "./helpers/errorHandling";
// types
export const IMAGE_ACTION_ERROR = "IMAGE_ACTION_ERROR";
export const UPLOAD_STORY_IMG_STARTED = "UPLOAD_STORY_IMG_STARTED";
export const UPLOAD_STORY_IMG_FINISHED = "UPLOAD_STORY_IMG_FINISHED";
export const DELETE_IMG_FROM_STORY_STARTED = "DELETE_IMG_FROM_STORY_STARTED";
export const DELETE_IMG_FROM_STORY_FINISHED = "DELETE_IMG_FROM_STORY_FINISHED";

// upload image to story
export const uploadStoryImage = update => ({
  type: UPLOAD_STORY_IMG_FINISHED,
  update
});

const postUrlToServer = async (dispatch, history, imgObj, storyId) => {
  try {
    const res = await axios.post(`/api/story/image/${storyId}`, {
      imgObj
    });

    const { msg, payload } = res.data;

    dispatch(uploadStoryImage(payload.story));

    toastr.success("Success", msg);

    history.push(`/storyDetails/${storyId}`);
  } catch (err) {
    dispatch({ type: IMAGE_ACTION_ERROR });
    errorHandling(dispatch, err, "upload", "story image");
  }
};

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

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
          console.log("File available at", downloadURL);
          postUrlToServer(dispatch, history, { path, downloadURL }, storyId);
        });
      }
    );
  } catch (err) {
    errorHandling(dispatch, err, "upload", "story image");
  }
};

// delete image from story
export const deleteImageFromStory = update => ({
  type: DELETE_IMG_FROM_STORY_FINISHED,
  update
});

const deleteUrlFromServer = async (dispatch, storyId, imageId) => {
  try {
    const res = await axios.delete(`/api/story/image/${storyId}/${imageId}`);

    const { msg, payload } = res.data;

    toastr.success("Success", msg);

    dispatch(deleteImageFromStory(payload.story));
  } catch (err) {
    errorHandling(dispatch, err, "delete", "story image");
  }
};

export const startDeleteImageFromStory = imgObj => async dispatch => {
  try {
    dispatch({ type: DELETE_IMG_FROM_STORY_STARTED });
    const { path, storyId, _id: imageId } = imgObj;

    const storageRef = firebase.storage().ref(path);

    await storageRef.delete();

    deleteUrlFromServer(dispatch, storyId, imageId);
  } catch (err) {
    errorHandling(dispatch, err, "delete", "story image");
  }
};
