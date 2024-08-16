// ticket 3, more comments to follow
document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;

    function generatePDF() {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        let y = 10; // Starting vertical position
        const pageHeight = doc.internal.pageSize.height; // Get the page height

        // Function to add text with automatic line breaks and page management
        function addText(text, x, y, maxLineWidth, isBold = false) {
            doc.setFont('helvetica', isBold ? 'bold' : 'normal');
            let lineHeight = isBold ? 8 : 7; // Slightly more space for section titles
            const lines = doc.splitTextToSize(text, maxLineWidth); // Split text to fit into the specified width
            lines.forEach(function(line) {
                if (y + lineHeight > pageHeight - 10) { // Check if the text reaches the bottom of the page
                    doc.addPage(); // Add a new page
                    y = 10; // Reset y to the top of the new page
                }
                doc.text(line, x, y);
                y += lineHeight;
            });
            return y; // Return the new Y position after adding text
        }

        // Add the form title
        const title = document.querySelector('.form-title h1').textContent;
        y = addText(title, 10, y, 190, true); // Title in bold
        y += 2;

        // Add all paragraphs, ordered lists, and list items
        document.querySelectorAll('p, ol, li').forEach(element => {
            if (element.tagName === 'P' || element.tagName === 'LI') {
                y = addText(element.textContent, 10, y, 190);
                if (element.tagName === 'LI') y += 2; // Extra space after list items
            } else if (element.tagName === 'OL') {
                element.querySelectorAll('li').forEach(li => {
                    y = addText(`- ${li.textContent}`, 15, y, 175); // Add bullet points with indentation
                });
            }
        });

        // Add all labels and their associated inputs
        document.querySelectorAll('label, input[type="text"], input[type="date"]').forEach(element => {
            if (element.tagName === 'LABEL') {
                y = addText(element.textContent, 10, y, 190, true); // Labels in bold
            } else if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'date') && element.id) {
                let label = document.querySelector(`label[for="${element.id}"]`);
                let labelText = label ? label.textContent : '';
                y = addText(`${labelText}: ${element.value}`, 10, y, 190);
            }
        });

        // Save PDF
        doc.save('DPIAChecklist.pdf');
    }

    // Attach the event listener to the button
    document.querySelector('.button').addEventListener('click', generatePDF);
});
