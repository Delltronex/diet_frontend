const API_BASE_URL = "https://diet-server-oj8p.onrender.com";

export async function getAIDietPlan(formData, results) {
  const res = await fetch(`${API_BASE_URL}/api/ai/diet-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData, results }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return res.json();
}

