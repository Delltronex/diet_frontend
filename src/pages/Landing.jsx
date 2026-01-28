import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Activity, Heart } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="flex justify-between items-center" style={{ padding: '2rem 0' }}>
        <div className="flex items-center gap-sm">
          <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '12px', color: 'white' }}>
            <Leaf size={24} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--secondary)' }}>NutriLife</span>
        </div>
        {/* <button className="btn btn-secondary">Login</button> */}
      </header>

      <main className="flex-col items-center justify-center text-center fade-in" style={{ flex: 1, padding: '4rem 0' }}>
        <div style={{
          background: '#dcfce7',
          color: '#166534',
          padding: '0.5rem 1rem',
          borderRadius: '100px',
          fontWeight: 600,
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          display: 'inline-block'
        }}>
          #1 AI-Powered Diet Planner
        </div>
        <h1 className="text-4xl mb-lg" style={{ maxWidth: '800px', margin: '0 auto 2rem', fontSize: '3.5rem', lineHeight: '1.1' }}>
          Eat smarter, <br />
          <span style={{ color: 'var(--primary)' }}>live better.</span>
        </h1>
        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Get a personalized diet plan tailored to your body type, goals, and lifestyle in under 2 minutes.
        </p>

        <button className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }} onClick={() => navigate('/assessment')}>
          Start Your Journey <ArrowRight size={20} style={{ marginLeft: '10px' }} />
        </button>

        <div className="flex justify-center gap-md mt-md" style={{ marginTop: '5rem', opacity: 0.8 }}>
          <div className="flex items-center gap-sm">
            <Activity size={20} color="var(--primary)" />
            <span>Science-based</span>
          </div>
          <div className="flex items-center gap-sm">
            <Heart size={20} color="var(--error)" />
            <span>Health focused</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
