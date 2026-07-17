export default function decorate(block) {
  // Read values authored in DA
  const rows = [...block.children];

  const image = rows[0]?.querySelector("img");
  const category = rows[1]?.textContent.trim() || "";
  const sku = rows[2]?.textContent.trim() || "";
  const productName = rows[3]?.textContent.trim() || "";
  const dpl = rows[4]?.textContent.trim() || "";
  const mrp = rows[5]?.textContent.trim() || "";

  // Clear the original authored block
  block.innerHTML = "";

  // Main product container
  const product = document.createElement("div");
  product.className = "product-detail-container";

  product.innerHTML = `
    <div class="product-image">
      ${image ? image.outerHTML : ""}
    </div>

    <div class="product-info">

      <div class="product-meta">
        <span class="product-category">${category}</span>
        <span class="product-sku">SKU: ${sku}</span>
      </div>

      <h2 class="product-name">${productName}</h2>

      <button class="stock-details" type="button">
        Show Stock Details
      </button>

      <div class="product-pricing">

        <div class="price-column">
          <span class="label">DPL/UNIT</span>
          <strong>₹ ${dpl}/EA</strong>

          <span class="label">MRP/UNIT</span>
          <strong>₹ ${mrp}/EA</strong>
        </div>

        <div class="quantity-column">
          <span class="label">QTY. (EA)</span>
          <input
            class="quantity"
            type="number"
            value="0"
            min="0"
          />

          <span class="label">QTY. (EA)</span>
          <input
            type="number"
            value="0"
            disabled
          />
        </div>

        <div class="value-column">
          <span class="label">VALUE</span>
          <strong class="product-value">₹ -</strong>

          <span class="label">VALUE</span>
          <strong>₹ -</strong>
        </div>

        <div class="cart-column">
          <button class="add-to-cart" type="button">
            🛒 Add to cart
          </button>
        </div>

      </div>
    </div>
  `;

  block.append(product);

  // Quantity interaction
  const quantityInput = block.querySelector(".quantity");
  const valueElement = block.querySelector(".product-value");

  quantityInput.addEventListener("input", () => {
    const quantity = Number(quantityInput.value);
    const price = Number(dpl.replace(/,/g, ""));

    if (quantity > 0 && !Number.isNaN(price)) {
      const total = quantity * price;

      valueElement.textContent = `₹ ${total.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } else {
      valueElement.textContent = "₹ -";
    }
  });
}
