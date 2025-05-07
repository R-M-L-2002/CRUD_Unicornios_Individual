import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPdf = (data, title = "Listado de Unicornios") => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor("#4B0082"); 
  doc.text(title, 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [["Nombre", "Color", "Edad", "Poder"]],
    body: data.map((u) => [u.name, u.color, u.age, u.power]),

    styles: {
      fontSize: 12,
      cellPadding: 4,
    },

    headStyles: {
      fillColor: [75, 0, 130], 
    },

    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 30 },
      2: { halign: "center" },
      3: { fontStyle: 'italic' },
    },
  });

  doc.save(`${title}.pdf`);
};
