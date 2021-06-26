function alert(text) {
  $("#alertMessage").text(text);
  $("#alertButton").trigger("click");
}

const logout = async () => {
  const response = await fetch("/api/accounts/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Successfully Logged Out");
    document.location.replace("/home");
  } else {
    alert(response.statusText);
  }
};

let idleTimer = function () {
  let time;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onmousedown = resetTimer;
  document.onkeypress = resetTimer;
  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 60000);
  }
};

idleTimer();

document.querySelector("#logout").addEventListener("click", logout);
