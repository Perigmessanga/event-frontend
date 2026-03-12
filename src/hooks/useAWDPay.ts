import { useState } from "react";
import axios, { AxiosError } from "axios";

interface InitiatePaymentProps {
  orderId: string;
  amount: number;
  customerEmail: string;
  paymentMethod: "AWDPAY";
}

interface AWDPayResponse {
  checkoutUrl?: string;
  [key: string]: any; // si AWDPAY retourne d'autres champs
}

export const useAWDPay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (data: InitiatePaymentProps): Promise<AWDPayResponse> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token"); // ou ton store auth
      const res = await axios.post<{
        payment: object;
        awdpay: AWDPayResponse;
      }>(
        "http://127.0.0.1:8000/api/v1/payments/initiate/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.awdpay;
    } catch (err) {
      let message = "Erreur lors du paiement";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.error || err.message;
      }

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error };
};