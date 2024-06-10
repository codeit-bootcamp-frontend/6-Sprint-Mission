const validateEmailAddress = (email: string) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailRegex.test(email) || email === "") {
      return false;
    } else {
      return true;
    }
  };
  
  const validatePassword = (password: string) => {
    if (password === "") {
      return false;
    } else if (password.length < 8) {
      return false;
    } else {
      return true;
    }
  };
  
  const validateNickName = (nickName: string) => {
    if (nickName === "") {
      return false;
    } else {
      return true;
    }
  };
  
  const validatePasswordTwice = (password: string, passwordCheck: string) => {
    if (password !== passwordCheck) {
      return false;
    } else {
      return true;
    }
  };
  
  export {
    validateEmailAddress,
    validatePassword,
    validatePasswordTwice,
    validateNickName,
  };