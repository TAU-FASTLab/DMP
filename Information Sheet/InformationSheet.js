import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js";
import html2canvas from "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js";

async function generatePDF() {
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Capture the HTML content
  const element = document.querySelector('.section');
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // A4 width minus margin
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // Add image to PDF
  pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);

  // Adding form fields to the PDF
  const formFields = document.querySelectorAll('input, textarea');

  formFields.forEach(field => {
    const rect = field.getBoundingClientRect();
    const x = rect.x * 0.264583; // Convert px to mm
    const y = rect.y * 0.264583;
    const width = rect.width * 0.264583;
    const height = rect.height * 0.264583;

    if (field.type === 'text') {
      pdf.text(field.value, x, y + 5);
      pdf.rect(x, y, width, height);
    } else if (field.type === 'checkbox') {
      if (field.checked) {
        pdf.text('X', x + 1, y + 7);
      }
      pdf.rect(x, y, width, height);
    } else if (field.tagName === 'TEXTAREA') {
      pdf.text(field.value, x, y + 5);
      pdf.rect(x, y, width, height);
    }
  });

  // Save the PDF
  pdf.save('InformationSheet.pdf');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.button').addEventListener('click', generatePDF);
});
