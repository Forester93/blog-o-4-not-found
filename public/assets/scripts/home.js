////////////////////////////// Adding Comments///////////////////

const addComment = async (event) => {
  event.preventDefault();
  let entryID = $(event.target).parent().parent().attr("entry_id");
  const comment = $(`#entry${entryID}Comment`).val();
  //   console.log({
  //     entryID,
  //     comment,
  //     date: new Date().toString(),
  //   });
  if (entryID && comment) {
    const response = await fetch(`/api/comments/new`, {
      method: "POST",
      body: JSON.stringify({
        entry_id: entryID,
        comment,
        date: Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert(
        "Failed to add comment! Check that you are signed in or that blog post exists."
      );
    } else {
      location.reload();
    }
  }
};

$(".commentSubmit").on("click", ".addComment", addComment);

////////////////////////////// Deleting Comments///////////////////

const deleteComment = async (event) => {
  event.preventDefault();

  let commentID = $(event.target).parent().attr("comment_id");
  if (commentID) {
    const response = await fetch(`/api/comments/${commentID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert(
        "Failed to delete comment! Check that you are either logged in, own the blog entry or own the comment."
      );
    } else {
      location.reload();
    }
  }
};

$(".deleteComment").on("click", deleteComment);
