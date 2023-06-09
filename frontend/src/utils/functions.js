const invoiceData = {
  // replace with actual data from your system
  date: '2021-08-25',
  customerName: 'Acme Inc',
  items: [
    { description: 'Item 1', quantity: 2, price: 10.0, total: 20.0 },
    { description: 'Item 2', quantity: 1, price: 15.0, total: 15.0 },
    { description: 'Item 3', quantity: 3, price: 7.5, total: 22.5 },
  ],
  subtotal: 57.5,
  tax: 5.48,
  total: 63.98,
};

const generateInvoiceTemplate = (invoiceData) => {
  const { date, customerName, items, subtotal, tax, total } =
    invoiceData;

  // Populate header section
  const headerSection = document.querySelector('.header');
  headerSection.innerHTML = `
      <h1>Invoice</h1>
      <p>Date: ${date}</p>
      <!-- Add other header information as needed -->
    `;

  // Populate customer section
  const customerSection = document.querySelector('.customer');
  customerSection.innerHTML = `
      <h2>Customer Information</h2>
      <p>Name: ${customerName}</p>
      <!-- Add other customer information as needed -->
    `;

  // Populate item details section
  const itemsSection = document.querySelector('.items');
  let itemsHtml = `
      <h2>Item Details</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
    `;
  items.forEach((item) => {
    itemsHtml += `
        <tr>
          <td>${item.description}</td>
          <td>${item.quantity}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${item.total.toFixed(2)}</td>
        </tr>
      `;
  });
  itemsHtml += '</tbody></table>';
  itemsSection.innerHTML = itemsHtml;

  // Populate totals section
  const totalsSection = document.querySelector('.totals');
  totalsSection.innerHTML = `
      <h2>Totals</h2>
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax: $${tax.toFixed(2)}</p>
      <p>Total: $${total.toFixed(2)}</p>
    `;
};
