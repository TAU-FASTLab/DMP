function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let y = 20; // Initial y position with top margin
  const lineHeight = 10; // Line height for text
  const leftMargin = 20; // Left margin
  const rightMargin = 190; // Right margin to control text width
  const pageHeight = 297; // A4 page height
  const pageWidth = 210; // A4 page width

  doc.setFontSize(12);

  // Validation function to check if all required fields are filled
  function validateFields() {
    const requiredFields = [
      'processingData',
      'assessmentdata',
      'dpiAssessment',
      'privacynotice',
      'dataprocessorrole',
      'agreeprocessingpersonaldata'
    ];

    let valid = true;
    requiredFields.forEach((field) => {
      if (getRadioValue(field) === 'Not answered') {
        valid = false;
        alert(`Please answer the question in section: ${field}`);
      }
    });

    // If DPIA is required, check the related fields
    if (document.getElementById('dpiIsRequired')?.checked) {
      if (getRadioValue('dpiCompleted') === 'Not answered') {
        valid = false;
        alert('Please complete the DPIA field.');
      }
    }

    return valid;
  }

  // Add section title
  function addSectionTitle(title) {
    doc.setFont('helvetica', 'bold');
    doc.text(title, leftMargin, y);
    doc.setFont('helvetica', 'normal');
    y += lineHeight;
  }

  // Add question and response
  function addQuestionAndResponse(question, response) {
    const wrappedQuestion = doc.splitTextToSize(question, rightMargin - leftMargin); // Wrap question text
    doc.text(wrappedQuestion, leftMargin, y);
    y += wrappedQuestion.length * lineHeight; // Adjust y position based on the number of lines
    doc.text(`Answer: ${response}`, leftMargin, y);
    y += lineHeight;
  }

  // Retrieve the selected value of a radio button group
  function getRadioValue(name) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    for (const radio of radios) {
      if (radio.checked) {
        return radio.value;
      }
    }
    return 'Not answered'; // Default if no value is selected
  }

  // Function to add page number
  function addPageNumber() {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
  }

  // Check if the content exceeds the page height and add a new page
  function checkPageEnd() {
    if (y + lineHeight > pageHeight - 20) { // Bottom margin of 20
      doc.addPage();
      y = 20; // Reset y position after new page
    }
  }

  // First, validate the form fields
  if (!validateFields()) {
    return; // Stop PDF generation if validation fails
  }

  // Start generating PDF content if validation passes

  // Title
  doc.setFontSize(16);
  doc.text('Data Protection – Personal Data: Checklist', leftMargin, y);
  y += lineHeight * 2;
  doc.setFontSize(12); // Reset font size

  // 1. Processing of personal data
  addSectionTitle('1. Processing of personal data');
  addQuestionAndResponse(
    'Will personal data be processed during your study?',
    getRadioValue('processingData')
  );
  checkPageEnd(); // Check if a new page is needed

  // 2. Assessment of data protection risks
  addSectionTitle('2. Assessment of data protection risks');
  addQuestionAndResponse(
    'Has the processing of personal data been assessed for risks?',
    getRadioValue('assessmentdata')
  );
  addQuestionAndResponse(
    'Have you assessed the need for a DPIA?',
    getRadioValue('dpiAssessment')
  );
  if (document.getElementById('dpiIsRequired')?.checked) {
    addQuestionAndResponse(
      'DPIA Completed?',
      getRadioValue('dpiCompleted')
    );
  }
  checkPageEnd(); // Check if a new page is needed

  // 3. Informing your research participants
  addSectionTitle('3. Informing your research participants');
  addQuestionAndResponse(
    'Have you prepared a research privacy notice?',
    getRadioValue('privacynotice')
  );
  checkPageEnd(); // Check if a new page is needed

  // 4. Roles of data processors
  addSectionTitle('4. Roles of data processors');
  addQuestionAndResponse(
    'Have you defined the roles and responsibilities of data processors?',
    getRadioValue('dataprocessorrole')
  );
  checkPageEnd(); // Check if a new page is needed

  // 5. Agreeing on the processing of personal data
  addSectionTitle('5. Agreeing on the processing of personal data');
  addQuestionAndResponse(
    'Have you drawn up the necessary data processing agreements?',
    getRadioValue('agreeprocessingpersonaldata')
  );
  checkPageEnd(); // Check if a new page is needed

  // 6. Summary
  addSectionTitle('6. Summary');
  const summaryText = 'If your research involves the processing of personal data and you need guidance, please contact Tampere University’s Research Data Services at researchdata@tuni.fi.';
  const wrappedSummary = doc.splitTextToSize(summaryText, rightMargin - leftMargin); // Wrap summary text
  doc.text(wrappedSummary, leftMargin, y);
  y += wrappedSummary.length * lineHeight;
  checkPageEnd(); // Check if a new page is needed

  // 7. Planning the lifecycle of personal data processing
  addSectionTitle('7. Planning the lifecycle of personal data processing');
  const lifecycleText = 'Please find out more about planning and documenting the lifecycle of processing personal data at Data Management Guidelines.';
  const wrappedLifecycle = doc.splitTextToSize(lifecycleText, rightMargin - leftMargin); // Wrap text
  doc.text(wrappedLifecycle, leftMargin, y);
  y += wrappedLifecycle.length * lineHeight;
  checkPageEnd(); // Check if a new page is needed

  // Add page numbers at the end
  addPageNumber();

  // Save the PDF
  doc.save('CheckList_PersonalData_Protection.pdf');
}
