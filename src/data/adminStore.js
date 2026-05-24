import { allQuestions } from './quizData';

// ============================================
// Admin Store — localStorage persistence layer
// ============================================

const KEYS = {
  SETTINGS: 'dk_admin_settings',
  CUSTOM_QUESTIONS: 'dk_custom_questions',
  LEADERBOARD: 'dk_leaderboard',
  USER_IDENTITY_CONFIG: 'dk_user_identity_config',
  QUESTION_OVERRIDES: 'dk_question_overrides',
};

// ---- Default Values ----

const DEFAULT_SETTINGS = {
  passkey: '8888',
  quizMode: 'sequential',      // 'random' | 'sequential' | 'custom_only' | 'mixed'
  questionCount: 20,           // jumlah soal standard (+ sandbox jika enabled)
  includeSandbox: true,
  shuffleOptions: true,
  timeLimit: 0,                // 0 = no limit, in seconds
  showLeaderboard: true,
};

const DEFAULT_USER_IDENTITY_CONFIG = {
  fields: [
    { key: 'name', label: 'Nama', required: true, enabled: true },
    { key: 'class', label: 'Kelas', required: false, enabled: true },
    { key: 'studentId', label: 'No. Absen', required: false, enabled: false },
  ],
};

// ---- Generic helpers ----

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---- Admin Settings ----

export function getAdminSettings() {
  const stored = getJSON(KEYS.SETTINGS, {});
  return { ...DEFAULT_SETTINGS, ...stored };
}

export function saveAdminSettings(settings) {
  setJSON(KEYS.SETTINGS, settings);
}

export function updateAdminSettings(partial) {
  const current = getAdminSettings();
  const updated = { ...current, ...partial };
  saveAdminSettings(updated);
  return updated;
}

// ---- Custom Questions ----

export function getCustomQuestions() {
  return getJSON(KEYS.CUSTOM_QUESTIONS, []);
}

export function saveCustomQuestions(questions) {
  setJSON(KEYS.CUSTOM_QUESTIONS, questions);
}

export function addCustomQuestion(question) {
  const current = getCustomQuestions();
  const newQ = {
    ...question,
    id: 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    isCustom: true,
    createdAt: new Date().toISOString(),
  };
  current.push(newQ);
  saveCustomQuestions(current);
  return newQ;
}

export function updateCustomQuestion(id, updates) {
  const current = getCustomQuestions();
  const idx = current.findIndex((q) => q.id === id);
  if (idx !== -1) {
    current[idx] = { ...current[idx], ...updates, updatedAt: new Date().toISOString() };
    saveCustomQuestions(current);
  }
  return current;
}

export function deleteCustomQuestion(id) {
  const current = getCustomQuestions().filter((q) => q.id !== id);
  saveCustomQuestions(current);
  return current;
}

// ---- Question Overrides ----

export function getQuestionOverrides() {
  return getJSON(KEYS.QUESTION_OVERRIDES, {});
}

export function saveQuestionOverrides(overrides) {
  setJSON(KEYS.QUESTION_OVERRIDES, overrides);
}

export function getMergedQuestions() {
  const overrides = getQuestionOverrides();
  return allQuestions.map((q) => {
    if (overrides[q.id]) {
      return { ...q, ...overrides[q.id], isOverride: true, isBuiltin: true };
    }
    return { ...q, isBuiltin: true };
  });
}

// ---- Leaderboard ----

export function getLeaderboard() {
  return getJSON(KEYS.LEADERBOARD, []);
}

export function saveLeaderboard(entries) {
  setJSON(KEYS.LEADERBOARD, entries);
}

export function addLeaderboardEntry(entry) {
  const current = getLeaderboard();
  const newEntry = {
    ...entry,
    id: 'lb_' + Date.now(),
    timestamp: new Date().toISOString(),
  };
  current.push(newEntry);
  // Sort by score descending, then by time ascending
  current.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  saveLeaderboard(current);
  return current;
}

export function deleteLeaderboardEntry(id) {
  const current = getLeaderboard().filter((e) => e.id !== id);
  saveLeaderboard(current);
  return current;
}

export function resetLeaderboard() {
  saveLeaderboard([]);
}

// ---- User Identity Config ----

export function getUserIdentityConfig() {
  const stored = getJSON(KEYS.USER_IDENTITY_CONFIG, null);
  if (!stored) return { ...DEFAULT_USER_IDENTITY_CONFIG };
  // Merge with defaults to handle new fields gracefully
  return {
    ...DEFAULT_USER_IDENTITY_CONFIG,
    ...stored,
    fields: stored.fields || DEFAULT_USER_IDENTITY_CONFIG.fields,
  };
}

export function saveUserIdentityConfig(config) {
  setJSON(KEYS.USER_IDENTITY_CONFIG, config);
}

// ---- Verify Passkey ----

export function verifyPasskey(input) {
  const settings = getAdminSettings();
  return input === settings.passkey;
}

// ---- Export all data (for backup/debug) ----

export function exportAllData() {
  return {
    settings: getAdminSettings(),
    customQuestions: getCustomQuestions(),
    leaderboard: getLeaderboard(),
    userIdentityConfig: getUserIdentityConfig(),
    exportedAt: new Date().toISOString(),
  };
}

// ---- Reset everything ----

export function resetAllData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
