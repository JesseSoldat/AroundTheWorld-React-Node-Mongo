// Match other users based on distance between your story and theirs
const convertToRadiansFromMilesOrKm = ({ unit, maxDistance }) => {
  // meters for GeoJSON
  // radians for coordinate pairs.
  const distance = Number(maxDistance);
  // radians = distance / earth radius
  if (unit === "miles") {
    // mi radians = distance in mi / 3959
    return distance / 3959;
  }
  // km radians = distance in km / 6371
  return distance / 6371;
};

module.exports = convertToRadiansFromMilesOrKm;
