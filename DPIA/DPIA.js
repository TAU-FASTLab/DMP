// Wait for the DOM to be fully loaded before adding event listeners
// This ensures that the button exists before trying to attach an event listener
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button[onclick="generatePDF()"]').addEventListener('click', generatePDF);
});

// Function to generate the PDF document
function generatePDF() {
  // Collect all required input fields (text inputs and textareas)
  const requiredFields = [...document.querySelectorAll('input[type="text"], textarea')];

  // Check if all required fields are filled
  for (const field of requiredFields) {
      if (!field.value.trim()) {
          alert('Please fill in all the fields before generating the PDF.');
          return;
      }
  } 

  // Initialize jsPDF document
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
  });

  let y = 10; // Initial vertical position for text
  const lineHeight = 10; // Line height for each text line
  const fontSize = 11; // Default font size
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Function to add text to the PDF with word wrapping
  function addText(text, x = 10) {
    const splitText = doc.splitTextToSize(text, 190);
    splitText.forEach(line => {
      doc.text(line, x, y);
      y += lineHeight;
      if (y > 280) { // Check if text exceeds page height, then add a new page
        doc.addPage();
        y = 10;
        addPageNumber();
      }
    });
  }

  // Function to add section titles in bold
  function addSectionTitle(title, x = 10) {
    doc.setFont('helvetica', 'bold');
    addText(title, x);
    doc.setFont('helvetica', 'normal');
  }

  // Function to add main section titles with a larger font size
  function addSectionTitleMain(title, x = 10) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    addText(title, x);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
  }

  // Function to add text fields with labels from the HTML form
  function addFieldText(label, fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      addText(`${label}: ${field.value.trim()}`);
    } else {
      console.error(`Element with ID ${fieldId} not found.`);
    }
  }

  // Function to add page numbers to the PDF
  function addPageNumber() {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.text(`Page ${pageCount}`, pageWidth - 20, pageHeight - 10);
  }

  // Function to extract data from radio button selections
  function addRadioText(label, yesId, noId) {
      const yesRadio = document.getElementById(yesId);
      const noRadio = document.getElementById(noId);
      const radioText = yesRadio.checked ? 'Yes' : noRadio.checked ? 'No' : '';
      addText(`${label}: ${radioText}`);
  }

  // Function to extract and format risk table rows
  function addRiskTableRows(tableId) {
      const rows = document.querySelectorAll(`#${tableId} tbody tr`);
      rows.forEach((row, index) => {
          if (index > 0) addText('');
          addText(`Risk ${index + 1}: ${row.querySelector(`#risk${tableId.slice(-2)}_${index + 1}`)?.value || 'N/A'}`);
          addText(`Likelihood: ${row.querySelector(`#likelihood${tableId.slice(-2)}_${index + 1}`)?.value || 'N/A'}`);
          addText(`Severity: ${row.querySelector(`#severity${tableId.slice(-2)}_${index + 1}`)?.value || 'N/A'}`);
          addText(`Mitigation: ${row.querySelector(`#mitigation${tableId.slice(-2)}_${index + 1}`)?.value || 'N/A'}`);
          addText(`Remaining Risk: ${row.querySelector(`#remainingRisk${tableId.slice(-2)}_${index + 1}`)?.value || 'N/A'}`);
      });
  }

  // Adding sections with field inputs from the form
  addSectionTitleMain('Data Protection Impact Assessment');
  addSectionTitle('1. Description of processing activities');
  addFieldText('Name of the research study or other identifier', 'nameStudy');
  addFieldText('Principal investigator', 'principalInvestigator');
  addFieldText('Contact information', 'contactInformation');
  addFieldText('Research group', 'researchGroup');

  addSectionTitle('2. Risks Associated with the Processing');
  addSectionTitle('3.1. Identifying the risks associated with processing personal data');
  addFieldText('Identifying the risks associated with processing personal data', 'riskAssessment');
  addSectionTitle('3.2. Unauthorised disclosure of or access to personal data');
  addRiskTableRows('riskTable_32');
  addSectionTitle('3.3. Destruction or unauthorised modification of personal data');
  addRiskTableRows('riskTable_33');

  addSectionTitle('4. Stakeholder comments');
  addFieldText('Comments by the data protection officer', 'dpoComments');

  // Adding placeholders for page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i}`, pageWidth - 20, pageHeight - 10);
  }

  // Save the PDF document
  doc.save('DPIA.pdf');
}
