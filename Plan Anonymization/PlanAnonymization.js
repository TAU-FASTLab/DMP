function generateEditablePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    let y = 10; // Initial vertical position

    // First, validate all fields are filled
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert('Please complete all the fields.');
            return; // Stop the function if any field is empty
        }
    }

    // Document Title
    const title = 'Anonymization Plan Version 1.0 (12.4.2019) - Finnish Social Science Data Archive';
    let titleLines = doc.splitTextToSize(title, 190); // Wrap text at 190mm width
    doc.setFont('helvetica', 'bold'); // Set font to bold for the title
    doc.setFontSize(12); // Increase font size for better visibility
    doc.text(titleLines, 10, y);
    y += titleLines.length * 7 + 5;

    // Reset font style for other texts
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    // Handle each fieldset and its contents
    document.querySelectorAll('fieldset').forEach(fieldset => {
        let legend = fieldset.querySelector('legend');
        if (legend) {
            let legendLines = doc.splitTextToSize(legend.textContent.trim(), 190);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(legendLines, 10, y);
            y += legendLines.length * 7 + 2;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
        }

        const elements = fieldset.querySelectorAll('label, p, input[type="text"], textarea');
        elements.forEach(el => {
            if (el.tagName.toLowerCase() === 'label') {
                let lines = doc.splitTextToSize(el.textContent.trim(), 190); /* + ':'*/
                doc.text(lines, 10, y);
                y += lines.length * 7;
            } else if (el.tagName.toLowerCase() === 'p') {
                if (el.querySelector('a')) {
                    let pText = el.textContent.trim();
                    let pLines = doc.splitTextToSize(pText, 190);
                    doc.setTextColor(0, 0, 255);
                    doc.text(pLines, 10, y);
                    doc.setTextColor(0, 0, 0);
                    let linkStartY = y + (pLines.length - 1) * 7;
                    doc.link(10, linkStartY, 180, 10, { url: el.querySelector('a').href });
                    y += pLines.length * 7;
                } else {
                    let pLines = doc.splitTextToSize(el.textContent.trim(), 190);
                    doc.text(pLines, 10, y);
                    y += pLines.length * 7;
                }
            } else if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                const textField = new doc.AcroFormTextField();
                textField.Rect = [10, y, 180, el.tagName.toLowerCase() === 'textarea' ? 30 : 10];
                textField.fieldName = el.name;
                textField.value = el.value;
                textField.multiline = el.tagName.toLowerCase() === 'textarea';
                textField.fontSize = 10;
                doc.addField(textField);
                y += el.tagName.toLowerCase() === 'textarea' ? 45 : 15;
            }

            if (y > 280) {
                doc.addPage();
                y = 10;
            }
        });
    });

    doc.save('editable_form_PlanAnonymization.pdf');
}
