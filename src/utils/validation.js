import { DECIMAL_PLACES, NUMERIC_PATTERN } from '../constants/grades.js';

const FACTOR = 10 ** DECIMAL_PLACES;

export function roundGrade(value) {
  return Math.round((value + Number.EPSILON) * FACTOR) / FACTOR;
}

export function formatGrade(value) {
  return Number(value).toFixed(DECIMAL_PLACES);
}

function toFiniteNumber(rawValue) {
  if (typeof rawValue === 'number') {
    return Number.isFinite(rawValue) ? rawValue : Number.NaN;
  }

  if (typeof rawValue !== 'string') {
    return Number.NaN;
  }

  const trimmed = rawValue.trim();
  if (trimmed === '' || !NUMERIC_PATTERN.test(trimmed)) {
    return Number.NaN;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function validateGrade(rawValue, limits) {
  const value = toFiniteNumber(rawValue);

  if (Number.isNaN(value)) {
    return { ok: false, value: Number.NaN, error: 'Ingresa un numero valido.' };
  }

  if (value < limits.min || value > limits.max) {
    return {
      ok: false,
      value,
      error: `La nota debe estar entre ${limits.min} y ${limits.max}.`,
    };
  }

  return { ok: true, value, error: null };
}
