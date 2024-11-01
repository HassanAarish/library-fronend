import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Example: Call your backend to create a PaymentIntent here
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "your_client_secret_from_backend", // Replace with client secret from backend
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Test User",
          },
        },
      }
    );

    if (error) {
      setError(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      alert("Payment Successful!");
    }

    setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
    >
      <h2 className="text-xl font-semibold mb-4">Enter Payment Information</h2>
      <CardElement className="p-3 border rounded-md" />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-3 mt-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
