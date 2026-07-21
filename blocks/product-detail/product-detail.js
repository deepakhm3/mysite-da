export default async function decorate(block) {
  // Read authored content from DA
  const rows = [...block.children];

  const image = rows[0]?.querySelector("img");
  const category = rows[1]?.textContent.trim() || "";
  const sku = rows[2]?.textContent.trim() || "";

  // Clear authored markup
  block.innerHTML = "";

  // -------------------------------
  // Fetch Product API
  // -------------------------------
  let productData;

  try {
    const response = await fetch("http://localhost:3002/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    productData = products.find((p) => p.sku === sku);

    if (!productData) {
      throw new Error(`No product found for SKU: ${sku}`);
    }
  } catch (err) {
    console.error(err);

    productData = {
      name: "Unknown Product",
      price: 0,
      mrp: 0,
      rating: "-",
      stock: 0,
    };
  }

  // -------------------------------
  // Create UI
  // -------------------------------
  const product = document.createElement("div");
  product.className = "product-detail-container";

  product.innerHTML = `
    <div class="product-image">
      ${
        image
          ? image.outerHTML
          : `<img src="https://myawaazdev.asianpaints.com/extdpstorefront/_ui/responsive/theme-alpha/images/missing_product_EN_300x300.jpg"
                  alt="Product image">`
      }
    </div>

    <div class="product-info">

      <div class="product-meta">
        <span class="product-category">${category}</span>
        <span class="product-sku">SKU: ${sku}</span>
      </div>

      <h2 class="product-name">${productData.name}</h2>

      <div class="product-extra">
        <span>⭐ Rating: ${productData.rating}</span>
        <span>Stock: ${productData.stock}</span>
      </div>

      <button class="stock-details" type="button">
        Show Stock Details
      </button>

      <div class="product-pricing">

        <div class="price-column">

          <div class="price-column__wrap">
            <span class="label">DPL/UNIT</span>
            <p>₹ ${Number(productData.price).toLocaleString("en-IN")}/EA</p>
          </div>

          <div class="price-column__wrap">
            <span class="label">MRP/UNIT</span>
            <p>₹ ${Number(productData.mrp).toLocaleString("en-IN")}/EA</p>
          </div>

        </div>

        <div class="quantity-column">

          <div class="quantity-column__wrap">
            <span class="label">QTY. (EA)</span>

            <input
              class="quantity"
              type="number"
              value="0"
              min="0"
            />

          </div>

          <div class="quantity-column__wrap">
            <span class="label">QTY. (EA)</span>

            <input
              type="number"
              value="0"
              disabled
            />

          </div>

        </div>

        <div class="value-column">

          <div class="value-column-wrap">
            <span class="label">VALUE</span>
            <strong class="product-value">₹ -</strong>
          </div>

          <div class="value-column-wrap">
            <span class="label">VALUE</span>
            <strong>₹ -</strong>
          </div>

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

  // -------------------------------
  // Quantity Calculation
  // -------------------------------
  const quantityInput = block.querySelector(".quantity");
  const valueElement = block.querySelector(".product-value");

  quantityInput.addEventListener("input", () => {
    const quantity = Number(quantityInput.value);
    const price = Number(productData.price);

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
