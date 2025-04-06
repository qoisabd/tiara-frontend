import { useEffect, useState } from "react";

export default function useSnap() {
  const [snap, setSnap] = useState<any>(null);
  useEffect(() => {
    const myMidtransClientKey =
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    const script = document.createElement("script");
    script.src = "https://app.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;
    script.onload = () => {
      const snap = (window as any).snap;
      if (snap) {
        setSnap(snap);
      } else {
        console.error("Snap object not found");
      }
    };
    script.onerror = () => {
      console.error("Error loading Snap script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snapToken: string, action: any) => {
    if (snap) {
      snap.pay(snapToken, {
        onSuccess: function (result: any) {
          action.onSuccess(result);
        },
        onPending: function (result: any) {
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    } else {
      console.error("Snap object is not available");
    }
  };

  return { snapEmbed };
}
