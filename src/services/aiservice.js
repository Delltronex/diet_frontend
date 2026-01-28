export async function getAIDietPlan(formData, results) {
  const res = await fetch("http://localhost:5000/api/ai/diet-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, results }),
  });

  return res.json();
}
