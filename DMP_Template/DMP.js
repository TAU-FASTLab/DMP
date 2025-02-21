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
        addPageNumber();
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
      addPageNumber();
    }
  }

  function addPageNumber() {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
   // doc.text(`Page ${pageCount} of ${totalPagesExp}`, pageWidth - 20, pageHeight - 10);
    doc.text(`Page ${pageCount}`, pageWidth - 20, pageHeight - 10);
  }

  // function addFieldText(label, fieldId) {
  //   const field = document.getElementById(fieldId);
  //   if (field) {
  //     const fieldText = field.value.trim();
  //     if (fieldText) {
  //       addText(`${label}: ${fieldText}`);
  //     } else {
  //       console.error(`Field with ID ${fieldId} is empty.`);
  //     }
  //   } else {
  //     console.error(`Element with ID ${fieldId} not found.`);
  //   }
  // }

  // Add the content to the PDF
  addSectionTitleMain('Data Management Plan');

  addSectionTitle('Introduction');
  addText('This Horizon 2020 DMP template has been designed to be applicable to any Horizon 2020 project that produces, collects or processes research data. In order to address specific issues under the different thematic priorities of the programme, though, updated versions can be prepared based on identified needs. In this template you will find specific annotations for projects funded from Societal Challenge 1 (Health, demographic change and wellbeing).');
  addText('You should develop a single DMP for your project to cover its overall approach. However, where there are specific issues for individual datasets (e.g. regarding openness), you should clearly spell this out.');
  addText('Guidelines on FAIR Data Management in Horizon 2020 are available in the');
  addLink('Online Manual.', 'http://ec.europa.eu/research/participants/docs/h2020-funding-guide/cross-cutting-issues/open-access-data-management/data-management_en.htm');
  
  addSectionTitle('FAIR Data management');
  addText('In general terms, your research data should be \'FAIR\', that is findable, accessible, interoperable and re-usable. These principles precede implementation choices and do not necessarily suggest any specific technology, standard, or implementation-solution.');
  addText('This template is not intended as a strict technical implementation of the FAIR principles, it is rather inspired by FAIR as a general concept.');
  addLink('More Information about FAIR','http://ec.europa.eu/research/participants/docs/h2020-funding-guide/cross-cutting-issues/open-access-data-management/data-management_en.htm');
  addLink('FAIR data principles (FORCE11 discussion forum)','https://www.force11.org/group/fairgroup/fairprinciples');
  addLink('FAIR principles (article in Nature)','http://www.nature.com/articles/sdata201618');

  addSectionTitle('Structure of the template');
  addText('The template is a set of questions that you should answer with a level of detail appropriate to the project. It is not required to provide detailed answers to all the questions in the first version of the DMP that needs to be submitted by month 6 of the project. Rather, the DMP is intended to be a living document in which information can be made available on a finer level of granularity through updates as the implementation of the project progresses and when significant changes occur. Therefore, DMPs should have a clear version number and include a timestamp for updates. As a minimum, the DMP should be updated in the context of the periodic evaluation/assessment of the project. If there are no other periodic reviews envisaged within the grant agreement, an update needs to be made in time for the final review at the latest.');

  addSectionTitle('Project Information');
  addFieldText('Project Number', 'projectNumber');
  addFieldText('Project Acronym', 'projectAcronym');
  addFieldText('Project Title', 'projectTitle');

  addSectionTitle('1. Data Summary');
  addText('This section aims to address the following items: State the purpose of the data collection/generation; explain the relation to the objectives of the project; specify the types and formats of data generated/collected; specify if existing data is being re-used (if any); specify the origin of the data; state the expected size of the data (if known); outline the data utility: to whom will it be useful.');
  addFieldText('Purpose of the data collection/generation and its relation to the objectives of the project', 'dataPurpose');
  addFieldText('Types and formats of data the project will generate/collect', 'dataTypesFormats');
  addFieldText('Re-use of existing data and how', 'dataReuse');
  addFieldText('Origin of the data', 'dataOrigin');
  addFieldText('Expected size of the data', 'dataSize');
  addFieldText('Data utility', 'dataUtility');

  addSectionTitle('2. FAIR Data');
  addSectionTitle('2.1. Making data findable, including provisions for metadata');
  addFieldText('Are the data produced and/or used in the project discoverable with metadata, identifiable and locatable by means of a standard identification mechanism?', 'dataFindable');
  addFieldText('What naming conventions do you follow?', 'namingConventions');
  addFieldText('Will search keywords be provided that optimize possibilities for re-use?', 'searchKeywords');
  addFieldText('Do you provide clear version numbers?', 'versionNumbers');
  addFieldText('What metadata will be created? In case metadata standards do not exist in your discipline, please outline what type of metadata will be created and how.', 'metadataCreation');

  addSectionTitle('2.2. Making data openly accessible');
  addFieldText('Which data produced and/or used in the project will be made openly available as the default?', 'dataAccessibility');
  addFieldText('Note that in multi-beneficiary projects it is also possible for specific beneficiaries to keep their data closed if relevant provisions are made in the consortium agreement and are in line with the reasons for opting out.', 'dataRestrictions');
  addFieldText('How will the data be made accessible?', 'dataAccessibleHow');
  addFieldText('What methods or software tools are needed to access the data?', 'softwareTools');
  addFieldText('Is documentation about the software needed to access the data included?', 'documentation');
  addFieldText('Is it possible to include the relevant software (e.g. in open source code)?', 'relevantSw');
  addFieldText('Where will the data and associated metadata, documentation and code be deposited?', 'metadata');
  addFieldText('Have you explored appropriate arrangements with the identified repository?', 'arrangements');
  addFieldText('If there are restrictions on use, how will access be provided?', 'restriccions');
  addFieldText('Is there a need for a data access committee?', 'dataAccessComittee');
  addFieldText('Are there well described conditions for access (i.e. a machine readable license)?', 'conditionsForAccess');
  addFieldText('How will the identity of the person accessing the data be ascertained?', 'identityOfPersonAccessingData');

  addSectionTitle('2.3. Making Data Interoperable');
  addFieldText('Are the data produced in the project interoperable?', 'dataInteroperableDescription');
  addFieldText('What data and metadata vocabularies, standards or methodologies will you follow to make your data interoperable?', 'dataInteroperableStandards');
  addFieldText('Will you be using standard vocabularies for all data types present in your data set, to allow inter-disciplinary interoperability?', 'standardVocabulariesUsage');
  addFieldText('In case it is unavoidable that you use uncommon or generate project specific ontologies or vocabularies, will you provide mappings to more commonly used ontologies?', 'uncommonOntologiesMapping');

  addSectionTitle('2.4. Increase Data Re-use (Through Clarifying Licences)');
  addFieldText('How will the data be licensed to permit the widest re-use possible?', 'dataLicensing');
  addFieldText('When will the data be made available for re-use? If an embargo is sought to give time to publish or seek patents, specify why and how long this will apply.', 'dataAvailabilityTiming');
  addFieldText('Are the data produced and/or used in the project usable by third parties, in particular after the end of the project?', 'dataUseByThirdParties');
  addFieldText('How long is it intended that the data remains re-usable?', 'dataReusabilityDuration');
  addFieldText('Are data quality assurance processes described?', 'dataQualityAssuranceProcesses');
  addFieldText('Further to the FAIR principles, DMPs should also address:', 'furtherFAIR');

  addSectionTitle('3. Allocation of Resources');
  addFieldText('What are the costs for making data FAIR in your project?', 'fairDataCosts');
  addFieldText('How will these be covered? Note that costs related to open access to research data are eligible as part of the Horizon 2020 grant.', 'costCoverage');
  addFieldText('Who will be responsible for data management in your project?', 'dataManagementResponsibility');
  addFieldText('Are the resources for long term preservation discussed?', 'longTermPreservationResources');

  addSectionTitle('4. Data Security');
  addFieldText('What provisions are in place for data security (including data recovery as well as secure storage and transfer of sensitive data)?', 'dataSecurityProvisions');
  addFieldText('Is the data safely stored in certified repositories for long term preservation and curation?', 'dataStorageCertification');

  addSectionTitle('5. Ethical Aspects');
  addFieldText('Are there any ethical or legal issues that can have an impact on data sharing?', 'ethicalIssues');
  addFieldText('If relevant, include references to ethics deliverables and ethics chapter in the Description of the Action (DoA).', 'ethicsReferences');
  addFieldText('Is informed consent for data sharing and long term preservation included in questionnaires dealing with personal data?', 'informedConsent');

  addSectionTitle('6. Other Issues');
  addFieldText('Do you make use of other national/funder/sectorial/departmental procedures for data management?', 'otherDataManagementProcedures');

  addSectionTitle('7. Further support in developing your DMP');
   addText('The Research Data Alliance provides a Metadata Standards Directory that can be searched for discipline-specific standards and associated tools.');
   addLink('Research Data Alliance ', 'http://rd-alliance.github.io/metadata-directory/');
   addText('The EUDAT B2SHARE tool includes a built-in license wizard that facilitates the selection of an adequate license'+
   'for research data.');
   addLink('EUDAT B2SHARE tool ', 'https://b2share.eudat.eu/');
   addText('Useful listings of repositories include: ');
   addLink('Registry of Research Data Repositories', 'http://www.re3data.org/');
   addText('Some repositories like Zenodo, an OpenAIRE and CERN collaboration), allow researchers to deposit both publications and data, while providing tools to link them.');
   addLink('Zenodo', 'https://zenodo.org/');
   addText('Other useful tools include DMP online and platforms for making individual scientific observations available such as ScienceMatters.');
   addLink('DMP Onlnie', 'https://dmponline.dcc.ac.uk/');  
   addLink('ScienceMatters', 'https://www.sciencematters.io/');

  //    // Add placeholders for page numbers
  // const pageCount = doc.internal.getNumberOfPages();
  // for (let i = 1; i <= pageCount; i++) {
  //   doc.setPage(i);
  //   doc.text(`Page ${i} of ${totalPages}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
  // }
    // // Add placeholders for page numbers
    // const pageCount = doc.internal.getNumberOfPages();
    // for (let i = 1; i <= pageCount; i++) {
    //   doc.setPage(i);
    //   doc.text(`Page ${i} of ${totalPagesExp}`, pageWidth - 20, pageHeight - 10);
    // }
  
    // // Update the total page count and replace placeholders
    // const finalTotalPages = doc.internal.getNumberOfPages();
    // doc.getAllPages().forEach((page, index) => {
    //   page.text = page.text.map(text => text.replace(totalPagesExp, finalTotalPages));
    // });


      // Add placeholders for page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    //doc.text(`Page ${i} of ${totalPagesExp}`, pageWidth - 20, pageHeight - 10);
    doc.text(`Page ${i}`, pageWidth - 20, pageHeight - 10);
  }

  // Update the total page count and replace placeholders
  const finalTotalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= finalTotalPages; i++) {
    doc.setPage(i);
    //doc.text(`Page ${i} of ${finalTotalPages}`, pageWidth - 20, pageHeight - 10);
    doc.text(`Page ${i}`, pageWidth - 20, pageHeight - 10);
  }

  // Save the PDF
  doc.save('DMP.pdf');
}
