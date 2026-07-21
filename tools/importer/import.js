export default {
  transformDOM: ({ document }) => {
    const main = document.querySelector("main");

    const product = main.querySelector(".product-detail");

    if (product) {
      const rows = [...product.children];

      const cells = [
        ["Product Detail"],
        [rows[0]],
        [rows[1]],
        [rows[2]],
        [rows[3]],
        [rows[4]],
        [rows[5]],
      ];

      const table = WebImporter.DOMUtils.createTable(cells, document);

      product.replaceWith(table);
    }

    return main;
  },
};
