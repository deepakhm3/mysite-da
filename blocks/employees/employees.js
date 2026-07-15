export default async function decorate(block) {
  const rows = [...block.children];

  const sheetPath = rows[0].textContent.trim();
  const department = rows[1]?.textContent.trim();

  console.log("Block HTML BEFORE:", block.innerHTML);
  console.log("Children:", [...block.children]);
  console.log("Text:", block.textContent);

  return;

  let employees = json.data;

  if (department) {
    employees = employees.filter(
      (employee) => employee.department === department,
    );
  }

  block.innerHTML = "";

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
