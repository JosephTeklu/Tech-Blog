$(".update-comment-button").click(async function (event) {
  event.preventDefault();

  // grab the new title, body, and blog id
  const title = $("#blog-title").val();
  const body = $("#blog-body").val();
  const id = $(event.target).data("id");

  const res = await fetch(`/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({ body, title }),
    headers: { "Content-Type": "application/json" },
  });

  // if the blog has been successfullt updated change viewpage
  if (res.ok) {
    document.location.replace("/");
  }
});
