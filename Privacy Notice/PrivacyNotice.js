import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js";

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 10;
    const startX = margin;
    let startY = margin;

    // Title
    pdf.setFontSize(18);
    pdf.text("Privacy notice for scientific research", startX, startY);
    startY += 10;
    pdf.setFontSize(12);
    pdf.text("EU General Data Protection Regulation (EU 2016/679), art. 12, 13, 14", startX, startY);
    startY += 10;

    // Helper function to add text fields
    function addTextField(label, value, yPosition) {
        pdf.text(label, startX, yPosition);
        pdf.setFont("helvetica", "normal");
        pdf.text(value || "", startX + 70, yPosition);
        pdf.setFont("helvetica", "bold");
    }

    // Helper function to add checkboxes
    function addCheckbox(label, checked, yPosition) {
        pdf.text(label, startX, yPosition);
        pdf.rect(startX + 70, yPosition - 3, 3, 3);
        if (checked) {
            pdf.text("X", startX + 70.5, yPosition);
        }
    }

    // Retrieve values from the form
    const formElements = document.querySelectorAll("input[type='text'], input[type='checkbox'], textarea");

    formElements.forEach((element) => {
        if (element.type === "text" || element.tagName.toLowerCase() === "textarea") {
            addTextField(element.previousElementSibling.innerText, element.value, startY);
            startY += 10;
        } else if (element.type === "checkbox") {
            addCheckbox(element.parentNode.innerText.trim(), element.checked, startY);
            startY += 10;
        }
    });

    pdf.save("PrivacyNotice.pdf");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".button").addEventListener("click", generatePDF);
});
