const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAIDietPlan(formData, results) {
  const res = await fetch(`${API_BASE_URL}/api/ai/diet-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData, results }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch AI diet plan");
  }

  return res.json();
}
