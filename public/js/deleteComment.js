$(".delete-comment-button").click(async function (event) {
  event.preventDefault();
  const res = await fetch(`/api/comments/${$(e.target).data("id")}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  // if the comment has been deleted successfully reload the page
  if (res.ok) {
    document.location.reload();
  }
});
