!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js"
);
fbq("init", "300085599752922");

analytics.subscribe("page_viewed", async (event) => {
  fbq("track", "PageView");
});

analytics.subscribe("product_added_to_cart", (event) => {
  // Example for accessing event data
  const cartLine = event.data.cartLine;

  const cartLineCost = cartLine.cost.totalAmount.amount;

  const cartLineCostCurrency = cartLine.cost.totalAmount.currencyCode;

  const merchandiseVariantTitle = cartLine.merchandise.title;

  const payload = {
    event_name: event.name,
    event_data: {
      cartLineCost: cartLineCost,
      cartLineCostCurrency: cartLineCostCurrency,
      merchandiseVariantTitle: merchandiseVariantTitle,
    },
  };
  console.log(`event tracked is ${payload}`);
  try {
    fbq("trackCustom", "AddedToCart", payload);
  } catch (ex) {
    console.log(`failed while sending req to fbq with ${ex}`);
  }
});

analytics.subscribe("checkout_completed", (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;

  const checkoutTotalPrice = checkout.totalPrice.amount;

  const allDiscountCodes = checkout.discountApplications.map((discount) => {
    if (discount.type === "DISCOUNT_CODE") {
      return discount.title;
    }
  });

  const firstItem = checkout.lineItems[0];

  const firstItemDiscountedValue = firstItem.discountAllocations[0].amount;

  const customItemPayload = {
    quantity: firstItem.quantity,
    title: firstItem.title,
    discount: firstItemDiscountedValue,
  };

  const paymentTransactions = event.data.checkout.transactions.map(
    (transaction) => {
      return {
        paymentGateway: transaction.gateway,
        amount: transaction.amount,
      };
    }
  );

  const payload = {
    event_name: event.name,
    event_data: {
      totalPrice: checkoutTotalPrice,
      discountCodesUsed: allDiscountCodes,
      firstItem: customItemPayload,
      paymentTransactions: paymentTransactions,
    },
  };

  fbq("trackCustom", "Purchase", payload);
});
