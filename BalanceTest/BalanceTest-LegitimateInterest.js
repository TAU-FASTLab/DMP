function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Define the title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold"); 
    doc.text('Legal Basis', 20, 30);
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
    doc.setFontSize(10);
   
    // Retrieve the value of the selected item for Legal Basis
    const legalBasesSelection = document.getElementById('legalBases');
    let selectedValueLegalBasis = legalBasesSelection.value;
    // Text before the variable, in normal font
    doc.setFont(undefined, "normal");
    doc.text("The selected legal basis is:", 20, 42);  

    // Change the font to bold for the variable part
    doc.setFont(undefined, "bold");
    doc.text(selectedValueLegalBasis, doc.getTextWidth("The selected legal basis is:") + 18, 42);

    if (document.getElementById('legalBases').value == 'Legitimate Interest'){

        doc.setFontSize(11);
        doc.text(['BALANCING TEST: THE DATA CONTROLLER’S LEGITIMATE INTERESTS AS A LEGAL ',
        'BASIS FOR PROCESSING PERSONAL DATA'], 20, 59);
        doc.setFontSize(10);
        const fontSize = 10; // Example font size
        doc.setFont(undefined,'normal');
        doc.text('The EU’s General Data Protection Regulation (GDPR, EU 2016/679)', 20, 69);
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
        doc.text('Is legitimate interests the most appropriate basis for processing personal data?', 20, nextYForAppropriatedBasis + 10 );
        doc.text()

        if (document.getElementById('legitimateInterestYes').checked){








        }



   
   // const legalBases = document.getElementById('legalBasescanOrcannot').value;
    //const text = `Based on the balancing test, legitimate interests ${legalBases} as the lawful basis for processing the types of personal data referred to above.`;

   // doc.text(text, 10, 10);
    }
    doc.save('BalanceTest.pdf');
}

function formIsValid() {
    // List all required question names or IDs for <select> elements
    const requiredQuestions = [
      'legalBases'
    ];

    // Check each required question to ensure a selection has been made
    for (let i = 0; i < requiredQuestions.length; i++) {
            // Use `select` instead of `input` and check for value directly
        const element = document.getElementById(requiredQuestions[i]);
        if (!element || element.value === "") {
            return false; // If a required question has no selection made, return false
        }
    }
    // list of the ID of the textarea fields
    const textAreaElement = [
        'categoriesOfPersonalData',
        'purposeOfPersonalData',
        'storeOfPersonalData',
        'informingDataSubjects',
        'place',
        'date',
        'person',
        'placeDpo',
        'dateDpo',
        'dpo'
      ];
        
      if (document.getElementById('legalBases').value == 'Legitimate Interest') {
        const allFieldsFilled = textAreaElement.every(id => {
            const element = document.getElementById(id);
            return element && element.value.trim() !== "";
        });
      
      if(!(document.getElementById('legitimateInterestYes').checked || document.getElementById('legitimateInterestNo').checked)){
        return false;
      }  
    
    if (document.getElementById('legitimateInterestYes').checked) { 

            const textAreaElementAppropriatedBases = [
                'appropriatedBasis',
                'legalInterest',
                'clearInterest',
                'genuineInterest'
                ];        
            if (document.getElementById('legitimateInterestYes').checked){
                const allFieldsFilledForAppropiatedBases = textAreaElementAppropriatedBases.every(idAppropriatedBases =>{
                    const elementAppropriatedBases = document.getElementById(idAppropriatedBases);
                    return elementAppropriatedBases && elementAppropriatedBases.value.trim() !== "";
                });
            
                if(!allFieldsFilledForAppropiatedBases){
                    return false;
                }    
            
            }    

            if(!(document.getElementById('allRequirementsMetYes').checked || document.getElementById('allRequirementsMetNo').checked)){
                return false;
            }

            if(document.getElementById('allRequirementsMetYes').checked){

                if(!(document.getElementById('lessIntrusive') && document.getElementById('lessIntrusive').value.trim() !== "")){
                    return false;
                }
                if(!(document.getElementById('achieveLessIntrusiveNo').checked || document.getElementById('achieveLessIntrusiveYes').checked)){
                    return false;
                }
            
                if (document.getElementById('achieveLessIntrusiveNo').checked){
                            lessIntrusiveTextArea = document.getElementById('lessIntrusive');
                            impactOfProcessingTextArea = document.getElementById('impactOfProcessing');
                            if(!(lessIntrusiveTextArea && lessIntrusiveTextArea.value.trim() !== "" && impactOfProcessingTextArea && impactOfProcessingTextArea.value.trim() !== "")){
                                return false;
                            }                    
                        

                        if(!(document.getElementById('rightsAndInterestYes').checked || document.getElementById('rightsAndInterestNo').checked)){
                            return false;
                        }

                
                        if(document.getElementById('rightsAndInterestYes').checked){
                            if(!(document.getElementById('additionalSafeguards') && document.getElementById('additionalSafeguards').value.trim() !== "")){
                                return false;
                            }
                        }
                }

             }
    }

    if(!(document.getElementById('legalBasescanOrcannot').value == "canBeUsed" || document.getElementById('legalBasescanOrcannot').value == "cannotBeUsed")){
        return false;
    }  

        return allFieldsFilled;
    }


//    if(document.getElementById('legalBases').value == 'Legitimate Interest') { 
//      // Retrieve the value of the selected item of the textarea for Legal Basis    
//          for (let j =0; j < textAreaElement.length; j++){
//              const balanceTestElement = document.getElementById(textAreaElement[j]);
//              if (!balanceTestElement || balanceTestElement.value.trim() === ""){
//                  return false;
//              }
//          }
//     }

//     var legitimateInterestYesChecked = document.getElementById('legitimateInterestYes').checked;
//     var legitimateInterestNoChecked = document.getElementById('legitimateInterestNo').checked;

//     if (!(legitimateInterestYesChecked || legitimateInterestNoChecked)) {
//         return false; // Prevent form submission
//     }

//     var allRequirementsMetYesChecked = document.getElementById('allRequirementsMetYes').checked;
//     var allRequirementsMetNoChecked = document.getElementById('allRequirementsMetNo').checked;

//     if (!(allRequirementsMetYesChecked || allRequirementsMetNoChecked)) {
//         return false; // Prevent form submission
//     }

//     var achieveLessIntrusiveYesChecked = document.getElementById('achieveLessIntrusiveYes').checked;
//     var achieveLessIntrusiveNoChecked = document.getElementById('achieveLessIntrusiveNo').checked;
//     if (!(achieveLessIntrusiveNoChecked || achieveLessIntrusiveYesChecked)) {
//         return false;
//     }

//     var rightsAndInterestYesChecked = document.getElementById('rightsAndInterestYes').checked;
//     var rightsAndInterestNoChecked = document.getElementById('rightsAndInterestNo').checked;
//     if (!(rightsAndInterestYesChecked || rightsAndInterestNoChecked)){
//         return false;
//     }

//     var place = document.getElementById('place').value.trim();
//     var date = document.getElementById('date').value.trim();
//     var person = document.getElementById('person').value.trim();
//     var placeDpo = document.getElementById('placeDpo').value.trim();
//     var dateDpo = document.getElementById('dateDpo').value.trim();
//     var dpo = document.getElementById('dpo').value.trim();
//     var legalBases = document.getElementById('legalBasescanOrcannot').value;

//     if(!place || !date || !person || !placeDpo || !dateDpo || !dpo || legalBases === ''){
//         return false;
//     }

// } 
      // If the code reaches this point, all required questions have a selection made


 return true;
}
