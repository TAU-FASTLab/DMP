function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Define the title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold"); 
    doc.text('Joint Controller Agreement', 20, 30);
    const maxWidth = 170; // Maximum width for text in mm

    // Check if all required fields are filled in
    if (!formIsValid()) {
        alert('Please fill in all required fields (marked with red asterik).');
        return; // Stop the PDF generation
     }
    //Selected Legal Bases
    doc.setFontSize(12);
    // doc.text('Legal Basis Selected', 20, 45);
    // Define the question
    doc.setFont(undefined, "normal"); 
    doc.setFontSize(12);
   
    // Text before the variable, in normal font
    doc.setFont(undefined, "normal");
    doc.text("Joint Controller Agreement for  ", 20, 42);
    doc.text(document.getElementById('nameParty').value + " " + document.getElementById('identificationParty').value , doc.getTextWidth("Joint Controller Agreement for   ") + 18, 42); 

    doc.setFontSize(13);
    doc.text(['1. PARTIES'], 20, 59);
        doc.setFontSize(11);
        doc.setFont(undefined,'normal');
        doc.text('This joint controller agreement (the ”Agreement”) is entered into by and between the following parties:', 20, 69);
        doc.text('a) Tampere University Foundation sr, operating as Tampere University (”TAU”) with '+'Business ID 2844561-8', 20, 74);
        doc.text('b) ' + document.getElementById('nameParty').value + ', Business ID: '+ document.getElementById('identificationParty').value, 20, 79);
        doc.text('hereinafter each referred to as a “Party” and collectively as the “Parties”.', 20, 84);
     
        doc.setFontSize(13);
        doc.text(['2. SCOPE AND PURPOSE'], 20, 94);
        doc.setFontSize(11);
        doc.text(document.getElementById('scopeAndPurpose').value, 20, 100);
        fontSize=11;
        const scopeAndPurposeText = 'For the purposes of the aforementioned co-operation, the Parties determine jointly the purposes and means of processing personal data and therefore act as joint controllers (as set forth in Article 26 of the EU General Data Protection Regulation (EU 2016/679). With this Agreement, the Parties wish to define their roles and responsibilities as joint controllers.';
        
        const lineHeightScopeAndPurposeText = fontSize * 1.2 * 0.352778; // Convert points to mm, assuming 1.2 line height
        // Use splitTextToSize to split the long text into lines that fit within the specified maxWidth
        // fontSize: The size of the font in points.
        // 1.2: A typical line-height multiplier to provide space between lines of text for better readability.
        // 0.352778: The conversion factor from points to millimeters. points" refer to a unit of measure traditionally used to specify the size of typefaces and spacing in printed materials.
        // converting points to metric units, a point is approximately 0.352778 millimeters.
        
         // Initial Y position for the first line of text
         let startYlineHeightScopeAndPurposeText = 106;         
         // Output the text, line by line, with dynamic positioning
         const splitScopeAndPurposeText = doc.splitTextToSize(scopeAndPurposeText, maxWidth); 
         splitScopeAndPurposeText.forEach((lineScopeAndPurposeText, indexScopeAndPurpose) => {
           doc.text(lineScopeAndPurposeText, 20, startYlineHeightScopeAndPurposeText + (indexScopeAndPurpose * lineHeightScopeAndPurposeText));
         });
        const totalHeightScopeAndPurpose = startYlineHeightScopeAndPurposeText + (splitScopeAndPurposeText.length * lineHeightScopeAndPurposeText);
        //doc.setFont(undefined,'bold');
        const scopeandPurposeText2ndParagraph = 'In the event of any inconsistencies between this Agreement and any other agreement (“Co-operation Agreement”) pertaining to the co-operation described above, the provisions of this Agreement shall prevail.';
        let startYlineHeightScopeAndPurposeText2ndParagraph = totalHeightScopeAndPurpose + 4 ;  
        const splitScopeandPurposeText2ndParagraph = doc.splitTextToSize(scopeandPurposeText2ndParagraph, maxWidth);
        splitScopeandPurposeText2ndParagraph.forEach((lineScopeandPurposeText2ndParagraph, indexScopeandPurposeText2ndParagraph)=>{
          doc.text(lineScopeandPurposeText2ndParagraph, 20, startYlineHeightScopeAndPurposeText2ndParagraph + (indexScopeandPurposeText2ndParagraph * lineHeightScopeAndPurposeText));
        });
        const totalHeightScopeAndPurpose2ndParagraph = startYlineHeightScopeAndPurposeText2ndParagraph + (splitScopeandPurposeText2ndParagraph.length * lineHeightScopeAndPurposeText);

        doc.setFontSize(13);
        doc.text(['3. DEFINITIONS'],20, totalHeightScopeAndPurpose2ndParagraph + 5 );
        doc.setFontSize(11);

        const textDefinitions = 'The term Data Protection Laws shall mean all laws that apply to the processing of personal data, including but not limited to the Finnish Data Protection Act (1050/2018), the European Union’s General Data Protection Regulation (Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC, “GDPR”), possible amendments thereof, and any and all decisions, instructions, and guidelines concerning the processing of personal data issued by data protection authorities or courts of law. ';
        
        let startYTextDefinitions = totalHeightScopeAndPurpose2ndParagraph + 12;
        const splitTextDefinitions = doc.splitTextToSize(textDefinitions, maxWidth);
        splitTextDefinitions.forEach((lineTextDefinitions, indexTextDefinitions)=>{
          doc.text(lineTextDefinitions, 20, startYTextDefinitions + (indexTextDefinitions * lineHeightScopeAndPurposeText));
        });
        const totalHeightTextDefinitions1stParagraph =  startYTextDefinitions + (splitTextDefinitions.length * lineHeightScopeAndPurposeText);          

        let startYTextDefinitions2ndParagraph = totalHeightTextDefinitions1stParagraph +5;
        const textDefinitions2ndParagraph = 'Unless otherwise provided in this Agreement, the terms personal data, personal data processing, data processor, data controller, data subject, third party, data register, data protection authority and personal data breach shall be defined as in the GDPR.';
        const splitTextDefinitions2ndParagraph = doc.splitTextToSize(textDefinitions2ndParagraph, maxWidth);
        splitTextDefinitions2ndParagraph.forEach((lineTextDefinition2ndParagraph, indexTextDefinitions2ndParagraph)=>{
          doc.text(lineTextDefinition2ndParagraph, 20, startYTextDefinitions2ndParagraph + (indexTextDefinitions2ndParagraph * lineHeightScopeAndPurposeText));
        });

        totalTextDefinitionsHeight = startYTextDefinitions2ndParagraph + (splitTextDefinitions2ndParagraph.length * lineHeightScopeAndPurposeText);
        doc.setFontSize(13);
        doc.text(['4	SCOPE OF PROCESSING ACTIVITIES'],20, totalTextDefinitionsHeight + 5 );
        doc.setFontSize(11);
        let startYProcessingActivities = totalTextDefinitionsHeight + 10;
        const processingActivities = 'For the purposes referred to in Chapter 2 of this Agreement, the Parties shall '+
        '(Note: If a privacy notice has already been prepared, you may refer to the privacy notice here): ';
        const splitProcessingActivities = doc.splitTextToSize(processingActivities, maxWidth);
        splitProcessingActivities.forEach((lineProcessingActivities, indexProcessingActivities)=>{
          doc.text(lineProcessingActivities, 20, startYProcessingActivities + (indexProcessingActivities * lineHeightScopeAndPurposeText));
        });
        const totalHeightProcessingActivities = startYProcessingActivities + (splitProcessingActivities.length * lineHeightScopeAndPurposeText); 
        doc.text('What personal data is collected/processed?',20, totalHeightProcessingActivities + 5);
        doc.text(document.getElementById('whatPersonalDataCollected').value, 20, totalHeightProcessingActivities + 10);
        doc.text('Whose personal data is collected/processed?',20, totalHeightProcessingActivities + 15);
        doc.text(document.getElementById('whosePersonalDataCollected').value,20, totalHeightProcessingActivities+20 );
        doc.text('Why personal data is collected/processed?',20, totalHeightProcessingActivities + 25);
        doc.text(document.getElementById('whyPersonalDataCollected').value, 20, totalHeightProcessingActivities+ 30);
        doc.text('How personal data is collected/processed?',20, totalHeightProcessingActivities + 35);
        doc.text(document.getElementById('howPersonalDataCollected').value, 20, totalHeightProcessingActivities+ 40);

        doc.setFontSize(13);
        doc.text(['5. DATA PROCESSING'],20, totalHeightProcessingActivities + 45);
        doc.setFontSize(12);
        doc.text('5.1	Lawfulness of processing', 20, totalHeightProcessingActivities + 50);

        const textLawfulness = 'Each Party acts as a data controller as defined in Data Protection Laws and shall ensure that its processing activities under the Co-Operation Agreement and this Agreement are lawful under this Agreement and the applicable Data Protection Laws.';

        const TotalHeightLawfulnessOfProcessing = textParagraph();
        
        //const lawfulnessOfProcessing = 'Each Party acts as a data controller as defined in Data Protection Laws and shall ensure that its processing activities under the Co-Operation Agreement and this Agreement are lawful under this Agreement and the applicable Data Protection Laws.';




    doc.save('JCA.pdf');
}

function textParagraph (text, maxWidthText, startYLine, LineHeight){
  const textToSplit = text;
  splitTextIntoLine = doc.splitTextToSize(textToSplit, maxWidthText);
  splitTextIntoLine.forEach((lineText, indexLine)=>{
    doc.text(lineText, 20, startYLine + (indexLine * LineHeight));
  });
  const totalHeightText = startYLine + (splitTextIntoLine.length * LineHeight);

  return totalHeightText;

}

function formIsValid() {
    
    // list of the ID of the text Element fields
 /*   const textElement = [
        'nameParty',
        'placeTAU',
        'nameTAU',
        'titleTAU',
        'placeParty',
        'titleParty'
      ];*/



    // list of the ID of the textarea fields
    const textAreaElement = [
        'jCAParties',
        'scopeAndPurpose',
        'whatPersonalDataCollected',
        'whosePersonalDataCollected',
        'whyPersonalDataCollected',
        'howPersonalDataCollected',
        'collectionPersonalData',
        'howWhereWhomPersonalDataStored',
        'howLongPersonalDataStored',
        'securityMeasuresPersonalData',
        'formFormatDataTransferred',
        'howDataTransferred',
        'securedDataTransfer',
        'contactPersonExchangePersonalData',
        'usePersonalDataAfterCooperation',
        'securedDataTransfer',
        'securedDataTransfer',
        'securedDataTransfer'
      ];
        

        const allFieldsTextAreaFilled = textAreaElement.every(id => {
            const element = document.getElementById(id);
            return element && element.value.trim() !== "";
        });
        if(!allFieldsTextAreaFilled){
            return false;
        }

        var dateParty = document.getElementById('dateParty').value.trim();
        var dateTAU = document.getElementById('dateTAU').value.trim();
        var nameParty4 = document.getElementById('nameParty4').value.trim();
        var placeTAU = document.getElementById('placeTAU').value.trim();
        var nameTAU = document.getElementById('nameTAU').value.trim();
        var titleTAU = document.getElementById('titleTAU').value.trim();
        var placeParty = document.getElementById('placeParty').value.trim();
        var titleTAU = document.getElementById('titleTAU').value.trim();
        var titleParty = document.getElementById('titleParty').value.trim();


        if(!dateParty || !dateTAU || !nameParty4 || !placeTAU || !nameTAU || !titleTAU || !placeParty || !titleTAU || !titleParty){
        return false;
        }     

    return true;
}


        // //doc.text(document.getElementById('categoriesOfPersonalData').value, 20, 93);
        // const textValueCategoriesOfPersonalData = document.getElementById('categoriesOfPersonalData').value;
        // // Settings        
        // doc.setFontSize(fontSize);
        // const lineHeight = fontSize * 1.2 * 0.352778; // Convert points to mm, assuming 1.2 line height      
        // Split the text to fit within the specified width, respecting word boundaries
        //const splitTextCategoriesOfPersonalData = doc.splitTextToSize(textValueCategoriesOfPersonalData, maxWidth);
        // // Calculate the number of lines and the total height they will occupy
        // const totalHeightCategoriesOfPersonalData = splitTextCategoriesOfPersonalData.length * lineHeight;
        // // Initial Y position for the textarea content
        //const startYCategoriesOfPersonalData = 137;
        // // Output the split text, line by line
        // splitTextCategoriesOfPersonalData.forEach((lineCategoriesOfPersonalData, indexCategoriesOfPersonalData) => {
        // doc.text(lineCategoriesOfPersonalData, 20, startYCategoriesOfPersonalData + (indexCategoriesOfPersonalData * lineHeight));
        // });
        // // Calculate the Y position for the next text, adding a buffer
        // const nextYStarForPurposeOfPersonalData = startYCategoriesOfPersonalData + totalHeightCategoriesOfPersonalData + 7; // Adjust the buffer as needed, 7 in this case
        // // Use nextYStart for subsequent content positioning
        
        // doc.text('Purpose/purposes of processing personal data:', 20, nextYStarForPurposeOfPersonalData);
        
        // const textValuePurposeOfPersonalData = document.getElementById('purposeOfPersonalData').value;
        // const splitTextPurposeOfPersonalData = doc.splitTextToSize(textValuePurposeOfPersonalData, maxWidth);
        // const totalHeightPurposeOfPersonalData = splitTextPurposeOfPersonalData.length * lineHeight;
        // const startYPurposeOfPersonalData = nextYStarForPurposeOfPersonalData + 10;        
        // splitTextPurposeOfPersonalData.forEach((linePurposeOfPersonalData, indexPurposeOfPersonalData)=>{
        //     doc.text(linePurposeOfPersonalData, 20, startYPurposeOfPersonalData +(indexPurposeOfPersonalData * lineHeight));
        // });
        // const nextYStartStoreOfPersonalData = startYPurposeOfPersonalData + totalHeightPurposeOfPersonalData + 7;
        // StoreOfPersonalData
        
        // doc.text(['Where will personal data be stored (system/records)? Who will process personal data?',
        //           'Provide the name or other identifier of a possible research project.'], 20, nextYStartStoreOfPersonalData);
        
        // const textValueOfStoreOfPersonalData = document.getElementById('storeOfPersonalData').value;
        // const splitTextStoreOfPersonalData = doc.splitTextToSize(textValueOfStoreOfPersonalData, maxWidth);
        // const totalHeightStoreOfPersonalData = splitTextStoreOfPersonalData.length * lineHeight;
        // const startYStoreOfPersonalData = nextYStartStoreOfPersonalData + 10;
        // splitTextStoreOfPersonalData.forEach((lineStoreOfPersonalData, indexStoreOfPersonalData)=>{
        //     doc.text(lineStoreOfPersonalData, 20, startYStoreOfPersonalData + (indexStoreOfPersonalData + lineHeight));
        // });
        // const nextYForOtherInformation = startYStoreOfPersonalData + totalHeightStoreOfPersonalData + 10;
        // // OtherInformation
        
        // doc.text('Other information (for example, will you be processing personal data relating to children?).', 20, nextYForOtherInformation);
        
        // const textValueOtherInformation = document.getElementById('otherInformation').value;
        // const splitTextOtherInformation = doc.splitTextSize(textValueOtherInformation, maxWidth);
        // const totalHeightOtherInformation = splitTextOtherInformation.lenght * lineHeight;
        // const startYOtherInformation = nextYForOtherInformation + 10;
        // splitTextOtherInformation.forEach ((lineOtherInformation, indexOtherInformation)=>{
        //     doc.text(lineOtherInformation, 20, startYOtherInformation + (indexOtherInformation + lineHeight));
        // });
        // const nextYForAppropriatedBasis = startYOtherInformation + totalHeightOtherInformation + 10;

        // // Checked Yes the button for legitimate interests as the most appropriate basis for processing personal data
        // doc.setFont(undefined, 'bold');
        // doc.text('Balancing Test', 20, nextYForAppropriatedBasis);
        // doc.setFont(undefined, 'normal');

        // if (document.getElementById('legitimateInterestYes').checked){

        // }
   
   // const legalBases = document.getElementById('legalBasescanOrcannot').value;
    //const text = `Based on the balancing test, legitimate interests ${legalBases} as the lawful basis for processing the types of personal data referred to above.`;

   // doc.text(text, 10, 10);