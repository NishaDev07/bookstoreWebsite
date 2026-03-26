export default function CheckoutSuccessPage() {
  return (
    <section className="section">
      <div className="container narrow">
        <div className="auth-card centered">
          <h1>Payment successful</h1>
          <p>Your order has been placed. The webhook will mark the order as paid and clear your cart.</p>
          <a className="primary-btn" href="/">Back to home</a>
        </div>
      </div>
    </section>
  );
}
