import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51QFyl1Kuf4JEQrIgcgB5coRmdD2RukurliQZHnDAP7AxR5Uninr9KPDbjgAt2GSxU4mj8QuEMAzMRMdlB4Em7z3G0004ovVcCD"
);

const Checkout = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-center  text-blue-600 mb-6">
        Checkout
      </h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Checkout;
