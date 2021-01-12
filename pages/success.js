import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import { useEffect } from "react";

const Success = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);
  return <Page>
      <h2>Payment successful!</h2>
      <h3>Thanks for shopping with us! 🤗</h3>
  </Page>;
};

export default Success;
