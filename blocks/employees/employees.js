import { getPlaceholder } from "../../scripts/placeholders.js";
export default async function decorate(block) {
  const rows = [...block.children];

  const sheetPath = rows[0].textContent.trim();
  const department = rows[1]?.textContent.trim();

  const response = await fetch(`${sheetPath}.json`);

  if (!response.ok) {
    block.innerHTML = `<p>Could not load ${sheetPath}.json</p>`;
    return;
  }

  const json = await response.json();

  let employees = json.data;

  if (department) {
    employees = employees.filter(
      (employee) => employee.department === department,
    );
  }
  const title = await getPlaceholder("employee-section-title");

  const heading = document.createElement("h2");
  heading.textContent = title;

  block.append(heading);
  const noEmployeesMessage = await getPlaceholder("no-employees-message");
  if (employees.length === 0) {
    block.innerHTML = `<p>${noEmployeesMessage}</p>`;
    return;
  }

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
