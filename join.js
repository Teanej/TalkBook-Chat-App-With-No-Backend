function join() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
}
