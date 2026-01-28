export async function getAIDietPlan(formData, results) {
  const res = await fetch("https://diet-server-oj8p.onrender.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, results }),
  });

  return res.json();
}
