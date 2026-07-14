export default async function decorate(block) {
  // Get the sheet path from the first row
  const sheetPath = block.textContent.trim();

  // Fetch the generated JSON
  const response = await fetch(`${sheetPath}.json`);
  const json = await response.json();

  // Clear the original table
  block.innerHTML = "";

  // Create cards
  json.data.forEach((employee) => {
    const card = document.createElement("div");
    card.className = "employee-card";

    card.innerHTML = `
      <h2>${employee.name}</h2>
      <p>${employee.role}</p>
      <span>${employee.experience} Years</span>
    `;

    block.append(card);
  });
}
