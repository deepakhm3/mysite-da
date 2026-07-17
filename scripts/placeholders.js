let placeholders = null;

export async function getPlaceholder(key) {
  if (!placeholders) {
    const response = await fetch("/docs/placeholders.json");

    if (!response.ok) {
      throw new Error("Could not load placeholders");
    }

    const json = await response.json();

    placeholders = {};

    json.data.forEach((item) => {
      placeholders[item.Key] = item.Text;
    });
  }

  return placeholders[key];
}
