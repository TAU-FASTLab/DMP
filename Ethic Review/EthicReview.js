document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button[onclick="generatePDF()"]').addEventListener('click', generatePDF);
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
  
    const requiredFiles = [
      'coverLetter', 'researchPlan', 'assessmentPI', 'riskAssessment', 'DPIA', 
      'informationSheet', 'privacyNotice', 'consentForm', 'planAnonymization', 
      'otherInfo', 'dMP' 
    ]; 
  
    // Check if all required files are uploaded
    for (const fileId of requiredFiles) {
      const fileInput = document.getElementById(fileId); 
      if (!fileInput.files.length) {
        alert(`Please upload the ${fileInput.previousSibling.textContent.trim()} before generating the PDF.`);
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
    const fontSize = 11; // Normal font size
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const totalPagesExp = "{total_pages_count_string}"; // Placeholder for total pages
  
    function addText(text, x = 10) {
      const splitText = doc.splitTextToSize(text, 190);
      splitText.forEach(line => {
        doc.text(line, x, y);
        y += lineHeight;
        if (y > 280) { // If text exceeds page height, add new page
          doc.addPage();
          y = 10;
          addPageNumber();
        }
      });
    }
  
    function addSectionTitle(title, x = 10) {
      doc.setFont('helvetica', 'bold');
      addText(title, x);
      doc.setFont('helvetica', 'normal');
    }
  
    function addSectionTitleMain(title, x = 10) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      const splitText = doc.splitTextToSize(title, 190);
      splitText.forEach(line => {
        doc.text(line, x, y);
        y += lineHeight;
        if (y > 280) { // If text exceeds page height, add new page
          doc.addPage();
          y = 10;
        //  addPageNumber();
        }
      });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSize);
    }
  
    function addFieldText(label, fieldId) {
      const field = document.getElementById(fieldId);
      if (field) {
        const fieldText = field.value.trim();
        addText(`${label}: ${fieldText}`);
      } else {
        console.error(`Element with ID ${fieldId} not found.`);
      }
    }
  
    function addLink(text, url, x = 10) {
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(text, x, y, { url });
      doc.setTextColor(0, 0, 0);
      y += lineHeight;
      if (y > 280) { // If text exceeds page height, add new page
        doc.addPage();
        y = 10;
        //addPageNumber();
      }
    }
  
    function addPageNumber() {
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(`Page ${pageCount}`, pageWidth - 20, pageHeight - 10);
    }
  
    // Add the content to the PDF
    addSectionTitleMain('Ethic Review Request Template');
  
    addSectionTitle('1. Cover Letter');
    addText('The cover letter should includes the following information:');
    addText('Contact information of the principal investigator; grounds for submitting the request for statement:');
    addText('The researcher must request an ethical review statement from a human sciences ethics committee, if their research contains any of the following:');
    addText('a) Participation in the research deviates from the principle of informed consent.');
    addText('b) The research involves intervening in the physical integrity of research participants.');
    addText('c) The focus of the research is on minors under the age of 15, without separate consent from a parent or carer or without informing a parent or carer in a way that would enable them to prevent the child’s participation in the research.');
    addText('d) Research that exposes participants to exceptionally strong stimuli.');
    addText('e) Research that involves a risk of causing mental harm that exceeds the limits of normal daily life to the research participants or their family members or others close to them.');
    addText('f) Conducting the research could involve a threat to the safety of participants or researchers or their family members or others close to them.');
  
    addSectionTitle('2. Research Plan');
    addText('The research proposal (with the pages numbered). The abstract must be written in Finnish if the language of the study is English. The research plan is drafted for the purpose of ethics evaluation by the committee. The maximun length of research plan is 10 pages. The research plan must be drafted according to the following instruction:');
    addLink('Instruction Research Plan', 'https://content-webapi.tuni.fi/proxy/public/2022-05/instruction.research.plan_.docx');
  
    addSectionTitle('3. Assessment of the ethical considerations by the principal investigator');
    addText('You should assess the ethical risks and potential harm that are associated with participating in your study and exceed what people may expect to experience in their everyday life.');
    addText('The ethical assessment should be carried out in accordance with the principles set out in the');
    addLink('Ethical principles of research with human participants and ethical review in the human sciences in Finland issued by the Finnish National Board on Research Integrity');
    addLink('Ethical Principles', 'https://www.tenk.fi/sites/tenk.fi/files/Ihmistieteiden_eettisen_ennakkoarvioinnin_ohje_2019.pdf');
  
    addSectionTitle('4. Risk assessment');
    addText('A concise assessment of the risks associated with the processing of personal data must always be carried out before starting to process personal data. In this section of your request for statement, you need to assess the risks related to data protection and privacy.');
    addLink('See more instructions on the website of the Data Protection Ombudsman', 'https://tietosuoja.fi/en/risk-assessment-and-data-protection-planning');
  
    addSectionTitle('5. Data Protection Impact Assessment (DPIA)');
    addText('If the results of a concise risk assessment indicate that participation in your study will pose significant risks to research subjects from the perspective of privacy, you must carry out an impact assessment pertaining to the processing of personal data.');
    addLink('See more information on website of the Office of the Data Protection Ombudsman', 'https://tietosuoja.fi/en/impact-assessments');
  
    addSectionTitle('6. Information Sheet and Privacy Notice');
    addText('a. If you intend to deviate from the principle of informed consent, the reasons for this choice must be presented in the section where you assess the ethical considerations of your study.');
    addText('b. Privacy notice If you will be processing personal data (NB! The concept of personal data is extensive) in connection with your study. You must also draw up a privacy notice if your data is likely to include personal data, even if the collection of personal data is not the primary purpose of your study. The privacy notice must be attached to the subject information sheet. The privacy notice may include some of the same details as the subject information sheet.');
    addLink('See the link below for information that a privacy notice must include', 'https://www.tuni.fi/en/research/responsible-research/data-protection');
  
    addSectionTitle('7. The consent form');
    addText('To be signed by your research subjects or other statement detailing the process of obtaining and documenting participants’ consent. The Ethics Committee recommends researchers to use written consent forms if their study intervenes in the physical integrity of their subjects (if the study falls outside the scope of the Medical Research Act) and if the research data will not be anonymised before analysis and the data contains sensitive information (special category data defined in the GDPR).');
  
    addSectionTitle('8. Other material');
    addText('Other material provided to research subjects (interview framework, diaries, questionnaires, etc.).');
  
    addSectionTitle('9. Data Management Plan (DMP)');
    addText('The data used in the study and a concise description of how the data have been collected.');
    addText('Technical solutions, applications and storage facilities used in data management.');
    addText('Preservation and archiving services for the further use of the data.');
    addText('How the use of the data during research and possible further use have been agreed between partners.');
    addText('How the rights, such as the copyright and authorship of the data are defined between parties.');
    addText('Justify your answers and the decisions you have made from the perspective of research ethics and privacy protection.');
  
    const files = [
      { id: 'riskAssessment', label: 'Risk Assessment' },
      { id: 'DPIA', label: 'DPIA' },
      { id: 'planAnonymization', label: 'Plan Anonymization' },
      { id: 'balanceTest', label: 'Balance Test' },
      { id: 'dataProcessingAgreement', label: 'Data Processing Agreement' },
      { id: 'jointControllerAgreement', label: 'Joint Controller Agreement' },
      { id: 'coverLetter', label: 'Cover Letter' },
      { id: 'planAnonymization', label: 'Plan Anonymization' },
      { id: 'consentForm', label: 'Consent Form' },
      { id: 'privacyNotice', label: 'Privacy Notice' },
      { id: 'informationSheet', label:'Information Sheet'},
      { id: 'otherInfo', label: 'Other Information' },
      { id: 'dMP', label: 'Data Management Plan' }
  ];

  let content = "Files Uploaded for the Ethical Review:\n\n";
  files.forEach((file, index) => {
      const inputElement = document.getElementById(file.id);
      content += file.label + ": " + (inputElement.files.length > 0 ? 'Uploaded' : 'Not Uploaded') + "\n";
  });

  addText(content);
  
    
  // Add placeholders for page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i}`, pageWidth - 20, pageHeight - 10);
  }

  // Update the total page count and replace placeholders
  const finalTotalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= finalTotalPages; i++) {
    doc.setPage(i);
    doc.text(`Page ${i}`, pageWidth - 20, pageHeight - 10);
  }
  
    // Save the PDF
  doc.save('Ethic_Review_Uploads_Summary.pdf');

  }
  