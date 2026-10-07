export const SEMESTER_LIMITS = Object.freeze({ min: 0, max: 20 });
export const SUPLETORIO_LIMITS = Object.freeze({ min: 0, max: 40 });

export const THRESHOLDS = Object.freeze({
  APPROVED_SUM: 28,
  SUPLETORIO_MIN_SUM: 18,
  FINAL_PASSING_AVERAGE: 24,
});

export const STATUS = Object.freeze({
  APPROVED: 'APROBADO',
  SUPLETORIO: 'SUPLETORIO',
  REPROBADO: 'REPROBADO',
});

export const DECIMAL_PLACES = 2;

export const NUMERIC_PATTERN = /^\d+(?:\.\d+)?$/;
