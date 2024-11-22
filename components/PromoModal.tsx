"use client";
import React, { useEffect } from "react";
import { Copy, TicketPercent } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Status } from "@/utils/Status";
import { AppDispatch } from "@/store/store";
import { PromoCodeType } from "@/types/types";
import { fetchAllPromotionCode } from "@/features/promotion/promotionThunk";

interface PromoModalProps {
  onSelectPromo: (code: string) => void;
}

const PromoModal: React.FC<PromoModalProps> = ({ onSelectPromo }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { promotion, status, errorMessage } = useSelector(
    (state: RootState) => state.promotionReducer
  );

  useEffect(() => {
    if (status === Status.IDLE) {
      dispatch(fetchAllPromotionCode());
    }
  }, [dispatch, status]);

  const handleCopyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Copied to Clipboard", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      onSelectPromo(code);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-fit mt-3 bg-yellow-500 text-white hover:bg-yellow-600"
        >
          <TicketPercent color="white" />
          {status === Status.LOADING ? "Loading..." : "Promo Codes"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Available Promo Codes</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {status === Status.LOADING && (
            <div className="text-center py-4">Loading...</div>
          )}

          {status === Status.FAILED && (
            <div className="text-center py-4 text-red-500">{errorMessage}</div>
          )}

          {status === Status.SUCCESS &&
            promotion?.map((promo: PromoCodeType) => (
              <Card key={promo.prm_id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold">
                      {promo.prm_code_value}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() =>
                        handleCopyToClipboard(promo.prm_code_value)
                      }
                    >
                      <Copy size={16} />
                      Copy Code
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Stock Left: {promo.prm_quantity}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-green-600">
                      Discount {promo.prm_discount_percentage}%
                    </span>
                    <span className="text-gray-500">
                      Valid until:{" "}
                      {new Date(promo.prm_expired_on).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoModal;
