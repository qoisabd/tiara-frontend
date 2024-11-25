import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderHistoryType } from "@/types/types";
import { StatusBadge } from "./StatusBadge";
import { OrderPDFGenerator } from "./OrderPdfGenerator";

interface OrderDetailModalProps {
  order: OrderHistoryType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailModal({
  order,
  isOpen,
  onClose,
}: OrderDetailModalProps) {
  const handleComplain = () => {
    const message = encodeURIComponent(
      `Halo admin, saya butuh bantuan dengan nomor pesananan ${order?.or_platform_id}`
    );
    window.open(`https://wa.me/6285282810339?text=${message}`, "_blank");
  };

  const handleExportPDF = async () => {
    if (!order) return;
    const pdfGenerator = new OrderPDFGenerator(order);
    await pdfGenerator.generate();
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Detail #{order.or_platform_id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Order Date</p>
              <p className="font-medium">
                {new Date(order.or_created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Payment Method</p>
              <p className="font-medium uppercase">
                {order.or_payment_type || "-"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <StatusBadge status={order.or_status} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Products</h3>
            <div className="space-y-2">
              {order.orderItem.oi_product.map((product) => (
                <div
                  key={`${product.id}-${product.name}`}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{product.name}</p>
                    {product.category_name && (
                      <p className="text-sm text-muted-foreground">
                        Game Name: {product.category_name}
                      </p>
                    )}
                    {product.account_name && (
                      <p className="text-sm text-muted-foreground">
                        Account: {product.account_name} ({product.account_id})
                      </p>
                    )}
                    {product.order_email && (
                      <p className="text-sm text-muted-foreground">
                        Email: {product.order_email}
                      </p>
                    )}
                    {product.type && (
                      <p className="text-sm text-muted-foreground">
                        Type: {product.type}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      Rp. {(product.price * product.quantity).toFixed(0)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {product.quantity} x Rp. {product.price.toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p className="font-semibold">Total Amount</p>
              <p className="text-xl font-bold">
                Rp. {order.or_total_amount.toFixed(0)}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleComplain} variant="secondary">
                Need Help?
              </Button>
              <Button onClick={handleExportPDF}>Export PDF</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
