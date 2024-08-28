document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('input[onclick="generatePDF()"]').addEventListener('click', generatePDF);
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const lineHeight = 10;
  const maxWidth = 170; // Maximum width for text in mm
  let y = 20;

  // Add page number to the first page
  addPageNumber(doc);  // This will add the page number on the first page

  // Define a function to add text and handle pagination
  function addTextWithPagination(text, x = 20) {
    const splitText = doc.splitTextToSize(text, maxWidth);
    splitText.forEach(line => {
      if (y + lineHeight > 280) { // Add a new page if the current one is full
        doc.addPage();
        y = 20;
        addPageNumber(doc);
      }
      doc.text(line, x, y);
      y += lineHeight;
    });
  }

  function addFieldWithPagination(label, value, x = 20) {
    addTextWithPagination(`${label}: ${value}`, x);
  }

  // Check if all required fields are filled in
  if (!formIsValid()) {
    alert('Please fill in all required fields (marked with red asterisks).');
    return; // Stop the PDF generation
  }

  // Add title
  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text('Legal Basis', 20, y);
  y += lineHeight;

  // Add selected Legal Bases
  doc.setFontSize(12);
  doc.setFont(undefined, "normal");
  const legalBasesSelection = document.getElementById('legalBases').value;
  addTextWithPagination(`The selected legal basis is: ${legalBasesSelection}`);
  y += lineHeight;

  if (legalBasesSelection === 'Legitimate Interest') {
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

    doc.setFont(undefined, 'bold');
    addTextWithPagination('Description of processing');
    doc.setFont(undefined, 'normal');
    addTextWithPagination('List the categories and types of personal data that you will process:');

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

    doc.setFont(undefined, 'bold');
    addTextWithPagination('Balancing Test');
    doc.setFont(undefined, 'normal');
    addTextWithPagination('Is legitimate interests the most appropriate basis for processing personal data?');
    y += lineHeight;

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

    const legalBasescanOrcannotValue = document.getElementById('legalBasescanOrcannot').value;
    addFieldWithPagination('Based on the balancing test, legitimate interests', legalBasescanOrcannotValue);

    // Add fields from the form
    const place = document.getElementById('place').value;
    const date = document.getElementById('date').value;
    const person = document.getElementById('person').value;
    const placeDpo = document.getElementById('placeDpo').value;
    const dateDpo = document.getElementById('dateDpo').value;
    const dpo = document.getElementById('dpo').value;

    // Add the captured fields to the PDF
    addFieldWithPagination('Place', place);
    addFieldWithPagination('Date', date);
    addFieldWithPagination('Person who conducted the balancing test', person);
    addFieldWithPagination('Place (DPO)', placeDpo);
    addFieldWithPagination('Date (DPO)', dateDpo);
    addFieldWithPagination('Data Protection Officer', dpo); 
  }


  doc.save('BalanceTest.pdf');
}

function addPageNumber(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  doc.text(`Page ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
}

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

  let valid = true;

  requiredFields.forEach(id => {
    const element = document.getElementById(id);
    if (element && element.offsetParent !== null && element.value.trim() === '') {
        valid = false;
    }
});

    // Validate fields for Legitimate Interest only if that option is selected
  if (document.getElementById('legalBases').value === 'Legitimate Interest') {
    const legitimateInterestFields = [
     // 'categoriesOfPersonalData',
     // 'purposeOfPersonalData',
    //  'storeOfPersonalData',
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
