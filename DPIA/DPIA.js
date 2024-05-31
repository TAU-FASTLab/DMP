document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('input[type="button"]').addEventListener('click', generatePDF);
});

function generatePDF() {
  const requiredFields = [
    ...document.querySelectorAll('input[type="text"], textarea')
  ];

  // Check if any required field is empty
  for (const field of requiredFields) {
    if (!field.value.trim()) {
      alert('Please fill in all the fields before generating the PDF.');
      return;
    }
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let y = 10; // Initial y position
  const lineHeight = 10; // Line height for text

  function addSectionTitle(title, x = 10) {
    doc.setFont('helvetica', 'bold');
    addText(title, x);
    doc.setFont('helvetica', 'normal');
  }

  // Function to add text to the PDF with pagination
  function addText(text, x = 10) {
    if (!text) return; // Ensure the text is valid
    const splitText = doc.splitTextToSize(text, 190); // Split text to fit page width
    doc.text(splitText, x, y);
    y += splitText.length * lineHeight;
    if (y > 280) { // If text exceeds page height, add new page
        doc.addPage();
        y = 10;
    }
  }

  function addFieldText(label, fieldId) {
    const fieldElement = document.getElementById(fieldId);
    const fieldText = fieldElement ? fieldElement.value.trim() : 'N/A';
    addText(`${label}: ${fieldText}`);
  }

  function addRadioText(label, yesId, noId) {
    const yesRadio = document.getElementById(yesId);
    const noRadio = document.getElementById(noId);
    const radioText = yesRadio && yesRadio.checked ? 'Yes' : noRadio && noRadio.checked ? 'No' : 'N/A';
    addText(`${label}: ${radioText}`);
  }

  // Add the content to the PDF
  doc.setFont('helvetica', 'bold');
  addText('Data Protection Impact Assessment');
  addSectionTitle('1. Description of processing activities');
  addSectionTitle('1.1 Basic information about the research');
  addFieldText('1.1.1. Name of the research study or other identifier', 'categoriesPersonalData');
  addFieldText('Principal investigator', 'processingPersonalData');
  addFieldText('Contact information', 'specialPersonalData');
  addFieldText('Research group', 'processingAct');

  addSectionTitle('1.2. Scope of processing activities');
  addFieldText('Number of research subjects', 'categoriesPersonalData');
  addFieldText('Planned duration of the research study', 'processingPersonalData');

  addSectionTitle('1.3. Categories of personal data to be processed');
  addSectionTitle('1.3.1. Categories and sources of personal data');
  addText('The term personal data refers to all information relating to an identified or identifiable natural person. Natural persons are considered identifiable if they can be identified (directly or indirectly) in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or one or more factors specific to their physical, physiological, genetic, mental, economic, cultural or social identity.');
  addText('What types of personal data will be processed during the research study? Describe the personal data that will be processed (types of personal data), whose personal data will be processed (groups of data subjects) and how or from whom personal data will be collected (sources of personal data). You must also indicate the purposes for processing personal data (purpose of processing) and the lawful basis for each processing activity (lawful basis of processing).');
  addFieldText('Details about the categories and sources of personal data', 'categoriesPersonalData');
  
  addSectionTitle('1.3.2. Processing special category personal data');
  addText('The term special category personal data refers to data that reveals an individual’s racial or ethnic origin, political opinions, religious or philosophical beliefs or trade union membership, genetic or biometric data (when used for identification purposes), health data, or data concerning his or her sexual behaviour or orientation.');
  addFieldText('Details about processing special category personal data', 'processingPersonalData');
  addText('Will your process special category personal data (sensitive personal data) or data concerning criminal convictions or offences in the course of your research? Describe the personal data that will be processed (types of personal data), whose personal data will be processed (groups of data subjects), how or from whom personal data will be collected (sources of personal data). Also indicate the purposes for processing personal data (purpose of processing) and the lawful basis for each processing activity (lawful basis of processing).');
  addFieldText('Special categories of personal data and data concerning criminal convictions', 'specialPersonalData');
  
  addSectionTitle('1.3.3. Description of processing activities');
  addText('Draw up a systematic description of the nature, scope, context, and purpose of processing personal data. Consider the entire lifecycle of personal data from the collection of data to the destruction/archiving of data.');
  addText('The description should indicate why and how personal data will be processed during your research study. Address especially the following questions: How will you process personal data? Where will you store personal data? Who will take part in processing personal data, and what are their respective roles and responsibilities? How will data be shared with possible other stakeholders involved in the processing activities? What will happen to the data after your study has been completed?');
  addText('If you have prepared a separate data flow map or description of your processing activities, you can refer to these documents in this section.');
  addFieldText('Description of processing activities', 'processingAct');
  
  addSectionTitle('1.3.4. Codes of conduct');
  addText('Will your processing activities be carried out in compliance with specific codes of conduct as referred to in article 40 of the GDPR?');
  addFieldText('Codes of conduct', 'codeOfConduct');
  
  addSectionTitle('2. Necessity and Proportionality');
  addSectionTitle('2.1. Purpose Limitations');
  addText('Personal data may only be collected for specified, explicit, and legitimate purposes and may not be further processed in a manner that is incompatible with the original purposes.');
  addText('What are the specific purposes for collecting and processing personal data? How will you ensure that personal data will not be processed for any other purposes?');
  addFieldText('Purpose Limitations', 'necessity');
  
  addSectionTitle('2.2. Data Minimisation');
  addText('Personal data must be adequate, relevant, and limited to what is necessary in relation to the purposes for which they are processed.');
  addText('How do you ensure that only relevant and necessary personal data, which you need to fulfil your specified purposes, will be collected and processed in the course of your study?');
  addFieldText('Data Minimisation', 'dataMinimisation');
  
  addSectionTitle('2.3. Transparency and timely communication');
  addText('Data subjects must be made aware of how the personal data you hold about them will be processed and used. All information and communications must be provided in a concise, transparent, intelligible and easily accessible form using clear and plain language.');
  addText('What information will you provide to data subjects about your processing activities? How will you provide the information about your processing activities? When will you provide this information?');
  addFieldText('Transparency and timely communication', 'transparency');
  
  addSectionTitle('2.4. Consent management (if lawful basis for processing is consent)');
  addText('If you ask your data subjects to provide consent for the processing of their personal data, how will you handle the consent management process? How will data subjects provide their consent? How will you record their consent? How can data subjects withdraw their consent?');
  addText('Describe the consent management process if the lawful basis for your processing activities is consent (GDPR Art. 6.1(a)).');
  addFieldText('Consent management (if lawful basis for processing is consent)', 'consent');
  
  addSectionTitle('2.5. Storage limitation and anonymisation or pseudonymisation');
  addText('Personal data must be kept in a form that permits the identification of data subjects for no longer than is necessary for the purposes for which their personal data are processed. Data controllers must set deadlines for the deletion of personal data or for the periodical review of personal data to ensure that personal data is not held for any longer than is necessary.');
  addText('How have you set a retention period for the personal data you will collect or specified the criteria for setting the retention period? Have you considered possible further use of personal data when setting the retention period? How and when will you carry out anonymisation or pseudonymisation procedures?');
  addFieldText('Storage limitation and anonymisation or pseudonymisation', 'storage');
  
  addSectionTitle('2.6. Data subjects\' rights and exemptions');
  addText('Depending on the lawful basis for processing, data subjects may have the right to obtain a copy of their personal data (right of access), the right to rectification, the right to erasure (the right to be forgotten), the right to restrict processing, and the right to object to the processing of their personal data.');
  addText('Describe the process for ensuring the enforcement of data subjects’ rights. Who is identified as the contact person for inquiries? How will you ensure that information requested by data subjects can be provided and that their other requests can be fulfilled? How will you document and store requests and responses?');
  addText('Process for ensuring the enforcement of data subjects\' rights');
  addFieldText('Data subjects\' rights and exemptions', 'dataSubject');
  addText('Under certain circumstances, data protection laws allow an exemption from particular data protection provisions. Are there exemptions that apply to your study?');
  addFieldText('Exemptions', 'circumstances');
  
  addSectionTitle('2.7. Integrity, confidentiality and availability');
  addText('Personal data must be processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage using appropriate technical or organisational measures.');
  addText('Describe the measures (including the information security measures) that you will take to ensure the integrity and confidentiality of personal data during the different stages of processing throughout the data lifecycle.');
  addFieldText('Integrity, confidentiality and availability', 'integrityMeasures');
  
  addSectionTitle('2.8. Transfer of personal data and the recipients');
  addSectionTitle('2.8.1. Joint controllers');
  addText('If there are at least two data controllers who jointly determine the purposes and means of processing personal data, they are referred to as joint controllers.');
  addText('If multiple data controllers participate in the processing of personal data as joint controllers, provide their names, contact details, their role in the processing activities, and the contact details of their designated data protection officer, if applicable.');
  addFieldText('Joint controllers', 'jointControllersDetails');
  
  addSectionTitle('2.8.2. Data processors (subcontractors)');
  addText('If data processors participate in the processing activities, indicate their names, contact details, and roles: If data processors (such as providers of survey, analysis or transcription services) participate in the processing activities, indicate their names, contact details, their role in the processing activities, and the contact details of their designated data protection officer, if applicable.');
  addFieldText('Data processors', 'dataProcessors');
  
  addSectionTitle('2.8.3. Third parties and data recipients');
  addText('Will personal data be transferred or disclosed to third parties? Provide details:');
  addFieldText('Third parties and data recipients', 'dataRecipients');
  
  addSectionTitle('2.8.4. Transfer of personal data outside of the European Economic Area (EEA)');
  addText('Any transfer of personal data outside the EEA must comply with GDPR requirements. Provide details:');
  addFieldText('Transfer of personal data outside of the European Economic Area (EEA)', 'dataTransferOutsideEEA');
  addText('If personal data will be transferred outside the EEA, where will data be transferred? What GDPR-compliant transfer mechanism (Chapter V of the GDPR) will be applied to the transfer?');
  addText('You can also state this information in sections 2.8.1—2.8.3 above based on the role of each data recipient.');

  // Add content of "dataOutsideEU" table
  function addDataOutsideEUTableRows() {
    const rows = document.querySelectorAll('#dataOutsideEU tbody tr');
    rows.forEach((row, index) => {
      const dataType = row.querySelector(`#dataType${index + 1}`);
      const dataRecipient = row.querySelector(`#dataRecipient${index + 1}`);
      const dataLocation = row.querySelector(`#dataLocation${index + 1}`);
      const transferMechanism = row.querySelector(`#transferMechanism${index + 1}`);

      if (dataType && dataRecipient && dataLocation && transferMechanism) {
        addText(`Type of personal data: ${dataType.value}`);
        addText(`Recipient: ${dataRecipient.value}`);
        addText(`Location: ${dataLocation.value}`);
        addText(`Transfer mechanism: ${transferMechanism.value}`);
      } else {
        console.error(`Error accessing elements in row ${index + 1} of dataOutsideEU table`);
      }
    });
  }

  addDataOutsideEUTableRows();

  addSectionTitle('3. Risks Associated with the Processing');
  addSectionTitle('3.1. Identifying the risks associated with processing personal data');
  addText('Assess the risks that your processing activities may pose to data subjects, especially the risks arising from unauthorized access, loss, or alteration of personal data:unauthorised disclosure of or access to personal data,' + 'unintentional or unauthorised destruction or modification of personal data, the loss or alteration of personal data.');
  addText('How would you rate the severity of the possible harm or damage if the risks are realised? How would you rate the likelihood of the risks? Potential risks include:' + 'unauthorised re-identification of pseudonymised data or loss of control over the use of personal data,' + 'identity theft or fraud, financial loss,' + 'other social disadvantage, such as reputational damage, or' + 'physical harm (especially when processing special category data).');
  addText('Identify measures that you can take to mitigate the risks. You can consider, for example, the following questions: - How will you restrict access to personal data to ensure that only individuals who need to process this data for research purposes are able to gain access? - Where will personal data be stored? How will you securely store personal data to maintain the integrity and confidentiality of data? - How will personal data be securely transferred during different stages of the study? Type your comments in the tables below. You can refer to your earlier risk assessment as well as the mitigation measures listed in Section 2 of this DPIA.');
  addText('Describe the identified risks and their potential impacts:');
  addFieldText('Identifying the risks associated with processing personal data', 'riskAssessment');

  // For Risk tables 3.2, 3.3, 3.4
  function addRiskTableRows(tableId) {
    const rows = document.querySelectorAll(`#${tableId} tbody tr`);
    rows.forEach((row, index) => {
      if (index > 0) addText('');
      const risk = row.querySelector(`#risk${index + 1}_${tableId.slice(-2)}`);
      const likelihood = row.querySelector(`#likelihood${index + 1}_${tableId.slice(-2)}`);
      const severity = row.querySelector(`#severity${index + 1}_${tableId.slice(-2)}`);
      const mitigation = row.querySelector(`#mitigation${index + 1}_${tableId.slice(-2)}`);
      const remainingRisk = row.querySelector(`#remainingRisk${index + 1}_${tableId.slice(-2)}`);

      addText(`Risk ${index + 1}: ${risk ? risk.value : 'N/A'}`);
      addText(`Likelihood: ${likelihood ? likelihood.value : 'N/A'}`);
      addText(`Severity: ${severity ? severity.value : 'N/A'}`);
      addText(`Mitigation: ${mitigation ? mitigation.value : 'N/A'}`);
      addText(`Remaining Risk: ${remainingRisk ? remainingRisk.value : 'N/A'}`);
    });
  }

  addSectionTitle('3.2. Unauthorised disclosure of or access to personal data');
  addRiskTableRows('riskTable_32');

  addSectionTitle('3.3. Destruction or unauthorised modification of personal data');
  addRiskTableRows('riskTable_33');

  addSectionTitle('3.4. Loss or alteration of personal data');
  addRiskTableRows('riskTable_34');

  addFieldText('Overall assessment of the data protection risks', 'overalRisk');

  addSectionTitle('4. Stakeholder comments');
  addSectionTitle('4.1. Comments by the data protection officer - Name', 'dpoName');
  addFieldText('Date', 'dpoDate');
  addFieldText('Comments', 'dpoComments');

  addSectionTitle('4.2. Comments by other stakeholders - Stakeholder group', 'stakeholderGroup');
  addFieldText('Name', 'stakeholderName');
  addFieldText('Date', 'stakeholderDate');
  addFieldText('Comments', 'stakeholderComments');
  addSectionTitle('Summary');
  addRadioText('The planned measures for eliminating or controlling data protection risks are adequate', 'dpiaYes', 'dpiaNo');

  // Save the PDF
  doc.save('DPIA.pdf');
}
