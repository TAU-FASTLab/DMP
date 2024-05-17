function generatePDF() {
    try {
        const doc = new jsPDF.jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        let x = 10;  // Left margin
        let y = 10;  // Top margin
        const lineHeight = 10;

        // Title
        doc.setFontSize(16);
        doc.text('Informed Consent Form', 105, y, null, null, 'center');
        y += lineHeight * 2;

        // Dynamic fields from the form
        const fields = ['studyName', 'placeDate', 'nameInBlockLetters', 'signature', 'phoneNumber', 'emailAddress'];
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element && element.value.trim() !== '') {
                doc.text(`${field}: ${element.value}`, x, y);
                y += lineHeight;
                if (y > 280) {  // Near the bottom of the page
                    doc.addPage();
                    y = 10;  // Reset y
                }
            }
        });

        // Footer
        doc.text('F-33904 Tampere University, Finland | Tel. +358 294 5211 | Business ID: 0245901-3 | www.tuni.fi', 105, 287, null, null, 'center');

        // Save the PDF
        doc.save('informed_consent_form.pdf');
    } catch (error) {
        console.error("Error generating PDF", error);
    }
}
