import {
  STATUS,
  SUPLETORIO_LIMITS,
  THRESHOLDS,
} from '../constants/grades.js';
import { roundGrade } from './validation.js';

const FLOAT_TOLERANCE = 1e-9;

export function evaluateSemesters(first, second) {
  const sum = roundGrade(first + second);
  const average = roundGrade(sum / 2);

  if (sum >= THRESHOLDS.APPROVED_SUM) {
    return { status: STATUS.APPROVED, sum, average };
  }

  if (sum >= THRESHOLDS.SUPLETORIO_MIN_SUM) {
    return { status: STATUS.SUPLETORIO, sum, average };
  }

  return { status: STATUS.REPROBADO, sum, average };
}

export function getMinimumSupletorio(sum) {
  const required =
    2 * THRESHOLDS.FINAL_PASSING_AVERAGE - sum;
  return roundGrade(
    Math.min(SUPLETORIO_LIMITS.max, Math.max(SUPLETORIO_LIMITS.min, required)),
  );
}

export function getFinalAverage(sum, supletorio) {
  return roundGrade((sum + supletorio) / 2);
}

export function checkSupletorio(sum, supletorio) {
  const finalAverage = getFinalAverage(sum, supletorio);
  const passed =
    (sum + supletorio) / 2 + FLOAT_TOLERANCE >=
    THRESHOLDS.FINAL_PASSING_AVERAGE;
  const missing = roundGrade(
    Math.max(
      0,
      2 * THRESHOLDS.FINAL_PASSING_AVERAGE - (sum + supletorio),
    ),
  );

  return { passed, finalAverage, missingPoints: missing };
}
