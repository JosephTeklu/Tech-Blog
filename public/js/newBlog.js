$(".new-blog-button").click(async function (event) {
  event.preventDefault();

  // grab the new blog from field
  const body = $("#new-blog-form").val();
  const title = $("#new-blog-title").val();

  // if the body and title of blog are not empty
  if (body && title) {
    // make api call to add the new blog
    const res = await fetch("/api/blog/", {
      method: "POST",
      body: JSON.stringify({ body, title }),
      headers: { "Content-Type": "application/json" },
    });
    // if the blog is added successfully replace the homepage
    if (res.ok) {
      document.location.reaplace("/");
    }
  } else {
    alert("Blog body or title cannot be empty.");
  }
});
