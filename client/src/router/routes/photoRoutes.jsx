import React from "react";

import PrivateRoute from "../PrivateRoute";
import PhotoUploadPage from "../../pages/imageUpload/PhotoUploadPage";

const PhotoRoutes = [
  <PrivateRoute
    key="uploadPhotos"
    path="/uploadPhotos"
    component={PhotoUploadPage}
    exact
  />
];

export default PhotoRoutes;
