function openTab(evt, tabName){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i=0; i < tabcontent.length; i++){
        tabcontent[i].style.display="none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i=0; i< tablinks.length; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display="block";
    evt.currentTarget.className += " active";
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i=0; i < coll.length; i++){
    coll[i].addEventListener("click", function(){
        this.classList.toggle("active");
        var content=this.nextElementSibling;
        if(content.style.display === "block"){
            content.style.display = "none";
        }else {
            content.style.display = "block";
        }
    });
}
function downloadPDF() {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF('p', 'pt', 'a4');
    var yPos = 40; // Initial y position for the first line of text.
    var tabs = document.querySelectorAll('.tabcontent');

    tabs.forEach((tab, tabIndex) => {
        var sections = tab.querySelectorAll('.content');
        sections.forEach((section, sectionIndex) => {
            // Add the Tab and Section headers to the PDF.
            doc.setFontSize(14);
            doc.text(`Tab ${tabIndex + 1} - Section ${sectionIndex + 1}`, 40, yPos);
            yPos += 20; // Increment for the next line.

            var inputs = section.querySelectorAll('textarea, input[type="text"], select');
            inputs.forEach((input) => {
                let text = '';
                // Check the type of input and prepare the text accordingly.
                if (input.tagName.toLowerCase() === 'textarea' || input.type === 'text') {
                    text = input.value;
                } else if (input.tagName.toLowerCase() === 'select') {
                    text = input.options[input.selectedIndex].text;
                }
                // Split the text if it's too long for one line.
                var lines = doc.splitTextToSize(text, 520); // Width of A4 paper in pt.
                lines.forEach((line) => {
                    doc.text(line, 40, yPos);
                    yPos += 15; // Increment yPos for the next line.
                });
                yPos += 10; // Extra space before next input.
            });
            yPos += 20; // Extra space before next section.
        });
        yPos += 30; // Extra space before next tab.
    });

    // Save the PDF.
    doc.save('Data-Management-Plan-20240119.pdf');
}


/*function downloadPDF() {
    tabs.forEach((tab, tabIndex) => {
        var sections = tab.querySelectorAll('.content');
        sections.forEach((section, sectionIndex) => {
            // Add the Tab and Section headers to the PDF.
            doc.setFontSize(14);
            doc.text(`Tab ${tabIndex + 1} - Section ${sectionIndex + 1}`, 40, yPos);
            yPos += 20; // Increment for the next line.

            var inputs = section.querySelectorAll('textarea, input[type="text"], select');
            inputs.forEach((input) => {
                let text = '';
                // Check the type of input and prepare the text accordingly.
                if (input.tagName.toLowerCase() === 'textarea' || input.type === 'text') {
                    text = input.value;
                } else if (input.tagName.toLowerCase() === 'select') {
                    text = input.options[input.selectedIndex].text;
                }
                // Split the text if it's too long for one line.
                var lines = doc.splitTextToSize(text, 520); // Width of A4 paper in pt.
                lines.forEach((line) => {
                    doc.text(line, 40, yPos);
                    yPos += 15; // Increment yPos for the next line.
                });
                yPos += 10; // Extra space before next input.
            });
            yPos += 20; // Extra space before next section.
        });
        yPos += 30; // Extra space before next tab.
    });

    // Save the PDF.
    doc.save('Data-Management-Plan.pdf');
}*/


