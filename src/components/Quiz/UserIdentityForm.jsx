import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function UserIdentityForm({ config, onSubmit, onSkip }) {
  const enabledFields = config.fields.filter((f) => f.enabled === true || f.enabled === 'true');
  const hasRequired = enabledFields.some((f) => f.required === true || f.required === 'true');

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  // If no fields enabled, skip directly
  React.useEffect(() => {
    if (enabledFields.length === 0) {
      onSkip();
    }
  }, [enabledFields, onSkip]);

  if (enabledFields.length === 0) {
    return null;
  }

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const newErrors = {};
    enabledFields.forEach((field) => {
      if (field.required && !(values[field.key] || '').trim()) {
        newErrors[field.key] = `${field.label} harus diisi`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: values.name || '',
      class: values.class || '',
      studentId: values.studentId || '',
    });
  };

  // If no fields enabled, skip directly
  if (enabledFields.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="identity-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="identity-card"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <img
          src="/images/image2.png"
          alt="Detektif"
          className="identity-char"
        />
        <h2 className="identity-title">Siapa Kamu, Detektif? 🕵️</h2>
        <p className="identity-subtitle">
          {hasRequired
            ? 'Isi data dirimu sebelum mulai misi!'
            : 'Kamu bisa isi data dirimu (opsional)'}
        </p>

        <form className="identity-form" onSubmit={handleSubmit}>
          {enabledFields.map((field) => (
            <div key={field.key} className="identity-field">
              <label className="identity-field-label">
                {field.label}
                {field.required && <span className="required-star">*</span>}
              </label>
              <input
                className="identity-field-input"
                type="text"
                placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                value={values[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
              {errors[field.key] && (
                <div style={{ color: '#f44336', fontSize: '0.8rem', fontWeight: 700, marginTop: 4 }}>
                  {errors[field.key]}
                </div>
              )}
            </div>
          ))}

          <button type="submit" className="btn-main identity-btn-start">
            🎯 Mulai Latihan!
          </button>

          {!hasRequired && (
            <button type="button" className="identity-btn-skip" onClick={() => onSkip()}>
              Lewati →
            </button>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
