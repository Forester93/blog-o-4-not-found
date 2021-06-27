////////////////////////////// Adding Comments///////////////////

const addComment = async (event) => {
  event.preventDefault();
  alert("hi");
  let entryID = $(event.target).parent().parent().attr("entry_id");
  const comment = $(`#entry${entryID}Comment`).val();
  console.log({
    entryID,
    comment,
    date: new Date().toString(),
  });
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
