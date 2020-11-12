const stripBearerToken = (token) => {
  let stripedToken = token;
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    const [, jwtToken] = token.split(" ");
    stripedToken = jwtToken;
  }
  return stripedToken;
};

export default stripBearerToken;
