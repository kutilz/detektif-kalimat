import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Settings, FileQuestion, Trophy, Users, Shield,
  LogOut, Plus, Trash2, Edit3, Search, X, Menu, Copy, RefreshCw,
  Save, Hash, Clock, Shuffle, Eye, EyeOff
} from 'lucide-react';
import {
  getAdminSettings, updateAdminSettings,
  getCustomQuestions, addCustomQuestion, updateCustomQuestion, deleteCustomQuestion,
  getLeaderboard, deleteLeaderboardEntry, resetLeaderboard,
  getUserIdentityConfig, saveUserIdentityConfig,
  exportAllData,
  getMergedQuestions, getQuestionOverrides, saveQuestionOverrides
} from '../../data/adminStore';
import QuestionEditor from './QuestionEditor';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'settings', label: 'Pengaturan Quiz', icon: Settings },
  { key: 'questions', label: 'Manajemen Soal', icon: FileQuestion },
  { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { key: 'identity', label: 'Identitas User', icon: Users },
  { key: 'security', label: 'Keamanan', icon: Shield },
];

const QUIZ_MODES = [
  { key: 'random', icon: '🎲', label: 'Random', desc: 'Soal diacak dari semua pool' },
  { key: 'sequential', icon: '📋', label: 'Berurutan', desc: 'Soal sesuai urutan' },
  { key: 'custom_only', icon: '✏️', label: 'Custom Saja', desc: 'Hanya soal buatan admin' },
  { key: 'mixed', icon: '🔀', label: 'Campuran', desc: 'Gabungan bawaan + custom' },
];

export default function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Data states
  const [settings, setSettings] = useState(getAdminSettings());
  const [customQuestions, setCustomQuestions] = useState(getCustomQuestions());
  const [questionOverrides, setQuestionOverrides] = useState(getQuestionOverrides());
  const [leaderboard, setLeaderboard] = useState(getLeaderboard());
  const [identityConfig, setIdentityConfig] = useState(getUserIdentityConfig());

  // Question editor
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Search
  const [questionSearch, setQuestionSearch] = useState('');
  const [leaderboardSearch, setLeaderboardSearch] = useState('');

  // Security
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Confirm dialog
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ---- Settings handlers ----
  const handleUpdateSettings = (partial) => {
    const updated = updateAdminSettings(partial);
    setSettings(updated);
    showToast('Pengaturan disimpan! ✅');
  };

  // ---- Question handlers ----
  const handleSaveQuestion = (questionData) => {
    if (questionData.id) {
      if (questionData.id.startsWith('custom_')) {
        const updated = updateCustomQuestion(questionData.id, questionData);
        setCustomQuestions(updated);
        showToast('Soal berhasil diperbarui! ✅');
      } else {
        const currentOverrides = getQuestionOverrides();
        currentOverrides[questionData.id] = {
          ...questionData,
          isOverride: true,
        };
        saveQuestionOverrides(currentOverrides);
        setQuestionOverrides(currentOverrides);
        showToast('Soal bawaan berhasil diperbarui! ✅');
      }
    } else {
      addCustomQuestion(questionData);
      setCustomQuestions(getCustomQuestions());
      showToast('Soal baru ditambahkan! ✅');
    }
    setEditingQuestion(null);
  };

  const handleResetQuestionOverride = (id) => {
    setConfirmDialog({
      icon: '🔄',
      title: 'Kembalikan Soal?',
      message: 'Soal bawaan ini akan dikembalikan ke teks asli bawaan sistem.',
      onConfirm: () => {
        const currentOverrides = getQuestionOverrides();
        delete currentOverrides[id];
        saveQuestionOverrides(currentOverrides);
        setQuestionOverrides(currentOverrides);
        setConfirmDialog(null);
        showToast('Soal dikembalikan ke bawaan! 🔄');
      },
    });
  };

  const handleDeleteQuestion = (id) => {
    setConfirmDialog({
      icon: '🗑️',
      title: 'Hapus Soal?',
      message: 'Soal custom ini akan dihapus permanen.',
      onConfirm: () => {
        const updated = deleteCustomQuestion(id);
        setCustomQuestions(updated);
        setConfirmDialog(null);
        showToast('Soal dihapus! 🗑️');
      },
    });
  };

  // ---- Leaderboard handlers ----
  const handleDeleteEntry = (id) => {
    const updated = deleteLeaderboardEntry(id);
    setLeaderboard(updated);
    showToast('Entry dihapus!');
  };

  const handleResetLeaderboard = () => {
    setConfirmDialog({
      icon: '⚠️',
      title: 'Reset Leaderboard?',
      message: 'Semua data leaderboard akan dihapus. Tindakan ini tidak bisa dibatalkan.',
      onConfirm: () => {
        resetLeaderboard();
        setLeaderboard([]);
        setConfirmDialog(null);
        showToast('Leaderboard direset! 🔄');
      },
    });
  };

  const handleExportLeaderboard = () => {
    const data = JSON.stringify(exportAllData(), null, 2);
    navigator.clipboard.writeText(data).then(() => {
      showToast('Data diekspor ke clipboard! 📋');
    }).catch(() => {
      showToast('Gagal mengekspor data', 'error');
    });
  };

  // ---- Identity handlers ----
  const handleToggleField = (key, prop) => {
    const updated = {
      ...identityConfig,
      fields: identityConfig.fields.map((f) =>
        f.key === key ? { ...f, [prop]: !f[prop] } : f
      ),
    };
    saveUserIdentityConfig(updated);
    setIdentityConfig(updated);
    showToast('Konfigurasi identitas disimpan! ✅');
  };

  const handleToggleMasterIdentity = () => {
    const updated = {
      ...identityConfig,
      enabled: identityConfig.enabled === false ? true : false,
    };
    saveUserIdentityConfig(updated);
    setIdentityConfig(updated);
    showToast(`Form identitas ${updated.enabled ? 'diaktifkan' : 'dinonaktifkan'}! ✅`);
  };

  // ---- Security handlers ----
  const handleChangePasskey = () => {
    if (currentPass !== settings.passkey) {
      showToast('Passkey lama salah!', 'error');
      return;
    }
    if (newPass.length < 4) {
      showToast('Passkey baru minimal 4 karakter!', 'error');
      return;
    }
    if (newPass !== confirmPass) {
      showToast('Konfirmasi passkey tidak cocok!', 'error');
      return;
    }
    handleUpdateSettings({ passkey: newPass });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    showToast('Passkey berhasil diubah! 🔐');
  };

  // All questions combined
  const mergedBuiltins = getMergedQuestions();
  const allQuestionsPool = [
    ...mergedBuiltins.filter((q) => q.type !== 'sandbox'),
    ...customQuestions.map((q) => ({ ...q, isCustom: true })),
  ];

  const filteredQuestions = allQuestionsPool.filter((q) => {
    if (!questionSearch) return true;
    const s = questionSearch.toLowerCase();
    return (
      (q.question || '').toLowerCase().includes(s) ||
      (q.sentence || '').toLowerCase().includes(s) ||
      (q.type || '').toLowerCase().includes(s)
    );
  });

  const filteredLeaderboard = leaderboard.filter((e) => {
    if (!leaderboardSearch) return true;
    const s = leaderboardSearch.toLowerCase();
    return (
      (e.name || '').toLowerCase().includes(s) ||
      (e.class || '').toLowerCase().includes(s)
    );
  });

  const handleNavClick = (key) => {
    setActiveSection(key);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-screen">
      <div className="admin-layout">
        {/* Sidebar Overlay (mobile) */}
        <div
          className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header">
            <div className="admin-sidebar-logo">🔧</div>
            <div>
              <div className="admin-sidebar-title">Admin Panel</div>
              <div className="admin-sidebar-subtitle">Detektif Kalimat</div>
            </div>
          </div>

          <nav className="admin-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                className={`admin-nav-item ${activeSection === item.key ? 'active' : ''}`}
                onClick={() => handleNavClick(item.key)}
              >
                <span className="admin-nav-icon">
                  <item.icon size={18} />
                </span>
                <span className="admin-nav-label">{item.label}</span>
                {item.key === 'questions' && customQuestions.length > 0 && (
                  <span className="admin-nav-badge">{customQuestions.length}</span>
                )}
                {item.key === 'leaderboard' && leaderboard.length > 0 && (
                  <span className="admin-nav-badge">{leaderboard.length}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <button className="admin-logout-btn" onClick={onLogout}>
              <LogOut size={16} /> Keluar Admin
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          <div className="admin-content-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                className="admin-mobile-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={24} />
              </button>
              <h2 className="admin-content-title">
                {NAV_ITEMS.find((n) => n.key === activeSection)?.label || 'Dashboard'}
              </h2>
            </div>
          </div>

          <div className="admin-content-body">
            {/* ===== DASHBOARD ===== */}
            {activeSection === 'dashboard' && (
              <div className="admin-fade-in">
                <div className="admin-stats-grid">
                  <div className="admin-stat-card">
                    <span className="admin-stat-icon">📝</span>
                    <div className="admin-stat-value">{mergedBuiltins.filter((q) => q.type !== 'sandbox').length}</div>
                    <div className="admin-stat-label">Soal Bawaan</div>
                  </div>
                  <div className="admin-stat-card">
                    <span className="admin-stat-icon">✏️</span>
                    <div className="admin-stat-value">{customQuestions.length}</div>
                    <div className="admin-stat-label">Soal Custom</div>
                  </div>
                  <div className="admin-stat-card">
                    <span className="admin-stat-icon">🏆</span>
                    <div className="admin-stat-value">{leaderboard.length}</div>
                    <div className="admin-stat-label">Entries Leaderboard</div>
                  </div>
                  <div className="admin-stat-card">
                    <span className="admin-stat-icon">⚙️</span>
                    <div className="admin-stat-value" style={{ fontSize: '1.2rem' }}>
                      {QUIZ_MODES.find((m) => m.key === settings.quizMode)?.label || 'Random'}
                    </div>
                    <div className="admin-stat-label">Mode Quiz</div>
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>📊 Ringkasan Pengaturan</h3>
                  </div>
                  <div className="admin-card-body">
                    <div className="admin-toggle-group">
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-label">Jumlah Soal per Quiz</span>
                      </div>
                      <span style={{ color: 'var(--admin-accent)', fontWeight: 800, fontSize: '1.1rem' }}>
                        {settings.useAllQuestions ? 'Semua Soal' : settings.questionCount}{settings.includeSandbox ? ` + ${mergedBuiltins.filter(q => q.type === 'sandbox').length} Sandbox` : ''}
                      </span>
                    </div>
                    <div className="admin-toggle-group">
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-label">Batas Waktu</span>
                      </div>
                      <span style={{ color: 'var(--admin-text-2)', fontWeight: 700 }}>
                        {settings.timeLimit > 0 ? `${settings.timeLimit} detik` : 'Tidak ada'}
                      </span>
                    </div>
                    <div className="admin-toggle-group">
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-label">Leaderboard</span>
                      </div>
                      <span style={{ color: settings.showLeaderboard ? 'var(--admin-success)' : 'var(--admin-text-3)', fontWeight: 700 }}>
                        {settings.showLeaderboard ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== SETTINGS ===== */}
            {activeSection === 'settings' && (
              <div className="admin-fade-in">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>🎮 Mode Quiz</h3>
                  </div>
                  <div className="admin-card-body">
                    <div className="admin-radio-group">
                      {QUIZ_MODES.map((mode) => (
                        <div
                          key={mode.key}
                          className={`admin-radio-option ${settings.quizMode === mode.key ? 'active' : ''}`}
                          onClick={() => handleUpdateSettings({ quizMode: mode.key })}
                        >
                          <span className="radio-icon">{mode.icon}</span>
                          <span className="radio-label">{mode.label}</span>
                          <span className="radio-desc">{mode.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>⚙️ Konfigurasi</h3>
                  </div>
                  <div className="admin-card-body">
                    <div className="admin-toggle-group" style={{ marginBottom: '20px', borderBottom: '1px dashed var(--admin-border)', paddingBottom: '16px' }}>
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-label">Sertakan Semua Soal</span>
                        <span className="admin-toggle-desc">Mainkan semua soal yang tersedia tanpa batas jumlah</span>
                      </div>
                      <label className="admin-toggle">
                        <input
                          type="checkbox"
                          checked={settings.useAllQuestions}
                          onChange={() => handleUpdateSettings({ useAllQuestions: !settings.useAllQuestions })}
                        />
                        <span className="admin-toggle-slider" />
                      </label>
                    </div>

                    <div className="admin-form-group" style={settings.useAllQuestions ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
                      <label className="admin-label">
                        <Hash size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                        Jumlah Soal (tanpa Sandbox)
                      </label>
                      <input
                        type="number"
                        className="admin-input"
                        min={1}
                        max={50}
                        value={settings.questionCount}
                        disabled={settings.useAllQuestions}
                        onChange={(e) => handleUpdateSettings({ questionCount: Math.max(1, Math.min(50, parseInt(e.target.value) || 1)) })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">
                        <Clock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                        Batas Waktu per Soal (detik, 0 = tanpa batas)
                      </label>
                      <input
                        type="number"
                        className="admin-input"
                        min={0}
                        max={300}
                        value={settings.timeLimit}
                        onChange={(e) => handleUpdateSettings({ timeLimit: Math.max(0, parseInt(e.target.value) || 0) })}
                      />
                    </div>

                    <div className="admin-toggle-group">
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-label">Sertakan Sandbox</span>
                        <span className="admin-toggle-desc">Soal kreatif di akhir quiz</span>
                      </div>
                      <label className="admin-toggle">
                        <input
                          type="checkbox"
                          checked={settings.includeSandbox}
                          onChange={() => handleUpdateSettings({ includeSandbox: !settings.includeSandbox })}
                        />
                        <span className="admin-toggle-slider" />
                      </label>
                    </div>

                    <div className="admin-toggle-group">
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-label">Acak Urutan Opsi</span>
                        <span className="admin-toggle-desc">Mengacak opsi jawaban setiap kali quiz</span>
                      </div>
                      <label className="admin-toggle">
                        <input
                          type="checkbox"
                          checked={settings.shuffleOptions}
                          onChange={() => handleUpdateSettings({ shuffleOptions: !settings.shuffleOptions })}
                        />
                        <span className="admin-toggle-slider" />
                      </label>
                    </div>

                    <div className="admin-toggle-group">
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-label">Tampilkan Leaderboard</span>
                        <span className="admin-toggle-desc">Tampilkan papan peringkat di halaman hasil</span>
                      </div>
                      <label className="admin-toggle">
                        <input
                          type="checkbox"
                          checked={settings.showLeaderboard}
                          onChange={() => handleUpdateSettings({ showLeaderboard: !settings.showLeaderboard })}
                        />
                        <span className="admin-toggle-slider" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== QUESTIONS ===== */}
            {activeSection === 'questions' && (
              <div className="admin-fade-in">
                <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => { setEditingQuestion(null); setEditorOpen(true); }}
                  >
                    <Plus size={16} /> Tambah Soal
                  </button>
                  <span style={{ color: 'var(--admin-text-3)', fontSize: '0.85rem', fontWeight: 700 }}>
                    {filteredQuestions.length} soal total ({customQuestions.length} custom)
                  </span>
                </div>

                <div className="admin-search-box">
                  <Search size={16} className="admin-search-icon" />
                  <input
                    className="admin-search-input"
                    placeholder="Cari soal..."
                    value={questionSearch}
                    onChange={(e) => setQuestionSearch(e.target.value)}
                  />
                </div>

                <div className="admin-question-list">
                  {filteredQuestions.map((q) => (
                    <div key={q.id} className="admin-question-item">
                      <span className={`admin-question-type-badge ${q.type}`}>
                        {q.type}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="admin-question-text">{q.question}</div>
                        {q.sentence && (
                          <div className="admin-question-sentence">"{q.sentence}"</div>
                        )}
                      </div>
                      <div className="admin-question-meta">
                        {q.isCustom ? (
                          <span className="admin-custom-badge">Custom</span>
                        ) : (
                          <span className="admin-builtin-badge">
                            Bawaan{q.isOverride ? ' (Diedit)' : ''}
                          </span>
                        )}
                      </div>
                      <div className="admin-question-actions">
                        <button
                          className="admin-btn-icon"
                          title="Edit"
                          onClick={() => { setEditingQuestion(q); setEditorOpen(true); }}
                        >
                          <Edit3 size={15} />
                        </button>
                        {q.isCustom ? (
                          <button
                            className="admin-btn-icon danger"
                            title="Hapus"
                            onClick={() => handleDeleteQuestion(q.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        ) : (
                          q.isOverride && (
                            <button
                              className="admin-btn-icon warning"
                              title="Kembalikan ke Bawaan"
                              onClick={() => handleResetQuestionOverride(q.id)}
                              style={{ color: 'var(--admin-accent)' }}
                            >
                              <RefreshCw size={15} />
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredQuestions.length === 0 && (
                    <div className="admin-empty-state">
                      <span className="admin-empty-icon">🔍</span>
                      <div className="admin-empty-text">Tidak ada soal ditemukan</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ===== LEADERBOARD ===== */}
            {activeSection === 'leaderboard' && (
              <div className="admin-fade-in">
                <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                  <button className="admin-btn admin-btn-danger" onClick={handleResetLeaderboard}>
                    <RefreshCw size={16} /> Reset Semua
                  </button>
                  <button className="admin-btn admin-btn-secondary" onClick={handleExportLeaderboard}>
                    <Copy size={16} /> Export Data
                  </button>
                </div>

                <div className="admin-search-box">
                  <Search size={16} className="admin-search-icon" />
                  <input
                    className="admin-search-input"
                    placeholder="Cari nama atau kelas..."
                    value={leaderboardSearch}
                    onChange={(e) => setLeaderboardSearch(e.target.value)}
                  />
                </div>

                {filteredLeaderboard.length > 0 ? (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama</th>
                          <th>Kelas</th>
                          <th>Skor</th>
                          <th>Tanggal</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeaderboard.map((entry, idx) => (
                          <tr key={entry.id}>
                            <td>
                              <span className={`rank-badge ${idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : 'default'}`}>
                                {idx + 1}
                              </span>
                            </td>
                            <td>{entry.name || '-'}</td>
                            <td>{entry.class || '-'}</td>
                            <td style={{ fontWeight: 800 }}>{entry.score}/{entry.total}</td>
                            <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-3)' }}>
                              {new Date(entry.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td>
                              <button
                                className="admin-btn-icon danger"
                                onClick={() => handleDeleteEntry(entry.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="admin-empty-state">
                    <span className="admin-empty-icon">🏆</span>
                    <div className="admin-empty-text">Belum ada data leaderboard</div>
                    <div className="admin-empty-sub">Data akan muncul setelah siswa menyelesaikan quiz</div>
                  </div>
                )}
              </div>
            )}

            {/* ===== IDENTITY CONFIG ===== */}
            {activeSection === 'identity' && (
              <div className="admin-fade-in">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>👤 Field Identitas User</h3>
                  </div>
                  <div className="admin-card-body">
                    <p style={{ color: 'var(--admin-text-3)', fontSize: '0.85rem', marginBottom: 20 }}>
                      Atur field yang ditampilkan sebelum siswa memulai quiz. Matikan toggle master untuk langsung melewati form identitas.
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--admin-surface-2)', borderRadius: 8, marginBottom: 20 }}>
                      <div style={{ fontWeight: 600 }}>Tampilkan Form Identitas</div>
                      <label className="admin-toggle" style={{ width: 44, height: 24 }}>
                        <input
                          type="checkbox"
                          checked={identityConfig.enabled !== false}
                          onChange={handleToggleMasterIdentity}
                        />
                        <span className="admin-toggle-slider" />
                      </label>
                    </div>

                    <div className="admin-identity-list" style={{ opacity: identityConfig.enabled !== false ? 1 : 0.5, pointerEvents: identityConfig.enabled !== false ? 'auto' : 'none' }}>
                      {identityConfig.fields.map((field) => (
                        <div key={field.key} className="admin-identity-item">
                          <span className="admin-identity-field-name">{field.label}</span>
                          <div className="admin-identity-controls">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span className="admin-identity-control-label">Tampilkan</span>
                              <label className="admin-toggle" style={{ width: 40, height: 22 }}>
                                <input
                                  type="checkbox"
                                  checked={field.enabled}
                                  onChange={() => handleToggleField(field.key, 'enabled')}
                                />
                                <span className="admin-toggle-slider" />
                              </label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: field.enabled ? 1 : 0.3 }}>
                              <span className="admin-identity-control-label">Wajib</span>
                              <label className="admin-toggle" style={{ width: 40, height: 22 }}>
                                <input
                                  type="checkbox"
                                  checked={field.required}
                                  disabled={!field.enabled}
                                  onChange={() => handleToggleField(field.key, 'required')}
                                />
                                <span className="admin-toggle-slider" />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== SECURITY ===== */}
            {activeSection === 'security' && (
              <div className="admin-fade-in">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>🔑 Ubah Passkey</h3>
                  </div>
                  <div className="admin-card-body">
                    <div className="admin-form-group">
                      <label className="admin-label">Passkey Saat Ini</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPass ? 'text' : 'password'}
                          className="admin-input"
                          value={currentPass}
                          onChange={(e) => setCurrentPass(e.target.value)}
                          placeholder="Masukkan passkey lama"
                        />
                        <button
                          className="admin-btn-icon"
                          style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', border: 'none' }}
                          onClick={() => setShowPass(!showPass)}
                        >
                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-label">Passkey Baru</label>
                        <input
                          type={showPass ? 'text' : 'password'}
                          className="admin-input"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="Min. 4 karakter"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Konfirmasi Passkey</label>
                        <input
                          type={showPass ? 'text' : 'password'}
                          className="admin-input"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          placeholder="Ulangi passkey baru"
                        />
                      </div>
                    </div>
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={handleChangePasskey}
                      disabled={!currentPass || !newPass || !confirmPass}
                      style={(!currentPass || !newPass || !confirmPass) ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                      <Save size={16} /> Simpan Passkey Baru
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Question Editor Modal */}
      <QuestionEditor
        isOpen={editorOpen}
        onClose={() => { setEditorOpen(false); setEditingQuestion(null); }}
        onSave={handleSaveQuestion}
        editingQuestion={editingQuestion}
      />

      {/* Confirm Dialog */}
      <AnimatePresence>
        {confirmDialog && (
          <motion.div
            className="admin-confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="admin-confirm-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="admin-confirm-icon">{confirmDialog.icon}</div>
              <div className="admin-confirm-title">{confirmDialog.title}</div>
              <div className="admin-confirm-message">{confirmDialog.message}</div>
              <div className="admin-confirm-actions">
                <button className="admin-btn admin-btn-secondary" onClick={() => setConfirmDialog(null)}>
                  Batal
                </button>
                <button className="admin-btn admin-btn-danger" onClick={confirmDialog.onConfirm}>
                  Ya, Lanjutkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`admin-toast ${toast.type}`}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
