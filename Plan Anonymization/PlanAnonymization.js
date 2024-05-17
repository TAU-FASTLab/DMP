function generateEditablePDF() {
    const doc = new jspdf.jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    let x = 10;  // Margin left
    let y = 10;  // Start at the top of the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const rightMargin = 10;
    const yIncrement = 10;  // Space between lines

    // Adjust font settings for better readability
    doc.setFont('helvetica');  // Ensuring a standard font is used
    doc.setFontSize(10);       // Smaller font size for more content per page

    document.querySelectorAll('input[type="text"], textarea').forEach((element) => {
        const label = element.previousElementSibling.innerText;
        const fieldContent = element.value;

        // Handle the label
        const labelLines = doc.splitTextToSize(label, pageWidth - x - rightMargin);
        doc.text(labelLines, x, y);
        y += labelLines.length * yIncrement + 2;  // Adjust y position after the label

        // Handle the input/textarea content
        if (fieldContent) {  // Check if there is content to avoid adding unnecessary space
            const contentLines = doc.splitTextToSize(fieldContent, pageWidth - x - rightMargin);
            doc.text(contentLines, x, y);
            y += (contentLines.length + 1) * yIncrement;  // Adjust y for the next element
        }

        // Ensure there is space for the next element or add a new page if needed
        if (y + yIncrement * 3 > pageHeight - 20) {  // Check space for at least 3 more lines
            doc.addPage();
            y = 10;  // Reset y to the top of the new page
        }
    });

    doc.save('editable_form.pdf');
}
