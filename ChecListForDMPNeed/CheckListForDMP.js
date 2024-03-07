      function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
      
        // Retrieve the value of the selected radio button for processingData
        let selectedValueProcessingData = '';
        const processingDataRadios = document.getElementsByName('processingData');
        for (const radio of processingDataRadios) {
          if (radio.checked) {
            selectedValueProcessingData = radio.value;
            break;
          }
        }

        // Retrieve the value of the selected radio button for assessmentdata
        let selectedValueAssessmentData = '';
        const assessmentDataRadios = document.getElementsByName('assessmentdata');
        for (const radio of assessmentDataRadios) {
          if (radio.checked) {
            selectedValueAssessmentData = radio.value;
            break;
          }
        }
               
        // Get the selected DPIA assessment value
        let selectedDPIAData = '';
        const DPIADataRadios = document.getElementsByName('dpiAssessment');
        for (const radio of DPIADataRadios) {
          if (radio.checked) {
            selectedDPIAData = radio.nextElementSibling.textContent;

          }
        }
        console.log('DPIA Assessment:', selectedDPIAData);  // Debug log
        // Get the selected DPIA completion status value
        let dpiCompletionStatus = '';
        if (document.getElementById('dpiASection').style.display !== 'none') {
        const dpiCompletionRadios = document.getElementsByName('dpiCompleted');
        for (const radio of dpiCompletionRadios) {
            if (radio.checked) {
            dpiCompletionStatus = radio.nextElementSibling.textContent;

            }
        }
        }
        console.log('DPIA Completion Status:', dpiCompletionStatus);  // Debug log

      //         // Coordinates and dimensions for the frame
      //   const frameX = 10;      // X-coordinate for the frame
      //   const frameY = 10;      // Y-coordinate for the frame
      //   const frameWidth = 190; // The width of the frame
      //   const frameHeight = 60; // The height of the frame
        
      //   // Draw a rectangle to create the frame
      //   doc.setDrawColor(0); // Set draw color to black
      //   doc.setLineWidth(0.5); // Set line width to 0.5 units
      //   doc.rect(frameX, frameY, frameWidth, frameHeight);
    
        // Define the title
        doc.setFontSize(16);
        doc.text('Data protection – personal data: CheckList', 20, 30);
    
        // 1. Processing of Personal Data
        doc.setFontSize(12);
        doc.text('1. Processing of personal data', 20, 45);
    
        // Define the question
        doc.setFontSize(10);
        doc.text([
          'Will personal data be processed during your study? The term "personal data" is broadly defined',
          'and refers to all information relating to an identified or identifiable natural person.'
        ], 20, 52);
        
        // Optionally add the selected value to the PDF
        // Set font to bold for the selected value
        doc.setFont(undefined, "bold");
        doc.setFontSize(10);
        if (selectedValueProcessingData) {
            // First, add the non-bold part of the text
            doc.setFont(undefined, "normal"); // Set the font style to normal
            doc.setFontSize(10);
            doc.text('Personal data will be processed: ', 20, 62);

            // Then, measure the width of the non-bold text to place the bold text correctly
            var nonBoldWidth = doc.getStringUnitWidth('Personal data will be processed: ') * doc.internal.getFontSize() / doc.internal.scaleFactor;

            // Now, add the bold part of the text
            doc.setFont(undefined, "bold"); // Set the font style to bold
            doc.text(selectedValueProcessingData, 20 + nonBoldWidth, 62);
        }

        // 2.	Assessment of data protection risks
        doc.setFont(undefined, "normal");
        doc.setFontSize(12);
        doc.text('2. Assessment of data protection risks', 20, 72);
    
        // Define the question
        doc.setFont(undefined, "normal");
        doc.setFontSize(10);
        doc.text([
          'Assess whether the processing of personal data poses risks to your data subjects.',
          'Please conduct a pre-assessment to find out whether a more extensive data protection impact assessment',
          'is needed.',
        ], 20, 80);
        
        // Optionally add the selected value to the PDF
        doc.setFont(undefined, "bold");
        doc.setFontSize(10);
        if (selectedValueAssessmentData) {
        // First, add the non-bold part of the text
            doc.setFont(undefined, "normal"); // Set the font style to normal
            doc.setFontSize(10);
            doc.text('Have you assessed and documented the risks associated with processing personal data?: ', 20, 97);

            // Then, measure the width of the non-bold text to place the bold text correctly
            var nonBoldWidth_personaldata = doc.getStringUnitWidth('Have you assessed and documented the risks associated with processing personal data?: ') * doc.internal.getFontSize() / doc.internal.scaleFactor;

            // Now, add the bold part of the text
            doc.setFont(undefined, "bold"); // Set the font style to bold
            doc.text(selectedValueAssessmentData, 20 + nonBoldWidth_personaldata, 97);
        //  doc.text(`Have you assessed and documented the risks associated with processing personal data?: ${selectedValueAssessmentData}`, 20, 115);
        }

        doc.setFont(undefined, "normal");
        doc.setFontSize(12);
        doc.text('Assessing the need for a DPIA ', 20, 107);
        doc.setFontSize(10);
        doc.text(['If your processing activities are likely to result in a high risk to the rights and freedoms of data subjects',
                  'you will need to complete a more extensive Data Protection Impact Assessment (DPIA) DPIA template.',
                  'To read more, go to the Impact assessment page on the website of the Office of the Data Protection',
                  'Ombudsman. Before completing a DPIA, please be sure to consult with the data protection officer of',
                  'Tampere Universities (dpo@tuni.fi). '], 20, 115);
        // DPIA Assessment Result
        doc.setFontSize(10);
        var nonBoldWidth_assessedDPIA = doc.getStringUnitWidth('Have you assessed the need for a DPIA?: ') * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text('Have you assessed the need for a DPIA?:', 20, 140);
        doc.setFont(undefined, "bold"); 
        //doc.text(selectedDPIAData, 20, 145);
        doc.text(selectedDPIAData, 20 + nonBoldWidth_assessedDPIA, 140);
        // DPIA Completion Status Result
        if (dpiCompletionStatus) {
        doc.setFontSize(10);
        doc.setFont(undefined, "normal"); 
        var nonBoldWidth_assessedDPIAwithDPO = doc.getStringUnitWidth('DPIA has been completed in collaboration with the data protection officer (dpo@tuni.fi): ') * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text('DPIA has been completed in collaboration with the data protection officer (dpo@tuni.fi):', 20, 150);
        doc.setFont(undefined, "bold"); 
        //doc.text(dpiCompletionStatus, 20, 155);
        doc.text(dpiCompletionStatus, 20 + nonBoldWidth_assessedDPIAwithDPO, 150);
        }
   
        // Save the PDF
        doc.save('CheclListForDMPNeed.pdf');
    }
