import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { OrderHistoryType } from "@/types/types";

export class OrderPDFGenerator {
  private doc: jsPDF;
  private order: OrderHistoryType;

  constructor(order: OrderHistoryType) {
    this.doc = new jsPDF();
    this.order = order;
  }

  private addHeader() {
    this.doc.setFillColor(52, 152, 219);
    this.doc.rect(0, 0, 210, 40, "F");

    const logoUrl =
      "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1729842908/Black_Blue_White_Y2K_Diamond_Pixel_Logo_e6epnm.png";
    this.doc.addImage(logoUrl, "PNG", 10, 5, 30, 30);

    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.text("Order Invoice", 105, 20, { align: "center" });
    this.doc.setFontSize(12);
    this.doc.text(`Order #${this.order.or_platform_id}`, 105, 30, {
      align: "center",
    });

    this.doc.setTextColor(0, 0, 0);
  }

  private addOrderInfo() {
    const orderDate = new Date(this.order.or_created_at).toLocaleDateString();

    this.doc.setFontSize(10);
    this.doc.text("Order Information:", 15, 50);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(`Date: ${orderDate}`, 15, 58);
    this.doc.text(
      `Payment Method: ${(this.order.or_payment_type || "-").toUpperCase()}`,
      15,
      66
    );
    this.doc.text(`Status: ${this.order.or_status}`, 15, 74);
  }

  private addProductsTable() {
    const tableData = this.order.orderItem.oi_product.map((product) => [
      product.name,
      product.category_name || "-",
      product.quantity.toString(),
      `Rp. ${product.price.toFixed(0)}`,
      `Rp. ${(product.price * product.quantity).toFixed(0)}`,
    ]);

    // @ts-expect-error
    this.doc.autoTable({
      startY: 85,
      head: [["Product", "Game", "Qty", "Price", "Subtotal"]],
      body: tableData,
      theme: "striped",
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
        fontSize: 10,
        fontStyle: "bold",
      },
      bodyStyles: {
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 35 },
        4: { cellWidth: 35 },
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });
  }

  private addTotal() {
    const finalY = (this.doc as any).lastAutoTable.finalY || 150;

    this.doc.setDrawColor(52, 152, 219);
    this.doc.setLineWidth(0.5);
    this.doc.line(120, finalY + 10, 195, finalY + 10);

    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Total Amount:", 120, finalY + 20);
    this.doc.text(
      `Rp. ${this.order.or_total_amount.toFixed(0)}`,
      195,
      finalY + 20,
      { align: "right" }
    );
  }

  private addFooter() {
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(128, 128, 128);
    this.doc.text("Thank you for your purchase!", 105, 280, {
      align: "center",
    });
    this.doc.text(
      "For any questions or concerns, please contact our customer service.",
      105,
      285,
      { align: "center" }
    );
  }

  public generate() {
    this.addHeader();
    this.addOrderInfo();
    this.addProductsTable();
    this.addTotal();
    this.addFooter();

    this.doc.save(`Invoice_${this.order.or_platform_id}.pdf`);
  }
}

export const generateOrderPDF = (order: OrderHistoryType) => {
  const pdfGenerator = new OrderPDFGenerator(order);
  pdfGenerator.generate();
};
