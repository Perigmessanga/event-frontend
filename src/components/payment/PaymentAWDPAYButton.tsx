// src/components/payment/PaymentAWDPAYButton.tsx
import { Button } from "@/components/ui/button";
import { API_CONFIG, ENDPOINTS } from "@/config/api";
import { post } from "@/lib/api-client";
import { useState } from "react";

interface PaymentAWDPAYButtonProps {
  orderId: string; // ID de la commande
  amount: number;  // montant à payer
}

export function PaymentAWDPAYButton({ orderId, amount }: PaymentAWDPAYButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAWDPAY = async () => {
    setLoading(true);
    try {
      // Appel backend pour initier paiement AWDPAY
      const data = await post<{ payment_url: string }>(
        ENDPOINTS.payments.initiate,
        { order_id: orderId, amount, payment_method: "awdpay" }
      );

      // Redirection vers AWDPAY
      console.log("AWDPAY URL:", data.payment_url);
    //   window.location.href = data.payment_url;
    } catch (error) {
      console.error("Erreur AWDPAY:", error);
      alert("Impossible d'initier le paiement AWDPAY.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
      onClick={handleAWDPAY}
      disabled={loading}
    >
      {loading ? "Chargement..." : "Payer avec AWDPAY"}
    </Button>
  );
}