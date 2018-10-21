import React from "react";

import PrivateRoute from "../PrivateRoute";
import PhotoUploadPage from "../../pages/imageUpload/PhotoUploadPage";

const PhotoRoutes = [
  <PrivateRoute
    key="uploadPhotos/:storyId"
    path="/uploadPhotos/:storyId"
    component={PhotoUploadPage}
    exact
  />
];

export default PhotoRoutes;
