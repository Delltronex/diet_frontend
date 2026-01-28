export async function getAIDietPlan(formData, results) {
  const url = "https://diet-server-oj8p.onrender.com/api/ai/diet-plan";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, results }),
  });

  const data = await res.json();
  return data.text;
}
