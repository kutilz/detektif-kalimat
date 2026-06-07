import React, { useState, useEffect } from 'react';
import { getAdminSettings, updateAdminSettings } from '../../data/adminStore';

export default function ScalableText({ group, children, style = {}, className = "", as: Component = "span", ...props }) {
  const [settings, setSettings] = useState(getAdminSettings());

  // Listen for admin settings updates to re-render and get latest status
  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getAdminSettings());
    };
    window.addEventListener('admin-settings-updated', handleUpdate);
    return () => {
      window.removeEventListener('admin-settings-updated', handleUpdate);
    };
  }, []);

  const isEditEnabled = settings.enableManualFontEdit || false;
  const groupScales = settings.groupScales || { title: 1.0, sentence: 1.0, desc: 1.0, button: 1.0, small: 1.0 };
  const currentScale = groupScales[group] || 1.0;

  const handleAdjust = (direction, e) => {
    e.preventDefault();
    e.stopPropagation();
    const step = 0.1;
    let next = currentScale + (direction === 'up' ? step : -step);
    next = Math.max(0.5, Math.min(2.5, parseFloat(next.toFixed(1))));
    
    const updatedScales = { ...groupScales, [group]: next };
    updateAdminSettings({ groupScales: updatedScales });
  };

  const scaleStyle = {
    ...style,
    fontSize: `calc(1em * var(--group-scale-${group}, 1.0))`,
  };

  if (!isEditEnabled) {
    return <Component className={className} style={scaleStyle} {...props}>{children}</Component>;
  }

  return (
    <Component className={`scalable-text-container ${className}`} style={scaleStyle} {...props}>
      <span className="scalable-text-content">{children}</span>
      <span className="scalable-text-controls" contentEditable={false}>
        <button 
          className="font-edit-btn font-edit-btn-minus" 
          onClick={(e) => handleAdjust('down', e)}
          title="Kecilkan grup tulisan ini"
          type="button"
        >
          -
        </button>
        <span className="font-edit-indicator">{currentScale.toFixed(1)}</span>
        <button 
          className="font-edit-btn font-edit-btn-plus" 
          onClick={(e) => handleAdjust('up', e)}
          title="Besarkan grup tulisan ini"
          type="button"
        >
          +
        </button>
      </span>
    </Component>
  );
}
