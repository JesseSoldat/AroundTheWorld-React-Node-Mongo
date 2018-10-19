const linkUrls = {
  Login: "/login",
  Register: "/register",
  MapIt: "/map",
  Stories: "/storyList"
};

const getLinkUrls = key => {
  const formattedKey = key.split(" ").join("");
  return linkUrls[formattedKey];
};

export default getLinkUrls;
