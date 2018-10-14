const linkUrls = {
  Login: "/login",
  Register: "/register"
};

const getLinkUrls = key => {
  const formattedKey = key.split(" ").join("");
  return linkUrls[formattedKey];
};

export default getLinkUrls;
