import React, { useState, useEffect } from "react";


const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <stripe-buy-button
        buy-button-id="buy_btn_1NEGWzLpkQnyrIfCRJihMeQX"
        publishable-key="pk_test_51NECXpLpkQnyrIfCIhxXNk4dyWgqohRpEdntOgg1u5F9zR13HjW0oVoXKJ9BEqdBbrzSl0QFgsbsD0sLx58Le2rL00ebdy7gVP"
        successUrl
    >
    </stripe-buy-button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const PaymentPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}

export default PaymentPage;