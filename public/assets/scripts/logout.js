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

document.querySelector("#logout").addEventListener("click", logout);
