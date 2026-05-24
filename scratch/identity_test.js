const DEFAULT_USER_IDENTITY_CONFIG = {
  fields: [
    { key: 'name', label: 'Nama', required: true, enabled: true },
    { key: 'class', label: 'Kelas', required: false, enabled: true },
    { key: 'studentId', label: 'No. Absen', required: false, enabled: false },
  ],
};

function getUserIdentityConfig(stored) {
  if (!stored) return { ...DEFAULT_USER_IDENTITY_CONFIG };
  return {
    ...DEFAULT_USER_IDENTITY_CONFIG,
    ...stored,
    fields: stored.fields || DEFAULT_USER_IDENTITY_CONFIG.fields,
  };
}

const storedConfig = {
  fields: [
    { key: 'name', label: 'Nama', required: false, enabled: false },
    { key: 'class', label: 'Kelas', required: false, enabled: false },
    { key: 'studentId', label: 'No. Absen', required: false, enabled: false },
  ],
};

const result = getUserIdentityConfig(storedConfig);
console.log('Result:', JSON.stringify(result, null, 2));
const hasEnabled = result.fields.some(f => f.enabled);
console.log('Has Enabled Fields:', hasEnabled);
