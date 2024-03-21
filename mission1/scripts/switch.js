let flag = false;
function toggleSwitch() {
  const passIcon = document.getElementById("passIcon");
  const switchElement = document.getElementById("password");
  const passBox = document.getElementById("shown");
  flag = !flag;
  if (flag) {
    passIcon.src = "/icon/openPassword.png";
    return (passBox.type = "text");
  }
  passIcon.src = "/icon/hidePassword.png";
  return (passBox.type = "password");
}

