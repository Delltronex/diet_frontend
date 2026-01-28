import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Activity, Target, Utensils } from 'lucide-react';

/* Options Constants */
const ACTIVITY_LEVELS = [
    { id: 'sedentary', label: 'Sedentary', desc: 'Office job, little exercise' },
    { id: 'light', label: 'Lightly Active', desc: '1-3 days/week exercise' },
    { id: 'moderate', label: 'Moderately Active', desc: '3-5 days/week exercise' },
    { id: 'very', label: 'Very Active', desc: '6-7 days/week hard exercise' },
];

const GOALS = [
    { id: 'lose', label: 'Lose Weight', icon: '📉' },
    { id: 'maintain', label: 'Maintain Weight', icon: '⚖️' },
    { id: 'gain', label: 'Build Muscle', icon: '💪' },
];

const DIET_TYPES = [
    { id: 'standard', label: 'Balanced', desc: 'No restrictions' },
    { id: 'keto', label: 'Keto', desc: 'High fat, low carb' },
    { id: 'vegan', label: 'Vegan', desc: 'Plant-based only' },
    { id: 'paleo', label: 'Paleo', desc: 'Whole foods only' },
];

const Assessment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        height: '', // in cm
        weight: '', // in kg
        activity: 'sedentary',
        goal: 'maintain',
        diet: 'standard',
    });

    const updateData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else {
            // Navigate to results with state
            navigate('/results', { state: { formData } });
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else navigate('/');
    };

    /* Step Components */
    const renderStep1 = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold mb-lg text-center">Let's get to know you</h2>

            <div className="input-group">
                <label className="label">Gender</label>
                <div className="select-card-grid">
                    {['male', 'female'].map(g => (
                        <div
                            key={g}
                            className={`select-card ${formData.gender === g ? 'selected' : ''}`}
                            onClick={() => updateData('gender', g)}
                        >
                            <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{g}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="input-group">
                <label className="label">Age</label>
                <input
                    type="number"
                    className="input"
                    value={formData.age}
                    onChange={(e) => updateData('age', e.target.value)}
                    placeholder="e.g. 25"
                />
            </div>

            <div className="flex gap-sm">
                <div className="input-group" style={{ flex: 1 }}>
                    <label className="label">Height (cm)</label>
                    <input
                        type="number"
                        className="input"
                        value={formData.height}
                        onChange={(e) => updateData('height', e.target.value)}
                        placeholder="e.g. 175"
                    />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label className="label">Weight (kg)</label>
                    <input
                        type="number"
                        className="input"
                        value={formData.weight}
                        onChange={(e) => updateData('weight', e.target.value)}
                        placeholder="e.g. 70"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold mb-lg text-center">How active are you?</h2>
            <div className="flex-col gap-sm">
                {ACTIVITY_LEVELS.map((level) => (
                    <div
                        key={level.id}
                        className={`interactive-card flex items-center justify-between ${formData.activity === level.id ? 'selected' : ''}`}
                        style={{ padding: '1rem' }}
                        onClick={() => updateData('activity', level.id)}
                    >
                        <div>
                            <div style={{ fontWeight: 600 }}>{level.label}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{level.desc}</div>
                        </div>
                        {formData.activity === level.id && (
                            <div style={{ background: 'var(--primary)', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                                <Check size={16} color="white" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold mb-lg text-center">What is your goal?</h2>
            <div className="select-card-grid">
                {GOALS.map((goal) => (
                    <div
                        key={goal.id}
                        className={`select-card ${formData.goal === goal.id ? 'selected' : ''}`}
                        onClick={() => updateData('goal', goal.id)}
                        style={{ padding: '2rem 1rem' }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{goal.icon}</div>
                        <div style={{ fontWeight: 600 }}>{goal.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold mb-lg text-center">Dietary Preferences</h2>
            <div className="select-card-grid">
                {DIET_TYPES.map((type) => (
                    <div
                        key={type.id}
                        className={`select-card ${formData.diet === type.id ? 'selected' : ''}`}
                        onClick={() => updateData('diet', type.id)}
                    >
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{type.label}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{type.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
return (
  <div
    className="flex items-center justify-center"
    style={{ minHeight: '100vh', padding: '2rem' }}
  >
    <div style={{ width: '100%', maxWidth: '500px' }}>
      
      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          background: '#E2E8F0',
          height: '6px',
          borderRadius: '10px',
          marginBottom: '2rem'
        }}
      >
        <div
          style={{
            width: `${(step / 4) * 100}%`,
            background: 'var(--primary)',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Card */}
      <div
        className="card"
        style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ flex: 1 }}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-md">
          <button className="btn btn-secondary" onClick={handleBack}>
            <ArrowLeft size={18} />
          </button>

          <button
            className="btn btn-primary"
            onClick={handleNext}
            style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
            disabled={step === 1 && (!formData.age || !formData.height || !formData.weight)}
          >
            {step === 4 ? 'Generate Plan' : 'Next'}
            <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
        </div>
      </div>
    </div>
  </div>
);



};


export default Assessment;
