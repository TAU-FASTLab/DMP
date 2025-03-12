document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', generateEditablePDF);
});

function generateEditablePDF() {
  // Define form field IDs
  const fieldIds = [
    'studyName', 'contactInfo', 'purpose', 'beginDescription', 'includeDescription', 
    'duringDescription', 'methodsDescription', 'participationDetails', 'registerSource', 
    'dataCollectionProcedures', 'benefitStudyName', 'benefitDetails', 'dataConfidentiality', 
    'dataUtilisation', 'retentionPeriod', 'dataAnonymisation', 'sponsors', 'insurancePolicy1', 
    'privacyProtection', 'resultsReporting', 'nonResearchUse', 'inquiryContact', 'researcherName', 
    'researcherUnit', 'researcherPhone', 'researcherEmail'
  ];

  // Use `reduce()` to gather form values into an object
  const formData = fieldIds.reduce((acc, id) => {
    acc[id] = document.getElementById(id).value.trim(); // Trim to remove extra spaces
    return acc;
  }, {});

  // Get selected radio button value for benefits
  const benefitRadio = document.querySelector('input[name="benefit"]:checked');
  formData.benefitFullText = benefitRadio
    ? (benefitRadio.value === 'benefit' 
        ? `You will benefit from participating in the study ${formData.benefitStudyName}`
        : 'You will not receive any direct benefit from participating in the study')
    : 'You will not receive any direct benefit from participating in the study';

  // Define required fields with messages
  const requiredFields = {
    studyName: 'Study Name is required',
    contactInfo: 'Contact Information is required',
    purpose: 'Purpose of the Research is required',
    beginDescription: 'Description of the Beginning is required',
    includeDescription: 'Study Inclusions are required',
    duringDescription: 'Description During the Study is required',
    methodsDescription: 'Methods/Surveys Included are required',
    participationDetails: 'Participation Details are required',
    registerSource: 'Register Source is required',
    dataCollectionProcedures: 'Procedures for Collecting Research Data are required',
    benefitDetails: 'Potential Risks and Benefits of Participation are required',
    dataConfidentiality: 'Data Confidentiality is required',
    dataUtilisation: 'Data Utilisation Contexts are required',
    retentionPeriod: 'Retention Period is required',
    dataAnonymisation: 'Data Anonymisation Details are required',
    sponsors: 'Sponsors are required',
    insurancePolicy1: 'Insurance Policy is required',
    privacyProtection: 'Privacy Protection Details are required',
    resultsReporting: 'Results Reporting Details are required',
    nonResearchUse: 'Non-Research Use Details are required',
    inquiryContact: 'Inquiry Contact is required',
    researcherName: 'Researcher Name is required',
    researcherUnit: 'Researcher Unit is required',
    researcherPhone: 'Researcher Phone Number is required',
    researcherEmail: 'Researcher Email Address is required'
  };

  // Use `reduce()` to check for missing required fields
  const missingFields = Object.keys(requiredFields).reduce((acc, key) => {
    if (!formData[key]) acc.push(requiredFields[key]); // Accumulate missing field messages
    return acc;
  }, []);

  // If there are missing fields, alert the user and stop execution
  if (missingFields.length) {
    alert(`Please fill in the following required fields:\n- ${missingFields.join('\n- ')}`);
    return;
  }

  // Generate the PDF using jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(12);
  let y = 10;
  const lineHeight = 10;

  function addText(text, x = 10) {
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, x, y);
    y += splitText.length * lineHeight;
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  }

  function addSectionTitle(title, x = 10) {
    doc.setFont('helvetica', 'bold');
    addText(title, x);
    doc.setFont('helvetica', 'normal');
  }

  addSectionTitle('ETHICS COMMITTEE OF THE TAMPERE REGION');
  addSectionTitle('INFORMATION SHEET TEMPLATE');
  addSectionTitle(`Research study: ${formData.studyName}`);
  addText(`You are invited to participate in a research study that explores pupils' well-being in schools. We received your contact information from ${formData.contactInfo}.`);
  addText('After reading this information sheet, you will have the opportunity to ask any questions you may have. You will be separately requested to provide consent for participating in the study.');

  addSectionTitle('Purpose of the research');
  addText(formData.purpose);

  addSectionTitle('Description of the process');
  addText(`The study will begin: ${formData.beginDescription}`);
  addText(`The study will include: ${formData.includeDescription}`);
  addText(`During the study: ${formData.duringDescription}`);

  addSectionTitle('Methods/Surveys Included');
  addText(formData.methodsDescription);

  addSectionTitle('Participation Details');
  addText(formData.participationDetails);

  addText('Participants will not receive financial compensation (the visits will be cost-free to participants).');

  addSectionTitle('Procedures for collecting research data');
  addText(`The participants will be interviewed and invited to fill out a questionnaire. In addition, data will be obtained from register: ${formData.registerSource}.`);
  addText(formData.dataCollectionProcedures);

  addSectionTitle('Potential risks and benefits of participation');
  addText(formData.benefitFullText);
  addText(formData.benefitDetails);
  addText('The procedures and methods used during this study do (not) involve health risks, social risks, financial risks and risks relating to personal data breaches.');

  addSectionTitle('Data confidentiality, processing and storage');
  addText('All personal data collected during the study will be processed in compliance with the EU’s General Data Protection Regulation (GDPR) and the data protection laws of Finland.');
  addText(formData.dataConfidentiality);

  addSectionTitle('Funding sources');
  addText(formData.sponsors);

  addSectionTitle('Voluntary participation');
  addText('Participation in this study is entirely voluntary, and you have the right to withdraw from the study at any time.');

  addSectionTitle('Insurance coverage and compensation');
  addText(`Tampere University’s insurance policy: ${formData.insurancePolicy1}`);

  addSectionTitle('Privacy protection in the context of research papers');
  addText(formData.privacyProtection);

  addSectionTitle('Results Reporting');
  addText(formData.resultsReporting);

  addSectionTitle('Use of data for non-research/later research purposes');
  addText(formData.nonResearchUse);

  addText(`Please direct all inquiries about the study to: ${formData.inquiryContact}`);

  addSectionTitle('Researchers\' contact details');
  addText(`Name: ${formData.researcherName}`);
  addText(`Unit: ${formData.researcherUnit}`);
  addText(`Phone: ${formData.researcherPhone}`);
  addText(`Email: ${formData.researcherEmail}`);

  // Save the PDF
  doc.save('InformationSheet.pdf');
}
