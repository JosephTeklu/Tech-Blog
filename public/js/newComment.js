$(".new-comment-button").click(async function (event) {
  event.preventDefault();

  // grab the new comment from field
  const body = $("#new-blog-form").val();
  // check if current luser is logged in
  const login = await fetch("/api/user/logincheck", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  //   if the user is not logged in redirect them to login
  if (!login) {
    document.location.replace("/login");
  }

  // if the body of the comment is not empty and if the user is logged in
  if (newBlog && login) {
    // make api call to add the new blog
    const res = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ body }),
      headers: { "Content-Type": "application/json" },
    });
    // if the blog is added successfully reload the page
    if (res.ok) {
      document.location.reload();
    }
  } else {
    alert("Cannot post empty comment.");
  }
});
