const getUrls = (key, params = []) => {
  const linkUrls = {
    Login: "/login",
    Register: "/register",
    MapIt: "/map",
    Stories: "/storyList"
  };

  return linkUrls[key];
};

const getLinkUrls = (key, params) => {
  const formattedKey = key.split(" ").join("");
  return getUrls(formattedKey, params);
};

export default getLinkUrls;
