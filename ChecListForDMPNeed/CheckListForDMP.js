      function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Define the title
        doc.setFontSize(16);
        doc.setFont(undefined, "bold"); 
        doc.text('Data protection – personal data: CheckList Results', 20, 30);
        
        //1. Processing of personal data 
        doc.setFontSize(12);
        doc.text('1. Processing of personal data', 20, 45);
        // Define the question
        doc.setFont(undefined, "normal"); 
        doc.setFontSize(10);
        doc.text([
          'Will personal data be processed during your study? The term "personal data" is broadly defined',
          'and refers to all information relating to an identified or identifiable natural person.'
        ], 20, 52);      
        // Retrieve the value of the selected radio button for processingData
        let selectedValueProcessingData = '';
        const processingDataRadios = document.getElementsByName('processingData');
        for (const radio of processingDataRadios) {
          if (radio.checked) {
            selectedValueProcessingData = radio.value;
            break;
          }
        }        
        // Add the selected value to the PDF
        // Set font to bold for the selected value
        doc.setFont(undefined, "bold");
        doc.setFontSize(10);
        if (selectedValueProcessingData) {
            // First, add the non-bold part of the text
            doc.setFont(undefined, "normal"); // Set the font style to normal
            doc.setFontSize(10);
            doc.text('Do Personal data will be processed?: ', 20, 62);

            // Then, measure the width of the non-bold text to place the bold text correctly
            var nonBoldWidth = doc.getStringUnitWidth('Do Personal data will be processed?: ') * doc.internal.getFontSize() / doc.internal.scaleFactor;

            // Now, add the bold part of the text
            doc.setFont(undefined, "bold"); // Set the font style to bold
            doc.text(selectedValueProcessingData, 20 + nonBoldWidth, 62);
        }
        // 2. Assessment of data protection risks
        //adding into the PDF
        doc.setFont(undefined, "bold");
        doc.setFontSize(12);
        doc.text('2. Assessment of data protection risks', 20, 72);
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.text([
          'Assess whether the processing of personal data poses risks to your data subjects.',
          'Please conduct a pre-assessment to find out whether a more extensive data protection impact assessment',
          'is needed.',
        ], 20, 80);
        // Retrieve the value of the selected radio button for assessmentdata
        let selectedValueAssessmentData = '';
        const assessmentDataRadios = document.getElementsByName('assessmentdata');
        for (const radio of assessmentDataRadios) {
          if (radio.checked) {
            selectedValueAssessmentData = radio.value;
            break;
          }
        }        
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
       // Get the selected DPIA assessment value
        let selectedDPIAData = '';
        const DPIADataRadios = document.getElementsByName('dpiAssessment');
        for (const radio of DPIADataRadios) {
          if (radio.checked) {
            selectedDPIAData = radio.nextElementSibling.textContent;

          }
        }
        //console.log('DPIA Assessment:', selectedDPIAData);  // Debug log
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
      //console.log('DPIA Completion Status:', dpiCompletionStatus);  // Debug log

      //         // Coordinates and dimensions for the frame
      //   const frameX = 10;      // X-coordinate for the frame
      //   const frameY = 10;      // Y-coordinate for the frame
      //   const frameWidth = 190; // The width of the frame
      //   const frameHeight = 60; // The height of the frame
        
      //   // Draw a rectangle to create the frame
      //   doc.setDrawColor(0); // Set draw color to black
      //   doc.setLineWidth(0.5); // Set line width to 0.5 units
      //   doc.rect(frameX, frameY, frameWidth, frameHeight);
        doc.setFont(undefined, "normal");
        doc.setFontSize(11);
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
        
        //***********************
        //3. Informing your research participants 
        
        doc.setFontSize(12);
        doc.setFont(undefined, "bold"); 
        // Regular text
        doc.text('3. Informing your research participants', 20, 160);
        doc.setFont(undefined, "normal"); 
        doc.setFontSize(10);
        doc.text('Have you prepared a research privacy notice? Link to templates', 20, 165);

        // Measure the width of the preceding text to get the X position for the link text.
        const linkText = 'Privacy notice templates';
        const textWidth = doc.getStringUnitWidth('Have you prepared a research privacy notice? Link to templates') * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const linkXPosition = 20 + textWidth + 2; // Plus 2 for a small space between the link and preceding text

        // Set the color for the link text and position it near the previous text.
        doc.setTextColor(0, 0, 255); // Set text color to blue for link appearance
        doc.text(linkText, linkXPosition, 165);

        // Add the link. The Y position is slightly above the line of text to include the height of text.
        doc.link(linkXPosition, 165 - 10, doc.getStringUnitWidth(linkText) * doc.internal.getFontSize() / doc.internal.scaleFactor, 10, { url: 'https://www.tuni.fi/en/research/responsible-research/data-protection#expander-trigger--15950926-4420-44b7-9696-0dcf562d02c0' });

        // Continue with the next segment of text.
        doc.setTextColor(0); // Revert text color to black for regular text
        doc.text(['and other necessary documents (such as a participant information sheet and consent form) that are written',
                  'in a clear and understandable language and decided how to deliver the necessary information to your',
                  'research participants?'], 20, 170);        

        let informingResearchParticipants = '';
        const informingResearchParticipantsRadios = document.getElementsByName('privacynotice');
        for (const radio of informingResearchParticipantsRadios) {
          if (radio.checked) {
            informingResearchParticipants = radio.value;
            break;
          }
        }        
        // Add the selected value to the PDF
        // Set font to bold for the selected value
        doc.setFont(undefined, "bold");
        doc.setFontSize(10);
        if (informingResearchParticipants) {
            // First, add the non-bold part of the text
            doc.setFont(undefined, "normal"); // Set the font style to normal
            doc.setFontSize(10);
            doc.text('Research Privacy Notice Prepared: ', 20, 184);
           //doc.text(informingResearchParticipants, 20, 176);

            // Then, measure the width of the non-bold text to place the bold text correctly
            var nonBoldWidth_informingResearchParticipants = doc.getStringUnitWidth('Do Personal data will be processed?: ') * doc.internal.getFontSize() / doc.internal.scaleFactor;

            // Now, add the bold part of the text
            doc.setFont(undefined, "bold"); // Set the font style to bold
            doc.text(informingResearchParticipants, 20 + nonBoldWidth_informingResearchParticipants, 184);
        }

        //********************** */


        //***********************
        //4. Roles of data processors 
        doc.setFontSize(12);
        doc.setFont(undefined, "bold"); 
        // Regular text
        doc.text('4. Roles of data processors', 20, 195);
        doc.setFont(undefined, "normal");
        doc.setFontSize(10);
        doc.text(['The research activities may involve one or more research institutions, principal investigators, customers,',
                 'researchers, and other staff members who carry out the actual processing activities in the course of the study.',
                 'The roles of different stakeholders and the responsibilities of the data controller must be clearly defined ',
                 'before research begins.',
                 'Have you defined the roles and responsibilities of other parties involved in the processing activities (such as ',
                 'possible other research organisations or third-party data processors)? If you need help with defining the roles, ',
                 'please email dpo@tuni.fi.'], 20, 202);
        
        let roleOfDataProcessors = '';
        const roleOfDataProcessorsRadios = document.getElementsByName('dataprocessorrole');
        for (const radio of roleOfDataProcessorsRadios) {
          if (radio.checked) {
            roleOfDataProcessors = radio.value;
            break;
          }
        }        
        // Add the selected value to the PDF
        // Set font to bold for the selected value
        doc.setFont(undefined, "bold");
        doc.setFontSize(10);
        if (roleOfDataProcessors) {
            // First, add the non-bold part of the text
            doc.setFontSize(10);
            doc.text(roleOfDataProcessors, 20, 231);

            // Then, measure the width of the non-bold text to place the bold text correctly
            //var nonBoldWidth_roleOfDataProcessors = doc.getStringUnitWidth('Do Personal data will be processed?: ') * doc.internal.getFontSize() / doc.internal.scaleFactor;

            // Now, add the bold part of the text
            //doc.setFont(undefined, "bold"); // Set the font style to bold
            //doc.text(roleOfDataProcessors, 20 + nonBoldWidth_roleOfDataProcessors, 228);
        }

        //********************** */
 
        //***********************
        //5. Agreeing on the processing of personal data 
        doc.setFontSize(12);
        doc.setFont(undefined, "bold"); 
        // Regular text
        doc.text('5. Agreeing on the processing of personal data', 20, 239);
        doc.setFont(undefined, "normal");
        doc.setFontSize(10);
        doc.text(['If subcontractors are employed in the performance of research tasks (for example, as providers of transcription',
                  'services or web-based data storage services) they must sign a data processing agreement (DPA). If the purpose  ',
                  'and means of processing personal data are determined by multiple parties (meaning they process personal data ',
                  'together for shared purposes), they must sign a joint data controller agreement. If research data is acquired' ,
                  'of and access to data. Have you drawn up the necessary data processing from a third party (such as a hospital ',
                  'district), the parties must enter an agreement that governs the transfer agreements? '], 20, 246)
        
        let AgreeProcessingPerData = '';
        const AgreeProcessingPerDataRadios = document.getElementsByName('agreeprocessingpersonaldata');
        for (const radio of AgreeProcessingPerDataRadios) {
          if (radio.checked) {
            AgreeProcessingPerData = radio.value;
            break;
          }
        }        
        // Add the selected value to the PDF
        // Set font to bold for the selected value
        doc.setFont(undefined, "bold");
        doc.setFontSize(10);
        if (AgreeProcessingPerData) {
            // First, add the non-bold part of the text
            doc.setFont(undefined, "normal"); // Set the font style to normal
            doc.setFontSize(10);
            doc.text('Have you drawn up the necessary data processing agreements?: ', 20, 271);

            // Then, measure the width of the non-bold text to place the bold text correctly
            var nonBoldWidth_AgreeProcessingPerData = doc.getStringUnitWidth('Have you drawn up the necessary data processing agreements?: ') * doc.internal.getFontSize() / doc.internal.scaleFactor;

            // Now, add the bold part of the text
            doc.setFont(undefined, "bold"); // Set the font style to bold
            doc.text(AgreeProcessingPerData, 20 + nonBoldWidth_AgreeProcessingPerData, 271);
        }

        //********************** */
        
                 // Save the PDF
        doc.save('CheclListForDMPNeed.pdf');
    }   
