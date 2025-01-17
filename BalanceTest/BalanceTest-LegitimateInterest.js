// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Attach an event listener to the input element with an onclick attribute of "generatePDF()"
  document.querySelector('input[onclick="generatePDF()"]').addEventListener('click', generatePDF);
});

// Main function to generate the PDF document
function generatePDF() {
  const { jsPDF } = window.jspdf; // Access the jsPDF object from the jspdf library
  const doc = new jsPDF(); // Create a new jsPDF instance

  const lineHeight = 10; // Define the line height for text in mm
  const maxWidth = 170; // Set the maximum width for text in mm
  let y = 20; // Initial vertical position in the document

  // Add page number to the first page
  addPageNumber(doc); // Call a helper function to add page numbers

  // Helper function to add text to the document and handle pagination
  function addTextWithPagination(text, x = 20) {
    const splitText = doc.splitTextToSize(text, maxWidth); // Split text to fit within the maximum width
    splitText.forEach(line => {
      if (y + lineHeight > 280) { // Check if the text overflows the current page
        doc.addPage(); // Add a new page
        y = 20; // Reset vertical position for the new page
        addPageNumber(doc); // Add page number to the new page
      }
      doc.text(line, x, y); // Add the text line to the document
      y += lineHeight; // Increment the vertical position
    });
  }

  // Helper function to add labeled fields with pagination
  function addFieldWithPagination(label, value, x = 20) {
    addTextWithPagination(`${label}: ${value}`, x);
  }

  // Validate the form to ensure all required fields are filled
  if (!formIsValid()) {
    alert('Please fill in all required fields (marked with red asterisks).');
    return; // Stop the PDF generation if validation fails
  }

  // Add the title to the document
  doc.setFontSize(16); // Set font size for the title
  doc.setFont(undefined, "bold"); // Set font style to bold
  doc.text('Legal Basis', 20, y); // Add title text
  y += lineHeight; // Increment vertical position

  // Add selected Legal Bases
  doc.setFontSize(12); // Reset font size
  doc.setFont(undefined, "normal"); // Reset font style to normal
  const legalBasesSelection = document.getElementById('legalBases').value; // Get the value of the selected legal basis
  addTextWithPagination(`The selected legal basis is: ${legalBasesSelection}`);
  y += lineHeight;

  // Add specific content if "Legitimate Interest" is selected
  if (legalBasesSelection === 'Legitimate Interest') {
    // Add introductory text for Legitimate Interest
    addTextWithPagination(['BALANCING TEST: THE DATA CONTROLLER’S LEGITIMATE INTERESTS AS A LEGAL',
      'BASIS FOR PROCESSING PERSONAL DATA'].join(' '));
    addTextWithPagination('The EU’s General Data Protection Regulation (GDPR, EU 2016/679)');

    const introductoryText = 'The lawful basis for processing personal data may be the legitimate interests of the data controller or a third party. ' +
      'If you choose to rely on legitimate interests, you are taking on extra responsibility for considering and protecting the rights and ' +
      'freedoms of the individuals whose data you are processing. Interests are more likely to be legitimate when there is a relevant and ' +
      'appropriate relationship between the data controller and the individuals who can be, for example, customers, students or employees. ' +
      'The data controller must carry out a balancing test to ensure that individuals’ rights and interests do not override the data controller’s legitimate interests to process their data.';
    addTextWithPagination(introductoryText);
    y += lineHeight;

    // Add "Description of processing" section
    doc.setFont(undefined, 'bold');
    addTextWithPagination('Description of processing');
    doc.setFont(undefined, 'normal');
    addTextWithPagination('List the categories and types of personal data that you will process:');

    // Add user-provided details for this section
    const textValueCategoriesOfPersonalData = document.getElementById('categoriesOfPersonalData').value;
    addTextWithPagination(textValueCategoriesOfPersonalData);
    y += lineHeight;

    addTextWithPagination('Purpose/purposes of processing personal data:');
    const textValuePurposeOfPersonalData = document.getElementById('purposeOfPersonalData').value;
    addTextWithPagination(textValuePurposeOfPersonalData);
    y += lineHeight;

    addTextWithPagination(['Where will personal data be stored (system/records)? Who will process personal data?',
      'Provide the name or other identifier of a possible research project.'].join(' '));
    const textValueOfStoreOfPersonalData = document.getElementById('storeOfPersonalData').value;
    addTextWithPagination(textValueOfStoreOfPersonalData);
    y += lineHeight;

    addTextWithPagination('Other information (for example, will you be processing personal data relating to children?).');
    const textValueOtherInformation = document.getElementById('otherInformation').value;
    addTextWithPagination(textValueOtherInformation);
    y += lineHeight;

    // Add "Balancing Test" section
    doc.setFont(undefined, 'bold');
    addTextWithPagination('Balancing Test');
    doc.setFont(undefined, 'normal');
    addTextWithPagination('Is legitimate interests the most appropriate basis for processing personal data?');
    y += lineHeight;

    // Include details based on user input for the balancing test
    if (document.getElementById('legitimateInterestYes').checked) {
      addTextWithPagination('Yes');
      const textValueAppropriatedBasis = document.getElementById('appropriatedBasis').value;
      addFieldWithPagination('Appropriated Basis', textValueAppropriatedBasis);

      const textValueLegalInterest = document.getElementById('legalInterest').value;
      addFieldWithPagination('Legal Interest', textValueLegalInterest);

      const textValueClearInterest = document.getElementById('clearInterest').value;
      addFieldWithPagination('Clear Interest', textValueClearInterest);

      const textValueGenuineInterest = document.getElementById('genuineInterest').value;
      addFieldWithPagination('Genuine Interest', textValueGenuineInterest);

      if (document.getElementById('allRequirementsMetYes').checked) {
        const textValueLessIntrusive = document.getElementById('lessIntrusive').value;
        addFieldWithPagination('Less Intrusive', textValueLessIntrusive);

        if (document.getElementById('achieveLessIntrusiveNo').checked) {
          const textValueImpactOfProcessing = document.getElementById('impactOfProcessing').value;
          addFieldWithPagination('Impact of Processing', textValueImpactOfProcessing);

          if (document.getElementById('rightsAndInterestYes').checked) {
            const textValueAdditionalSafeguards = document.getElementById('additionalSafeguards').value;
            addFieldWithPagination('Additional Safeguards', textValueAdditionalSafeguards);
          }
        }
      }
    }

    // Summarize the balancing test result
    const legalBasescanOrcannotValue = document.getElementById('legalBasescanOrcannot').value;
    addFieldWithPagination('Based on the balancing test, legitimate interests', legalBasescanOrcannotValue);

    // Add form fields for final details
    const place = document.getElementById('place').value;
    const date = document.getElementById('date').value;
    const person = document.getElementById('person').value;
    const placeDpo = document.getElementById('placeDpo').value;
    const dateDpo = document.getElementById('dateDpo').value;
    const dpo = document.getElementById('dpo').value;

    // Include the captured fields in the document
    addFieldWithPagination('Place', place);
    addFieldWithPagination('Date', date);
    addFieldWithPagination('Person who conducted the balancing test', person);
    addFieldWithPagination('Place (DPO)', placeDpo);
    addFieldWithPagination('Date (DPO)', dateDpo);
    addFieldWithPagination('Data Protection Officer', dpo);
  }

  // Save the PDF document
  doc.save('BalanceTest.pdf');
}

// Function to add a page number to the current page
function addPageNumber(doc) {
  const pageCount = doc.internal.getNumberOfPages(); // Get the current page count
  doc.setFontSize(10); // Set font size for the page number
  doc.text(`Page ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10); // Add page number
}

// Function to validate the form inputs
function formIsValid() {
  const requiredFields = [
    'legalBases',
    'categoriesOfPersonalData',
    'purposeOfPersonalData',
    'storeOfPersonalData',
    'informingDataSubjects',
    'place',
    'date',
    'person',
    'placeDpo',
    'dateDpo',
    'dpo'
  ];

  let valid = true; // Initialize the validation state

  // Check if required fields are filled
  requiredFields.forEach(id => {
    const element = document.getElementById(id);
    if (element && element.offsetParent !== null && element.value.trim() === '') {
        valid = false;
    }
  });

  // Additional validation for "Legitimate Interest"
  if (document.getElementById('legalBases').value === 'Legitimate Interest') {
    const legitimateInterestFields = [
      'appropriatedBasis',
      'legalInterest',
      'clearInterest',
      'genuineInterest',
      'lessIntrusive',
      'impactOfProcessing',
      'additionalSafeguards'
    ];

    legitimateInterestFields.forEach(id => {
      const element = document.getElementById(id);
      if (element && element.offsetParent !== null && element.value.trim() === '') {
          valid = false;
      }
    });

    // Validate radio button selections
    if (!document.getElementById('legitimateInterestYes').checked && !document.getElementById('legitimateInterestNo').checked) {
      valid = false;
    }

    if (document.getElementById('legitimateInterestYes').checked) {
      if (!document.getElementById('allRequirementsMetYes').checked && !document.getElementById('allRequirementsMetNo').checked) {
        valid = false;
      }

      if (document.getElementById('allRequirementsMetYes').checked) {
        if (!document.getElementById('achieveLessIntrusiveYes').checked && !document.getElementById('achieveLessIntrusiveNo').checked) {
          valid = false;
        }

        if (document.getElementById('achieveLessIntrusiveNo').checked) {
          if (!document.getElementById('rightsAndInterestYes').checked && !document.getElementById('rightsAndInterestNo').checked) {
            valid = false;
          }
        }
      }
    }

    if (!document.getElementById('legalBasescanOrcannot').value) {
      valid = false;
    }
  }

  return valid;
}

// Function to toggle the visibility of sections based on user inputs
function legitimateInterestToggle() {
  const legitimateInterestToggleChecked = document.getElementById('legitimateInterestYes').checked;
  const legitimateInterest = document.getElementById('balancingTestSection2');
  legitimateInterest.style.display = legitimateInterestToggleChecked ? 'block' : 'none';
}

function toggleSection3() {
  const RequirementsMetChecked = document.getElementById('allRequirementsMetYes').checked;
  const lessIntrusiveSection = document.getElementById('lessIntrusiveSection');
  lessIntrusiveSection.style.display = RequirementsMetChecked ? 'block' : 'none';
}

function toggleSection4() {
  const achieveLessIntrusiveChecked = document.getElementById('achieveLessIntrusiveNo').checked;
  const impactOfProcessingSection = document.getElementById('impactOfProcessingSection');
  impactOfProcessingSection.style.display = achieveLessIntrusiveChecked ? 'block' : 'none';
}

function toggleSection5() {
  const rightsAndInterestYesRadio = document.getElementById('rightsAndInterestYes').checked;
  const additionalSafeguardsSection = document.getElementById('additionalSafeguardsSection');
  additionalSafeguardsSection.style.display = rightsAndInterestYesRadio ? 'block' : 'none';
}
