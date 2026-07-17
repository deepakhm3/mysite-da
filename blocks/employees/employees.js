import { getPlaceholder } from "../../scripts/placeholders.js";

export default async function decorate(block) {
  // Read authored block values before clearing the block
  const rows = [...block.children];

  const sheetPath = rows[0].textContent.trim();
  const department = rows[1]?.textContent.trim();

  // Fetch employee data
  const response = await fetch(`${sheetPath}.json`);

  if (!response.ok) {
    block.innerHTML = `<p>Could not load ${sheetPath}.json</p>`;
    return;
  }

  const json = await response.json();

  let employees = json.data;

  // Filter employees if department is configured
  if (department) {
    employees = employees.filter(
      (employee) => employee.department === department,
    );
  }

  // Get placeholder values
  const title = await getPlaceholder("employee-section-title");
  const noEmployeesMessage = await getPlaceholder("no-employees-message");

  // Clear original authored block content
  block.innerHTML = "";

  // Show message if no employees found
  if (employees.length === 0) {
    block.innerHTML = `<p>${noEmployeesMessage}</p>`;
    return;
  }

  // Add section heading
  const heading = document.createElement("h2");
  heading.textContent = title;
  block.append(heading);

  // Render employee cards
  employees.forEach((employee) => {
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
