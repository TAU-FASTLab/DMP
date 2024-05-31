// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector('input[type="button"][value="Generate PDF"]').addEventListener('click', generatePDF);
//   });
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button[onclick="generatePDF()"]').addEventListener('click', generatePDF);
});
  
  function generatePDF() {
    const requiredFields = [
      ...document.querySelectorAll('input[type="text"]')
    ];
  
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
      format: 'a4'
    });
  
    let y = 10; // Initial y position
    const lineHeight = 10; // Line height for text
    const fontSize = 11; // Normal font size
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    function addText(text, x = 10) {
      const splitText = doc.splitTextToSize(text, pageWidth - 20);
      splitText.forEach(line => {
        doc.text(line, x, y);
        y += lineHeight;
        if (y > pageHeight - 20) { // If text exceeds page height, add new page
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
      addText(title, x);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSize);
    }
  
    function addFieldText(label, fieldName) {
      const field = document.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const fieldText = field.value.trim();
        addText(`${label}: ${fieldText}`);
      } else {
        console.error(`Element with name ${fieldName} not found.`);
      }
    }
  
    function addPageNumber() {
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(`Page ${pageCount}`, pageWidth - 20, pageHeight - 10);
    }
  
    // Add main title
    addSectionTitleMain('Privacy Notice for Scientific Research');
  
    // Add introductory text
    addText('EU General Data Protection Regulation (EU 2016/679), art. 12, 13, 14');
  
    // Section 1: Title, nature and duration of research
    addSectionTitle('1. Title, nature and duration of research');
    addFieldText('Title of research', 'titleOfResearch');
    addFieldText('Duration of research', 'durationOfResearch');
    addFieldText('Duration of data processing', 'durationOfDataProcessing');
    addText('Research Type:');
    document.querySelectorAll('input[name="researchType"]:checked').forEach((radio) => {
      addText(`Research will be conducted in an employment contract with the Tampere University, indicating the University to be the data controller. - ${radio.value}`);
    });
  
    // Section 2: Data Controller
    addSectionTitle('2. Data Controller');
    document.querySelectorAll('input[name="employmentContract"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    addText('Tampere University Foundation sr, 33014 Tampere University, Kalevantie 4, 33100 Tampere, Business ID: 2844561-8');
    addText('Data Protection Officer of Tampere University: dpo@tuni.fi');
  
    // Section 3: Principal investigator or research group
    addSectionTitle('3. Principal investigator or research group');
    addFieldText('Name', 'principalInvestigatorName');
    addFieldText('Contact detail', 'principalInvestigatorContact');
  
    // Section 4: Researchers
    addSectionTitle('4. Researchers');
    addFieldText('Researchers', 'researchers');
  
    // Section 5: Content of research records
    addSectionTitle('5. Content of research records');
    addFieldText('Content of research records', 'contentOfRecords');
  
    // Section 6: Sources of personal data
    addSectionTitle('6. Sources of personal data');
    addFieldText('Sources of personal data', 'sourcesOfData');
  
    // Section 7: Purpose of processing personal data
    addSectionTitle('7. Purpose of processing personal data');
    addFieldText('Purpose of processing personal data', 'purposeOfData');
  
    // Section 8: Lawful Basis for Data Processing
    addSectionTitle('8. Lawful Basis for Data Processing');
    document.querySelectorAll('input[name="lawfulBasis"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    addText('Lawful Basis:');
    document.querySelectorAll('input[name="dataProcessingBasis"]:checked').forEach((radio) => {
      addText(`- ${radio.value}`);
    });
    addFieldText('Please specify the legitimate interests', 'legitimateInterestsDetails');
    addFieldText('Other, please specify', 'otherBasisDetails');
  
    // Section 9: Sensitive Personal Data
    addSectionTitle('9. Sensitive Personal Data');
    document.querySelectorAll('input[name="sensitiveData"]:checked').forEach((radio) => {
      addText(`- ${radio.value}`);
    });
    document.querySelectorAll('#sensitiveDataOptions input[type="checkbox"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    document.querySelectorAll('input[name="criminalData"]:checked').forEach((radio) => {
      addText(`- Criminal data: ${radio.value}`);
    });
    addText('Lawful Basis for Processing of Sensitive Personal Data:');
    document.querySelectorAll('input[name="consent"]:checked').forEach((radio) => {
      addText(`- ${radio.nextElementSibling ? radio.nextElementSibling.textContent : ''}`);
    });
  
    // Section 10: Joint Controllership in a Collaborative Research Project
    addSectionTitle('10. Joint Controllership in a Collaborative Research Project');
    addFieldText('Please provide a brief description of the respective responsibilities of the Joint Controllers', 'jointControllershipDetails');
    addFieldText('Contact Person. Research subjects will be advised to send all requests relating to the research', 'contactPersonDetails');
  
    // Section 11: Transfer of Data to External Parties
    addSectionTitle('11. Transfer of Data to External Parties');
    document.querySelectorAll('input[id="transferDataCheckbox"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    addFieldText('Please describe the type of data that will be transferred, the recipient and the legal grounds for transferring personal data', 'transferDataDetails');
    document.querySelectorAll('input[id="outsourcedCheckbox"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    addFieldText('Specify details about outsourcing', 'outsourcingDetails');
    document.querySelectorAll('input[id="dataDisclosedCheckbox"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    addFieldText('Specify the parties to whom data will be disclosed and the legal basis', 'disclosureDetails');
  
    // Section 12: Transfer or Disclosure of Data Outside the EU/EEA
    addSectionTitle('12. Transfer or Disclosure of Data Outside the EU/EEA');
    document.querySelectorAll('input[name="transferOutsideEU"]:checked').forEach((radio) => {
      addText(`- ${radio.value}`);
    });
    addFieldText('Description of the measures taken to protect data', 'outsideEUDetails');
  
    // Section 13: Data Protection Principles
    addSectionTitle('13. Data Protection Principles');
    document.querySelectorAll('input[id="protectionManualCheckbox"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    addFieldText('Specify how manual materials are protected', 'manualProtectionDetails');
    document.querySelectorAll('input[id="protectionDigitalCheckbox"]:checked').forEach((checkbox) => {
      addText(`- ${checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : ''}`);
    });
    addFieldText('Specify digital protection measures', 'digitalProtectionDetails');
  
    // Section 14: Processing of Personal Data after the Research Project Has Been Concluded
    addSectionTitle('14. Processing of Personal Data after the Research Project Has Been Concluded');
    document.querySelectorAll('input[name="dataProcessingStatus"]:checked').forEach((radio) => {
      addText(`- ${radio.value}`);
    });
    addFieldText('Where will the research materials be stored and for how long', 'dataStorageDetails');
  
    // Section 15: Data Subjects' Rights and Possible Restriction Thereof
    addSectionTitle('15. Data Subjects\' Rights and Possible Restriction Thereof');
    addFieldText('Data subjects have the following rights under the EU’s General Data Protection Regulation (GDPR)', 'dataSubjectsRights');
  
    // Add sub-sections for rights
    addSectionTitle('Right of access');
    addText('Data subjects are entitled to find out what information the University holds about them or to receive confirmation that their personal data is not processed by the University.');
  
    addSectionTitle('Right to rectification');
    addText('Data subjects have the right to have any incorrect, inaccurate, or incomplete personal details held by the University revised or supplemented without undue delay. In addition, data subjects are entitled to have any unnecessary personal data deleted from the University\'s systems.');
  
    addSectionTitle('Right to erasure');
    addText('In exceptional circumstances, data subjects have the right to have their personal data erased from the Data Controller’s records (\'right to be forgotten\').');
  
    addSectionTitle('Right to restrict processing');
    addText('In certain circumstances, data subjects have the right to request the University to restrict processing their personal data until the accuracy of their data, or the basis for processing their data, has been appropriately reviewed and potentially revised or supplemented.');
  
    addSectionTitle('Right to object');
    addText('In certain circumstances, data subjects may at any time object to the processing of their personal data for compelling personal reasons.');
  
    addSectionTitle('Right to data portability');
    addText('Data subjects have the right to obtain a copy of the personal data that they have submitted to the University in a commonly used, machine-readable format and transfer the data to another Data Controller.');
  
    addSectionTitle('Right to lodge a complaint with a supervisory authority');
    addText('Data subjects have the right to lodge a complaint with a supervisory authority in their permanent place of residence or place of work, if they consider the processing of their personal data to violate the provisions of the GDPR (EU 2016/679). In addition, data subjects may follow other administrative procedures to address grievances.');
  
    addSectionTitle('Contact Information');
    addText('Office of the Data Protection Ombudsman');
    addText('Street address: Lintulahdenkuja 4, 00530 Helsinki, Finland');
    addText('Postal address: PO Box 800, FI-00531 Helsinki, Finland');
    addText('Switchboard: tel. +358 29 56 66700');
    addText('Fax: +358 29 56 66735');
    addText('Email address: tietosuoja@om.fi');
    addText('The Data Controller follows a GDPR-compliant procedure for responding to subject access requests.');
  
    // Save the PDF
    doc.save('Privacy_Notice.pdf');
  }
