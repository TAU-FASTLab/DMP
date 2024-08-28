document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('input[onclick="generatePDF()"]').addEventListener('click', generatePDF);
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const lineHeight = 10;
  const maxWidth = 170; // Maximum width for text in mm
  let y = 20; // Initial y position

  // Check if all required fields are filled in
  if (!formIsValid()) {
    alert('Please fill in all required fields (marked with red asterisks).');
    return; // Stop the PDF generation
  }

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
    addTextWithPagination(`${label} ${value}`, x);
  }

  // Add title
  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text('Joint Controller Agreement', 20, y);
  y += lineHeight;

  // Add selected Legal Bases
  doc.setFontSize(12);
  doc.setFont(undefined, "normal");
  addTextWithPagination('Joint Controller Agreement for');
  addFieldWithPagination('Name Party:', `${document.getElementById('nameParty').value}`);
  addFieldWithPagination('Identification Party:', `${document.getElementById('identificationParty').value}`);
  y += lineHeight;

  // Add parties section
  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.text('1. PARTIES', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('This joint controller agreement (the “Agreement”) is entered into by and between the following parties:');
  addTextWithPagination('a) Tampere University Foundation sr, operating as Tampere University (”TAU”) with Business ID 2844561-8');
  addTextWithPagination(`b) ${document.getElementById('jCAParties').value}`);
  y += lineHeight;

  // Add Scope and Purpose section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('2. SCOPE AND PURPOSE', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination(document.getElementById('scopeAndPurpose').value);
  addTextWithPagination('For the purposes of the aforementioned co-operation, the Parties determine jointly the purposes and means of processing personal data and therefore act as joint controllers (as set forth in Article 26 of the EU General Data Protection Regulation (EU 2016/679). With this Agreement, the Parties wish to define their roles and responsibilities as joint controllers.');
  addTextWithPagination('In the event of any inconsistencies between this Agreement and any other agreement (“Co-operation Agreement”) pertaining to the co-operation described above, the provisions of this Agreement shall prevail.');
  y += lineHeight;

  // Add Definitions section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('3. DEFINITIONS', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('The term Data Protection Laws shall mean all laws that apply to the processing of personal data, including but not limited to the Finnish Data Protection Act (1050/2018), the European Union’s General Data Protection Regulation (Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC, “GDPR”), possible amendments thereof, and any and all decisions, instructions, and guidelines concerning the processing of personal data issued by data protection authorities or courts of law.');
  addTextWithPagination('Unless otherwise provided in this Agreement, the terms personal data, personal data processing, data processor, data controller, data subject, third party, data register, data protection authority and personal data breach shall be defined as in the GDPR.');
  y += lineHeight;

  // Add Scope of Processing Activities section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('4. SCOPE OF PROCESSING ACTIVITIES', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('For the purposes referred to in Chapter 2 of this Agreement, the Parties shall:');
  addTextWithPagination('What personal data is collected/processed?');
  addFieldWithPagination('', document.getElementById('whatPersonalDataCollected').value);
  addTextWithPagination('Whose personal data is collected/processed?');
  addFieldWithPagination('', document.getElementById('whosePersonalDataCollected').value);
  addTextWithPagination('Why personal data is collected/processed?');
  addFieldWithPagination('', document.getElementById('whyPersonalDataCollected').value);
  addTextWithPagination('How personal data is collected/processed?');
  addFieldWithPagination('', document.getElementById('howPersonalDataCollected').value);
  y += lineHeight;

  // Add Data Processing section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('5. DATA PROCESSING', 20, y);
  y += lineHeight;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('5.1 Lawfulness of processing', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('Each Party acts as a data controller as defined in Data Protection Laws and shall ensure that its processing activities under the Co-Operation Agreement and this Agreement are lawful under this Agreement and the applicable Data Protection Laws.');
  y += lineHeight;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('5.2 Risk and impact assessments', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('The Parties will assess in co-operation the risks related to the processing of personal data prior to collecting personal data.');
  addTextWithPagination('If the risk assessment implies that the planned processing activities are likely to result in a high risk to the rights and freedoms of natural persons, the Parties shall, prior to the collecting personal data, carry out in co-operation a data protection impact assessment (“DPIA”) as stipulated in Article 35 of the GDPR. Both the risk assessment and, where required, the DPIA shall be documented and reviewed periodically.');
  addTextWithPagination('Where the planned processing would require prior consultation of supervisory authority in accordance with Article 36 of the GDPR, the Parties agree that the coordinating Party shall be responsible for the consultation process.');
  y += lineHeight;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('5.3 Obligation to inform the data subjects', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('The Parties shall in co-operation draft and maintain privacy notices fulfilling the requirements of Articles 12—14 of the GDPR. Each Party shall ensure for its own part that the data subjects are provided with the privacy notice in accordance with Articles 13—14 of the GDPR.');
  y += lineHeight;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('5.4 Records of processing activities', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('Each Party shall maintain a record of its processing activities as set forth in Article 30 of the GDPR.');
  y += lineHeight;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('5.5 Rights of the data subject', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination(`${document.getElementById('nameParty3').value} shall act as a principal contact point for data subjects’ requests and shall be named as the principal contact point in the privacy notices referred to in Chapter 5.3. above. Data subject access requests and other requests relating to use of data subject rights shall be forwarded without undue delay to the Party acting as the principal contact point. The Party acting as the principal contact point shall address any requests without undue delay. Each Party shall assist, at its own cost, the principal contact point in responding to data subject requests as reasonably requested by the principal contact point.`);
  addTextWithPagination('Notwithstanding the aforementioned, each Party may respond to data subject requests individually insofar as the request solely pertains to the processing operations of that Party.');
  y += lineHeight;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('5.6 Information security and collection, storage and transfer of personal data', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('Each Party shall collect, store and otherwise process personal data in accordance with its internal information security practices and policies and implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk relating to the processing of personal data.');
  addTextWithPagination('The Parties have agreed on the following practices relating to the collection, storage, and exchange of personal data:');
  addTextWithPagination('5.6.1 Collection of personal data');
  addFieldWithPagination('', document.getElementById('collectionPersonalData').value);
  addTextWithPagination('5.6.2 Storing personal data during the Project');
  addTextWithPagination('How, where, and by whom personal data will be stored:');
  addFieldWithPagination('', document.getElementById('howWhereWhomPersonalDataStored').value);
  addTextWithPagination('How long personal data will be stored:');
  addFieldWithPagination('', document.getElementById('howLongPersonalDataStored').value);
  addTextWithPagination('Applicable security measures, such as pseudonymization or technical measures:');
  addFieldWithPagination('', document.getElementById('securityMeasuresPersonalData').value);
  addTextWithPagination('5.6.3 Exchange of personal data');
  addTextWithPagination('In what form/format will data be transferred?');
  addFieldWithPagination('', document.getElementById('formFormatDataTransferred').value);
  addTextWithPagination('How will the data be transferred (e.g. secure e-mail, in-person delivery of storage device..)');
  addFieldWithPagination('', document.getElementById('howDataTransferred').value);
  addTextWithPagination('How will the data be secured in transfer (e.g. encrypted files)');
  addFieldWithPagination('', document.getElementById('securedDataTransfer').value);
  addTextWithPagination('Potential contact persons for the exchange of personal data');
  addFieldWithPagination('', document.getElementById('contactPersonExchangePersonalData').value);
  addTextWithPagination('Each Party shall notify the other party/parties without undue delay of any personal data breaches (as defined in Data Protection Laws), as well as of any other factors that may affect the other Party’s performance under this Agreement.');
  addTextWithPagination('Each Party shall document personal data breaches in accordance with their internal processes and, where required, provide notifications to the supervisory authority and/or the data subject (as required by Articles 33 and 34 of the GDPR, respectively) individually.');
  y += lineHeight;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('5.7 Use of data after the co-operation', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('The Parties have agreed on the following practices relating to the use of data after the end of the co-operation:');
  addFieldWithPagination('', document.getElementById('usePersonalDataAfterCooperation').value);
  y += lineHeight;

  // Add Liability section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('6. LIABILITY', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('Each Party shall be solely liable for any damage it has caused to third parties (including the data subjects). The liability of the Parties for damage caused to data subjects shall be determined in accordance with the stipulations of Article 82 of the GDPR. For the avoidance of doubt, the Parties agree that the term “compensation” as set forth in Article 82(5) of the GDPR shall include reasonable attorney’s fees and legal costs incurred by a Party due to a breach of this Agreement or Data Protection Laws by the other Party / Parties.');
  addTextWithPagination('Each Party shall be liable for direct damages to the other Party resulting from a breach of this Joint Controller Agreement. Any limitations of liability agreed elsewhere shall not be applied to a Party’s liability hereunder.');
  y += lineHeight;

  // Add Effective Date and Termination section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('7. EFFECTIVE DATE AND TERMINATION', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('This Agreement shall enter into force from the last date of signature and shall in all cases apply retrospectively from the date the Parties have commenced the processing activities defined in this Agreement.');
  addTextWithPagination('This Agreement shall remain in force for the duration of the co-operation defined above. During the co-operation period, this Agreement may be terminated in accordance with the provisions of the Co-operation Agreement. Provisions that are by their nature intended to survive the termination or expiry of this Agreement shall remain in full force and effect regardless of the termination or expiry of this Agreement.');
  y += lineHeight;

  // Add Other Provisions section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('8. OTHER PROVISIONS', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('A Party may not assign or transfer this Agreement or the rights or obligations pertaining to it to any third party, without the prior written consent of the other Party / Parties.');
  addTextWithPagination('This Agreement may only be amended through a written document signed by an authorized representative of each Party.');
  y += lineHeight;

  // Add Choice of Law, Forum and Dispute Resolution section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('9. CHOICE OF LAW, FORUM AND DISPUTE RESOLUTION.', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('Unless otherwise agreed in the Co-operation Agreement, This Agreement shall be governed and interpreted in accordance with the laws of Finland without regard to its choice of law provisions. The Parties shall seek to solve any disputes amicably. Insofar as an amicable solution can not be reached, Pirkanmaa District Court shall have jurisdiction as the first instance.');
  y += lineHeight;

  // Add Signature section
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('SIGNATURE', 20, y);
  y += lineHeight;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  addTextWithPagination('This Agreement has been signed by the duly authorized representative of each Party.');
  addTextWithPagination('TAMPERE UNIVERSITY FOUNDATION SR');
  addFieldWithPagination('Place', document.getElementById('placeTAU').value);
  addFieldWithPagination('Date', document.getElementById('dateTAU').value);
  addFieldWithPagination('Name', document.getElementById('nameTAU').value);
  addFieldWithPagination('Title', document.getElementById('titleTAU').value);
  addTextWithPagination('PARTY');
  addFieldWithPagination('Place', document.getElementById('placeParty').value);
  addFieldWithPagination('Date', document.getElementById('dateParty').value);
  addFieldWithPagination('Name', document.getElementById('nameParty4').value);
  addFieldWithPagination('Title', document.getElementById('titleParty').value);
  
  doc.save('JointControllerAgreement.pdf');
}

function formIsValid() {
  const requiredFields = [
    'nameParty', 'identificationParty', 'scopeAndPurpose', 'whatPersonalDataCollected', 
    'whosePersonalDataCollected', 'whyPersonalDataCollected', 'howPersonalDataCollected', 
    'collectionPersonalData', 'howWhereWhomPersonalDataStored', 'howLongPersonalDataStored', 
    'securityMeasuresPersonalData', 'formFormatDataTransferred', 'howDataTransferred', 
    'securedDataTransfer', 'contactPersonExchangePersonalData', 'usePersonalDataAfterCooperation',
    'placeTAU', 'dateTAU', 'nameTAU', 'titleTAU', 'placeParty', 'dateParty', 
    'nameParty4', 'titleParty'
  ];

  let valid = true;

  requiredFields.forEach(id => {
    const element = document.getElementById(id);
    if (!element || element.value.trim() === '') {
      valid = false;
    }
  });

  return valid;
}

function addPageNumber(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  doc.text(`Page ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
}
