$(".logout-button").click(async function (event) {
  event.preventDefault();

  //make api call to logout user
  const res = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // if the response returns as ok change the viewpage
  if (res.ok) {
    document.location.replace("/");
  }
});
