import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCw, Sparkles, RotateCcw } from "lucide-react";
import { getAIDietPlan } from "../services/aiservice";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [aiPlan, setAiPlan] = useState("");
  const [aiInsights, setAiInsights] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!state?.formData) {
      navigate("/");
      return;
    }

    const { age, gender, height, weight, activity, goal } = state.formData;

    setTimeout(async () => {
      let bmr = 10 * weight + 6.25 * height - 5 * age;
      bmr += gender === "male" ? 5 : -161;

      const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very: 1.725,
      };

      let calories = bmr * (multipliers[activity] || 1.2);
      if (goal === "lose") calories -= 500;
      if (goal === "gain") calories += 500;

      const macros = {
        protein: Math.round((calories * 0.3) / 4),
        carbs: Math.round((calories * 0.4) / 4),
        fats: Math.round((calories * 0.3) / 9),
      };

      const computed = {
        calories: Math.round(calories),
        macros,
      };

      setResults(computed);
      setLoading(false);

      try {
        setAiLoading(true);
        const ai = await getAIDietPlan(state.formData, computed);
        const text = ai.text || "";

        setAiPlan(
          text.split("INSIGHTS:")[0]?.replace("DIET_PLAN:", "").trim()
        );
        setAiInsights(text.split("INSIGHTS:")[1]?.trim());
      } finally {
        setAiLoading(false);
      }
    }, 700);
  }, [state, navigate]);

  if (loading) {
    return (
      <div className="container flex items-center justify-center" style={{ minHeight: "100vh" }}>
        <div className="flex flex-col items-center gap-sm">
          <RefreshCw className="animate-spin" size={40} />
          <span className="text-muted">Preparing your plan…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in" style={{ maxWidth: "900px", padding: "3rem 0" }}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-lg">
        <div>
          <h1 className="text-4xl font-bold">Your Nutrition Plan</h1>
          <p className="text-muted mt-md">
            Goal:{" "}
            <span className="text-primary font-bold">
              {state.formData.goal}
            </span>
          </p>
        </div>

        {/* Recalculate Button */}
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/assessment")}
        >
          <RotateCcw size={16} style={{ marginRight: 6 }} />
          Recalculate
        </button>
      </div>

      {/* CALORIES */}
      <div className="card text-center mb-lg bg-soft-primary slide-up">
        <p className="text-muted">Daily calorie target</p>
        <div
          className="pop"
          style={{ fontSize: "3.5rem", fontWeight: 700, margin: "0.5rem 0" }}
        >
          {results.calories}
        </div>
        <p className="text-muted">kcal per day</p>
      </div>

      {/* MACROS */}
      <div
        className="card mb-lg slide-up"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          textAlign: "center",
          background: "#f0fdf4",
        }}
      >
        <div>
          <div className="font-bold text-xl text-primary">
            {results.macros.protein}g
          </div>
          <div className="text-muted">Protein</div>
        </div>
        <div>
          <div className="font-bold text-xl text-primary">
            {results.macros.carbs}g
          </div>
          <div className="text-muted">Carbs</div>
        </div>
        <div>
          <div className="font-bold text-xl text-primary">
            {results.macros.fats}g
          </div>
          <div className="text-muted">Fats</div>
        </div>
      </div>

      {/* AI DIET PLAN */}
      <div className="card mb-lg slide-up">
        <h2 className="flex items-center gap-sm font-bold text-primary mb-md">
          <Sparkles size={18} /> AI Diet Plan
        </h2>

        {aiLoading ? (
          <p className="text-muted">Creating a personalized plan…</p>
        ) : (
          <div style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
            {aiPlan}
          </div>
        )}
      </div>

      {/* AI INSIGHTS */}
      <div
        className="card slide-up"
        style={{
          background: "linear-gradient(180deg, #f8fafc, #ffffff)",
        }}
      >
      <h2 className="flex items-center gap-sm font-bold text-primary mb-md">
          <Sparkles size={18} /> Nutrition Insights
        </h2>


        {aiLoading ? (
          <p className="text-muted">Thinking…</p>
        ) : (
          <div style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
            {aiInsights}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
