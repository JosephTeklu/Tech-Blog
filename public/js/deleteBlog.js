$(".delete-blog-button").click(async function (event) {
  event.preventDefault();
  const res = await fetch(`/api/blog/${$(e.target).data("id")}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  // if the blog has been deleted successfully reload the page
  if (res.ok) {
    document.location.reload();
  }
});
