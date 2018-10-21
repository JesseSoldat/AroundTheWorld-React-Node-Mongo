import axios from "axios";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import * as firebase from "firebase/app";
import "firebase/storage";
// helpers
import errorHandling from "./helpers/errorHandling";
// actions
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
// types
export const UPLOAD_STORY_IMG_STARTED = "UPLOAD_STORY_IMG_STARTED";
export const UPLOAD_STORY_IMG_FINISHED = "UPLOAD_STORY_IMG_STARTED";

export const uploadStoryImage = () => ({
  type: UPLOAD_STORY_IMG_FINISHED
});

const postUrlToServer = async (dispatch, imgObj, storyId) => {
  try {
    const res = await axios.post(`/api/uploadStoryImage/${storyId}`, {
      imgObj
    });

    const { msg, payload } = res.data;
    console.log(msg, payload);
  } catch (err) {
    errorHandling(dispatch, err, "upload", "story image");
  }
};

export const startUploadStoryImage = (file, storyId) => async (
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
          postUrlToServer(dispatch, { path, downloadURL }, storyId);
        });
      }
    );
  } catch (err) {
    errorHandling(dispatch, err, "upload", "story image");
  }
};
