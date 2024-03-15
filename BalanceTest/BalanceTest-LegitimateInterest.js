function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Define the title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold"); 
    doc.text('Legal Basis', 20, 30);

    // Check if all required fields are filled in
    if (!formIsValid()) {
        alert('Please fill in all required fields (marked with red asterik).');
        return; // Stop the PDF generation
     }
    //Selected Legal Bases
    doc.setFontSize(12);
    doc.text('Legal Basis Selected', 20, 45);
    // Define the question
    doc.setFont(undefined, "normal"); 
    doc.setFontSize(10);
    
    
    // Retrieve the value of the selected item for Legal Basis
    const legalBasesSelection = document.getElementById('legalBasesselection');
    let selectedValueLegalBasis = legalBasesSelection.value;
    // Text before the variable, in normal font
    doc.setFont(undefined, "normal");
    doc.text("The selected legal basis is:", 20, 52);  

    // Change the font to bold for the variable part
    doc.setFont(undefined, "bold");
    doc.text(selectedValueLegalBasis, doc.getTextWidth("The selected legal basis is:") + 18, 52);

    
   
   // const legalBases = document.getElementById('legalBasescanOrcannot').value;
    //const text = `Based on the balancing test, legitimate interests ${legalBases} as the lawful basis for processing the types of personal data referred to above.`;

   // doc.text(text, 10, 10);
    doc.save('BalanceTest.pdf');
}

function formIsValid() {
    // List all required question names or IDs for <select> elements
    const requiredQuestions = [
      'legalBases'
    ];

    // Check each required question to ensure a selection has been made
    for (let i = 0; i < requiredQuestions.length; i++) {
            // Use `select` instead of `input` and check for value directly
        const element = document.getElementById(requiredQuestions[i] + 'selection');
        if (!element || element.value === "") {
            return false; // If a required question has no selection made, return false
        }
    }

    const legitimateInterestsTextArea = [
        'categoriesOfPersonalData',
        'purposeOfPersonalData',
        'storeOfPersonalData',
        'appropriatedBasis',
        'legalInterest',
        'clearInterest',
        'genuineInterest',
        'basicRequirements',
        'lessIntrusive',
        'impactOfProcessing',
        'additionalSafeguards',
        'informingDataSubjects'
      ];

      const requiredFields = [
        'categoriesOfPersonalData',
        'purposeOfPersonalData',
        'storeOfPersonalData',
        'appropriatedBasis',
        'legalInterest',
        'clearInterest',
        'genuineInterest',
        'basicRequirements',
        'lessIntrusive',
        'impactOfProcessing',
        'additionalSafeguards',
        'informingDataSubjects'
    ];
    
    let isValid = true; // Assume form is valid initially
    const errorMessage = "This field is required"; // Generic error message

    // Validation logic
    if(document.getElementById('legalBasesselection').value == 'Legitimate Interest') { 
        for (let j = 0; j < legitimateInterestsTextArea.length; j++){
            const elementId = legitimateInterestsTextArea[j];
            const element = document.getElementById(elementId);
            if (!element || element.value.trim() === ""){
                isValid = false; // Form is not valid
                element.style.borderColor = 'red'; // Highlight in red

                // Add or update an error message
                let errorDiv = document.getElementById(elementId + '-error');
                if (!errorDiv) {
                    errorDiv = document.createElement('div');
                    errorDiv.id = elementId + '-error';
                    element.parentNode.insertBefore(errorDiv, element.nextSibling);
                }
                errorDiv.textContent = errorMessage;
                errorDiv.style.color = 'red'; // Make the error message stand out

                // Optionally, break here if you want to only show the first error
                // break;
            }
        }
    }
    
    // If the code reaches this point, all required questions have a selection made
    return isValid;
  }


//   if(document.getElementById('legalBasesselection').value == 'Legitimate Interest') { 
//     // Retrieve the value of the selected item for Legal Basis    
//         for (let j =0; j < legitimateInterestsTextArea.length; j++){
//             const balanceTestElement = document.getElementById(legitimateInterestsTextArea[j]);
//             if (!balanceTestElement || balanceTestElement.value.trim() === ""){
//                 return false;
//             }
//         }

//     var legitimateInterestYesChecked = document.getElementById('legitimateInterestYes').checked;
//     var legitimateInterestNoChecked = document.getElementById('legitimateInterestNo').checked;

//     if (!(legitimateInterestYesChecked || legitimateInterestNoChecked)) {
//         return false; // Prevent form submission
//     }

//     var allRequirementsMetYesChecked = document.getElementById('allRequirementsMetYes').checked;
//     var allRequirementsMetNoChecked = document.getElementById('allRequirementsMetNo').checked;

//     if (!(allRequirementsMetYesChecked || allRequirementsMetNoChecked)) {
//         return false; // Prevent form submission
//     }

//     var achieveLessIntrusiveYesChecked = document.getElementById('achieveLessIntrusiveYes').checked;
//     var achieveLessIntrusiveNoChecked = document.getElementById('achieveLessIntrusiveNo').checked;
//     if (!(achieveLessIntrusiveNoChecked || achieveLessIntrusiveYesChecked)) {
//         return false;
//     }

//     var rightsAndInterestYesChecked = document.getElementById('rightsAndInterestYes').checked;
//     var rightsAndInterestNoChecked = document.getElementById('rightsAndInterestNo').checked;
//     if (!(rightsAndInterestYesChecked || rightsAndInterestNoChecked)){
//         return false;
//     }

//     var place = document.getElementById('place').value.trim();
//     var date = document.getElementById('date').value.trim();
//     var person = document.getElementById('person').value.trim();
//     var placeDpo = document.getElementById('placeDpo').value.trim();
//     var dateDpo = document.getElementById('dateDpo').value.trim();
//     var dpo = document.getElementById('dpo').value.trim();
//     var legalBases = document.getElementById('legalBasescanOrcannot').value;

//     if(!place || !date || !person || !placeDpo || !dateDpo || !dpo || legalBases === ''){
//         return false;
//     }

// } 
  