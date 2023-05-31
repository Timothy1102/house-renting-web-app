// This code validates user credentials, ensuring that they are in the correct format. 
// It also makes sure that the user has entered the required information, such as a valid email, username, and password.
// If the user has not entered the required information, the code will return an error message. 
// If the user has entered the required information but it is not in the correct format, the code will return an error message. 
// If the user has entered the required information and it is in the correct format, the code will proceed to the next step in the process.
const validateCredentials = (req, res, next) => {
    const { userName, email, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/api/v1/register") {
      if (![email, userName, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    } else if (req.path === "/api/v1/login") {
      if (![email, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }
  
    next();
};

module.exports = validateCredentials;
