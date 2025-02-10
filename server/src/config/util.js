const getUserToken = (req) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null; // No token found
    }
  
    // Extract the token
    const token = authHeader.split(' ')[1];
    return token;
  };
  
  const util = {
    getUserToken,
  };
  
  module.exports = util;
  