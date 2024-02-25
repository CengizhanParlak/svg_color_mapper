function addToCart(id, quantity, currency, price) {
  fbq("trackCustom", "AddToCart", {
    content_ids: [id],
    content_type: "product",
    contents: [
      {
        id: id,
        quantity: quantity,
        currency: currency,
        price: price,
      },
    ],
  });
}

function purchaseCompleted(orderId, currency, value, contents) {
  fbq("track", "Purchase", {
    content_ids: contents.map((item) => item.id),
    content_type: "product",
    contents: contents,
    num_items: contents.length,
    currency: currency,
    value: value,
    order_id: orderId,
  });
}
