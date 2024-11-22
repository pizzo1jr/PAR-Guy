const btnTpoEl = document.getElementById('btntpo');
// disables property hub and FCD
function disableButton() {
  document.getElementById('sellerNameMismatch').disabled = true;
  document.getElementById('propertyType').disabled = true;
  document.getElementById('lastDateOfSale').disabled = true;
  document.getElementById('phAdditinalNotes').disabled = true;
  document.getElementById('infoFcd').disabled = true;
  // leaves message for FCD 
  document.getElementById('infoFcd').value = "n/a for TPO";
  document.getElementById('phButton').disabled = true;

}
// enables disabled fields from above to be reset. 
function enableButton() {
  document.getElementById('sellerNameMismatch').disabled = false;
  document.getElementById('propertyType').disabled = false;
  document.getElementById('lastDateOfSale').disabled = false;
  document.getElementById('phAdditinalNotes').disabled = false;
  document.getElementById('infoFcd').disabled = false;
  // removes TPO message for FCD 
  document.getElementById('infoFcd').value = "";
  document.getElementById('phButton').disabled = false;
}

// selecting the correct state function
function selectBoxInfo() {
    var selectBox = document.getElementById('selectBox');
    var stateAl = document.getElementById('AL');
   if (selectBox.value == stateAl) {
     document.getElementById('infoOtp').placeholder = "buyer paid";
     document.getElementById('infoTransferTaxes').placeholder = "buyer paid";
       console.log("1 selected");
  } else {
    document.getElementById('infoOtp').placeholder = "";
   document.getElementById('infoTransferTaxes').placeholder = "";
   }
  }  



// FSBO screens 
// if FSBO yes, hide listing agent section. 
function fsboIsYes() {
  var fsboYes = document.getElementById('isLoanFsboYes');

  if (fsboYes = true) {
    document.getElementById('listingAgentYes').disabled = true;
    document.getElementById('listingAgentNo').disabled = true;
    console.log("yes clicked!");
  } 
}

// If FSBO no, do not hide listing agent section.
function fsboIsNo() {
  var fsboNo = document.getElementById('isLoanFsboNo');
  var listingAgentYes = document.getElementById("listingAgentYes");
  var listingAgentNo = document.getElementById('listingAgentNo');
  if (fsboNo = true) {
    listingAgentYes.disabled = false;
    listingAgentNo.disabled = false;
    ;
}
}



// this function deals with the purchase price info  copying from basic info to transfer taxes // 
function myFunctionPurchasePrice() {
  var basic = document.getElementById('infoPurchasePrice');
  var transfer = document.getElementById('ttPp');
  transfer.value = basic.value;
// if blank will reset to blank
  if (basic = "") {
    basic.reset();
  }
  else {
    transfer.value;
  }
}
// this function deals with document used info copying over to Transfer Taxes 
function documentReplica() {
  var basic = document.getElementById('infoDocumentUsed');
  var transfer = document.getElementById('ttDocumentUsed');
  transfer.value = basic.value;
  // if blank will reset to blank
  if (basic = "") {
    basic.reset();
  }
  else {
    transfer.value;
  }
}
  

// this function deals with transfer taxes copying from basic info over to Transfer taxes
function transferTaxSwap() {
  var basic = document.getElementById('infoTransferTaxes');
  var transfer = document.getElementById('ttWhoPaying');
  transfer.value = basic.value;
  // if blank will reset to blank
  if (basic = "") {
    basic.reset();
  }
  else {
    transfer.value;
  }
}


// copy and paste function
const allowedCopyElements = ["INPUT", "TEXTAREA"];

async function copy(formElementId) {
  var form = document.getElementById(formElementId);
  await copyToClipboard([form]);
}

async function copyAll() {
  var forms = document.querySelectorAll('#property-hub-form, #basic-info-form');
  await copyToClipboard([...forms]);
}

//async function copyAll() {
  //var forms = document.getElementsByTagName("form");
  //await copyToClipboard([...forms]);
//}

async function copyToClipboard(forms) {
  let formStringArray = [];
  for (let index = 0; index < forms.length; index++) {
    const result = convertFormToTextArray(forms[index]); // Ex: ['Property Hub', 'Seller Mismatch: ob9qb', 'Property Type: 2cma6h', 'Last Date of Sale: 2b43y', 'Additional Notes: s3q2j']
    if (result.length === 0) continue;

    if (index < forms.length - 1)
      result[result.length - 1] = `${result[result.length - 1]}\n`;
    const resultString = result.join("\n"); // Ex: Property Hub\nSeller Mismatch: ob9qb\nProperty Type: 2cma6h\nLast Date of Sale: 2b43y\nAdditional Notes: s3q2j\n
    formStringArray.push(resultString);
  }

  await writeToClipboard(formStringArray.join("\n"));
}

async function writeToClipboard(data) {
  try {
    await navigator.clipboard.writeText(data);
  } catch (error) {
    console.error("Could not write to clipboard", error);
  }
}

function convertFormToTextArray(form) {
  const output = [];
  const formElements = form.elements;
  for (let index = 0; index < formElements.length; index++) {
    const element = formElements[index];
    if (element.value && allowedCopyElements.includes(element.nodeName)) {
      const label = element.labels[0].textContent;
      output.push(`${label} ${element.value}`);
    }
  }
  if (output.length > 0) output.unshift(`${form.name}`);
  return output;
}

// delete functions added to DELETE ALL BUTTON 
function deleteBasicInfo() {
  var element = document.getElementById('basic-info-form' );
  element.reset()
};

function deleteTt() {
  var element = document.getElementById('transfer-taxes-form');
  element.reset()
};

function deletePropHub() {
  var element = document.getElementById('property-hub-form');
  element.reset()
};



// apply the remaining configs needed
const formConfig = {
  ["basicInfo"]: {
    formGroupId: "basic-info-form",
    submitButtonId: "basicInfoButton",
  },
};

const globalBtns = ['copyAllBtn']

init = () => {
  for (const key in formConfig) {
    if (Object.hasOwnProperty.call(formConfig, key)) {
      const formGroup = formConfig[key];
      const formGroupEl = document.getElementById(formGroup.formGroupId); // form group

      const inputNodeName = 'INPUT'
      // array of form group elements -> filtered by input -> filtered by required prop 
      const requiredControls = [...formGroupEl]
        .filter((el) => el.nodeName === inputNodeName)
        .filter((inputEl) => inputEl.required);

      applyValidatorEvents(requiredControls, formGroup);
    }
  }
};

applyValidatorEvents = (requiredControls, formGroup) => {
  requiredControls.forEach((control) => {
    const events = ['input'];
    events.forEach((event) => {
      addControlEventListener(control, event, formGroup);
    });
  });
}

addControlEventListener = (control, event, formGroup) => {
  control.addEventListener(event, () => {
    const formGroupEl = document.getElementById(formGroup.formGroupId);
    const submitButtonEl = document.getElementById(formGroup.submitButtonId);
    const isFormValid = formGroupEl.checkValidity();
    submitButtonEl.disabled = !isFormValid;

    globalBtns.forEach((x) => {
      const btn = document.getElementById(x);
      btn.disabled = !isFormValid;
    }) 
  });
}

setTimeout(() => {
  init();
}, 100);

// fsboIsYes();
// fsboIsNo();