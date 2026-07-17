export default async function decorate(block) {
  const response = await fetch("/docs/products/query-index.json");

  if (!response.ok) {
    block.innerHTML = "<p>Could not load products.</p>";
    return;
  }

  const json = await response.json();

  // Only show products that are allowed to be indexed
  const products = json.data;

  block.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const title = product.title?.replace(/^#\s*/, "") || "Untitled Product";
    const description = product.description || "";

    card.innerHTML = `
      <h2>${title}</h2>
      <p>${description}</p>
      <a href="${product.path}">View Product</a>
    `;

    block.append(card);
  });
}
