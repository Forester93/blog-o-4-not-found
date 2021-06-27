function alert(text) {
  $("#alertMessage").text(text);
  $("#alertButton").trigger("click");
}

// const accountID = $("#userHeader").attr("user-id");
// console.log(userID);
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Entry relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteEntry = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let entryOb = JSON.parse(targetDeleteBtn.parent().parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/entries/${entryOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    $(event.target).parent().parent().remove();
    // location.reload();
  }
};

$(".deleteEntry").on("click", deleteEntry);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addEntry = async (event) => {
  event.preventDefault();
  const title = $("#entryTitle").val();
  const content = $("#entryContent").val();
  // Call this Backend Route with this method, but need to prevent null with if statement
  console.log({
    title,
    content,
    date: new Date().toString(),
  });
  if (title && content) {
    const response = await fetch(`/api/entries`, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        date: Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add entry!");
    } else {
      location.reload();
    }
  }
};

$("#entryModalFooter").on("click", "#addEntryBtn", addEntry);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var entryIdClicked;
const updateEntry = async (event) => {
  event.preventDefault();
  const title = $("#entryTitle").val();
  const content = $("#entryContent").val();
  const date = new Date().toString();
  // Call this Backend Route with this method
  const response = await fetch(`/api/entries/${entryIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
      date,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update entry!");
  }
  location.reload();
};

$("#entryModalFooter").on("click", "#updateEntryBtn", updateEntry);

// Functions to switch Add or Update Modal
const entryModalToUpdate = (event) => {
  let targetclicked = $(event.target);
  entryObjClicked = JSON.parse(targetclicked.parent().parent().attr("data"));
  entryIdClicked = entryObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#entryTitle").val(entryObjClicked.title);
  $("#entryContent").val(entryObjClicked.content);
  // Switch to Update Modal
  $("#entryModalTitle").text("Update Entry");
  $("#entryModalFooter")
    .children(0)
    .attr("id", "updateEntryBtn")
    .text("Update");
};

const entryModalToAdd = () => {
  // Clear out previous autocomplete
  $("#entryTitle").val("");
  $("#entryContent").val("");
  // Switch to Add Modal
  $("#entryModalTitle").text("Add Entry");
  $("#entryModalFooter")
    .children(0)
    .attr("id", "addEntryBtn")
    .text("Add Entry");
};

$(".editEntry").on("mouseover", entryModalToUpdate);
$(".editEntry").on("focus", entryModalToUpdate);
$(".editEntry").on("click", entryModalToUpdate);
$(".launchEntry").on("click", entryModalToAdd);
// $("#launchEntry").on("mouseover", entryModalToAdd);
// $("#launchEntry").on("focus", entryModalToAdd);

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

$(".addComment").on("click", addComment);
$(".commentSubmit").on("click", ".addComment", addComment);
$(".commentSubmit").on("submit", ".addComment", addComment);
