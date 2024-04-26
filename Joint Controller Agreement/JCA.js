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
    doc.text("Joint Controller Agreement for", 20, 42);
    doc.text(document.getElementById('nameParty').value + document.getElementById('nameParty').identificationParty , doc.getTextWidth("Joint Controller Agreement for "), 42); 

    doc.setFontSize(13);
    doc.text(['1. PARTIES'], 20, 59);
        doc.setFontSize(11);
        const fontSize = 11; 
        doc.setFont(undefined,'normal');
        doc.text('This joint controller agreement (the ”Agreement”) is entered into by and between the following parties:', 20, 69);
        doc.text



        const introductoryText = 'The lawful basis for processing personal data may be the legitimate interests of the data controller or a third party. '+
         'If you choose to rely on legitimate interests, you are taking on extra responsibility for considering and protecting the rights and ' +
         'freedoms of the individuals whose data you are processing. Interests are more likely to be legitimate when there is a relevant and ' +
         'appropriate relationship between the data controller and the individuals who can be, for example, customers, students or employees. ' +
         'The data controller must carry out a balancing test to ensure that individuals’ rights and interests do not override the data controller’s legitimate interests to process their data.';
         const lineHeightIntroduction = fontSize * 1.2 * 0.352778; // Convert points to mm, assuming 1.2 line height
        // Use splitTextToSize to split the long text into lines that fit within the specified maxWidth
        
         // Initial Y position for the first line of text
         let startYIntroductoryText = 76;         
         // Output the text, line by line, with dynamic positioning
         const splitTextIntroductoryText = doc.splitTextToSize(introductoryText, maxWidth); 
         splitTextIntroductoryText.forEach((lineIntroductoryText, indexIntroductoryText) => {
           doc.text(lineIntroductoryText, 20, startYIntroductoryText + (indexIntroductoryText * lineHeightIntroduction));
         });
        const totalHeightIntroductoryText = startYIntroductoryText + (splitTextIntroductoryText.length * lineHeightIntroduction);
        doc.setFont(undefined,'bold');
        doc.text('Description of processing', 20, totalHeightIntroductoryText + 7);
        doc.setFont(undefined,'normal');
        doc.text('List the categories and types of personal data that you will process:',20, totalHeightIntroductoryText + 17);
        //doc.text(document.getElementById('categoriesOfPersonalData').value, 20, 93);
        const textValueCategoriesOfPersonalData = document.getElementById('categoriesOfPersonalData').value;
        // Settings        
        doc.setFontSize(fontSize);
        const lineHeight = fontSize * 1.2 * 0.352778; // Convert points to mm, assuming 1.2 line height      
        // Split the text to fit within the specified width, respecting word boundaries
        const splitTextCategoriesOfPersonalData = doc.splitTextToSize(textValueCategoriesOfPersonalData, maxWidth);
        // Calculate the number of lines and the total height they will occupy
        const totalHeightCategoriesOfPersonalData = splitTextCategoriesOfPersonalData.length * lineHeight;
        // Initial Y position for the textarea content
        const startYCategoriesOfPersonalData = 137;
        // Output the split text, line by line
        splitTextCategoriesOfPersonalData.forEach((lineCategoriesOfPersonalData, indexCategoriesOfPersonalData) => {
        doc.text(lineCategoriesOfPersonalData, 20, startYCategoriesOfPersonalData + (indexCategoriesOfPersonalData * lineHeight));
        });
        // Calculate the Y position for the next text, adding a buffer
        const nextYStarForPurposeOfPersonalData = startYCategoriesOfPersonalData + totalHeightCategoriesOfPersonalData + 7; // Adjust the buffer as needed, 7 in this case
        // Use nextYStart for subsequent content positioning
        
        doc.text('Purpose/purposes of processing personal data:', 20, nextYStarForPurposeOfPersonalData);
        
        const textValuePurposeOfPersonalData = document.getElementById('purposeOfPersonalData').value;
        const splitTextPurposeOfPersonalData = doc.splitTextToSize(textValuePurposeOfPersonalData, maxWidth);
        const totalHeightPurposeOfPersonalData = splitTextPurposeOfPersonalData.length * lineHeight;
        const startYPurposeOfPersonalData = nextYStarForPurposeOfPersonalData + 10;        
        splitTextPurposeOfPersonalData.forEach((linePurposeOfPersonalData, indexPurposeOfPersonalData)=>{
            doc.text(linePurposeOfPersonalData, 20, startYPurposeOfPersonalData +(indexPurposeOfPersonalData * lineHeight));
        });
        const nextYStartStoreOfPersonalData = startYPurposeOfPersonalData + totalHeightPurposeOfPersonalData + 7;
        // StoreOfPersonalData
        
        doc.text(['Where will personal data be stored (system/records)? Who will process personal data?',
                  'Provide the name or other identifier of a possible research project.'], 20, nextYStartStoreOfPersonalData);
        
        const textValueOfStoreOfPersonalData = document.getElementById('storeOfPersonalData').value;
        const splitTextStoreOfPersonalData = doc.splitTextToSize(textValueOfStoreOfPersonalData, maxWidth);
        const totalHeightStoreOfPersonalData = splitTextStoreOfPersonalData.length * lineHeight;
        const startYStoreOfPersonalData = nextYStartStoreOfPersonalData + 10;
        splitTextStoreOfPersonalData.forEach((lineStoreOfPersonalData, indexStoreOfPersonalData)=>{
            doc.text(lineStoreOfPersonalData, 20, startYStoreOfPersonalData + (indexStoreOfPersonalData + lineHeight));
        });
        const nextYForOtherInformation = startYStoreOfPersonalData + totalHeightStoreOfPersonalData + 10;
        // OtherInformation
        
        doc.text('Other information (for example, will you be processing personal data relating to children?).', 20, nextYForOtherInformation);
        
        const textValueOtherInformation = document.getElementById('otherInformation').value;
        const splitTextOtherInformation = doc.splitTextSize(textValueOtherInformation, maxWidth);
        const totalHeightOtherInformation = splitTextOtherInformation.lenght * lineHeight;
        const startYOtherInformation = nextYForOtherInformation + 10;
        splitTextOtherInformation.forEach ((lineOtherInformation, indexOtherInformation)=>{
            doc.text(lineOtherInformation, 20, startYOtherInformation + (indexOtherInformation + lineHeight));
        });
        const nextYForAppropriatedBasis = startYOtherInformation + totalHeightOtherInformation + 10;

        // Checked Yes the button for legitimate interests as the most appropriate basis for processing personal data
        doc.setFont(undefined, 'bold');
        doc.text('Balancing Test', 20, nextYForAppropriatedBasis);
        doc.setFont(undefined, 'normal');

        if (document.getElementById('legitimateInterestYes').checked){

        }



   
   // const legalBases = document.getElementById('legalBasescanOrcannot').value;
    //const text = `Based on the balancing test, legitimate interests ${legalBases} as the lawful basis for processing the types of personal data referred to above.`;

   // doc.text(text, 10, 10);
    
    doc.save('JCA.pdf');
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
        var nameParty = document.getElementById('nameParty').value.trim();
        var placeTAU = document.getElementById('placeTAU').value.trim();
        var nameTAU = document.getElementById('nameTAU').value.trim();
        var titleTAU = document.getElementById('titleTAU').value.trim();
        var placeParty = document.getElementById('placeParty').value.trim();
        var titleTAU = document.getElementById('titleTAU').value.trim();
        var titleParty = document.getElementById('titleParty').value.trim();


        if(!dateParty || !dateTAU || !nameParty || !placeTAU || !nameTAU || !titleTAU || !placeParty || !titleTAU || !titleParty){
        return false;
        }     

    return true;
}