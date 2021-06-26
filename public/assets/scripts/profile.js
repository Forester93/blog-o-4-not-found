function alert(text) {
  $("#alertMessage").text(text);
  $("#alertButton").trigger("click");
}

// const accountID = $("#userHeader").attr("user-id");
// console.log(userID);
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Beneficiary relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
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
const addBeneficiary = async (event) => {
  event.preventDefault();
  const name = $("#beneficiaryName").val();
  const address = $("#beneficiaryAddress").val();
  const relationship = $("#beneficiaryRelationship").val();
  const DOB = $("#beneficiaryDOB").val();
  const isChild = $("#beneficiaryIsChild").prop("checked");
  const isCharity = $("#beneficiaryIsCharity").prop("checked");
  const guardian_address = $("#beneficiaryGuardianAddress").val();
  const guardian_name = $("#beneficiaryGuardianName").val();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if (name && address) {
    const response = await fetch(`/api/beneficiary`, {
      method: "POST",
      body: JSON.stringify({
        name,
        address,
        relationship,
        DOB,
        isChild,
        isCharity,
        guardian_address,
        guardian_name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    } else {
      location.reload();
    }
  }
};

$("#beneficiaryModalFooter").on("click", "#addBeneficiaryBtn", addBeneficiary);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var beneficiaryIdClicked;
const updateBeneficiary = async (event) => {
  event.preventDefault();
  const name = $("#beneficiaryName").val();
  const address = $("#beneficiaryAddress").val();
  const relationship = $("#beneficiaryRelationship").val();
  const DOB = $("#beneficiaryDOB").val();
  const isChild = $("#beneficiaryIsChild").prop("checked");
  const isCharity = $("#beneficiaryIsCharity").attr("checked");
  const guardian_address = $("#beneficiaryGuardianAddress").val();
  const guardian_name = $("#beneficiaryGuardianName").val();
  // Call this Backend Route with this method
  const response = await fetch(`/api/beneficiary/${beneficiaryIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      address,
      relationship,
      DOB,
      isChild,
      isCharity,
      guardian_address,
      guardian_name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};
$("#beneficiaryModalFooter").on(
  "click",
  "#updateBeneficiaryBtn",
  updateBeneficiary
);

// Functions to switch Add or Update Modal
const beneficiaryModalToUpdate = (event) => {
  // We need to get the target beneficiary id for update with this click
  let targetclicked = $(event.target);
  beneficiaryObjClicked = JSON.parse(targetclicked.attr("data"));
  beneficiaryIdClicked = beneficiaryObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#beneficiaryName").val(beneficiaryObjClicked.name);
  $("#beneficiaryAddress").val(beneficiaryObjClicked.address);
  $("#beneficiaryDOB").val(beneficiaryObjClicked.DOB);
  $("#beneficiaryIsChild").attr("checked", beneficiaryObjClicked.isChild);
  $("#beneficiaryIsCharity").attr("checked", beneficiaryObjClicked.isCharity);
  $("#beneficiaryRelationship").val(beneficiaryObjClicked.relationship);
  $("#beneficiaryGuardianName").val(beneficiaryObjClicked.guardian_name);
  $("#beneficiaryGuardianAddress").val(beneficiaryObjClicked.guardian_address);
  // Switch to Update Modal
  $("#beneficiaryModalTitle").text("Update Beneficiary");
  $("#beneficiaryModalFooter")
    .children(0)
    .attr("id", "updateBeneficiaryBtn")
    .text("Update");
};

const beneficiaryModalToAdd = () => {
  // Clear out previous autocomplete
  $("#beneficiaryName").val("");
  $("#beneficiaryAddress").val("");
  $("#beneficiaryDOB").val("");
  $("#beneficiaryIsChild").attr("checked", false);
  $("#beneficiaryIsCharity").attr("checked", false);
  $("beneficiaryRelationship").val("");
  $("#beneficiaryGuardianName").val("");
  $("#beneficiaryGuardianAddress").val("");
  // Switch to Add Modal
  $("#beneficiaryModalTitle").text("Add Beneficiary");
  $("#beneficiaryModalFooter")
    .children(0)
    .attr("id", "addBeneficiaryBtn")
    .text("Add");
};

$(".beneficiaryBtn").on("mouseover", beneficiaryModalToUpdate);
$(".beneficiaryBtn").on("focus", beneficiaryModalToUpdate);
$(".beneficiaryBtn").on("click", beneficiaryModalToUpdate);
$("#launchBeneficiary").on("click", beneficiaryModalToAdd);
$(".launchBeneficiary").on("mouseover", beneficiaryModalToAdd);
$(".launchBeneficiary").on("focus", beneficiaryModalToAdd);
