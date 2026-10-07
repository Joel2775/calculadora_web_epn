import { useCallback, useState } from 'react';
import { SEMESTER_LIMITS, SUPLETORIO_LIMITS } from '../constants/grades.js';
import {
  checkSupletorio,
  evaluateSemesters,
  getMinimumSupletorio,
} from '../utils/grades.js';
import { validateGrade } from '../utils/validation.js';

const EMPTY_FORM = Object.freeze({ first: '', second: '' });
const EMPTY_ERRORS = Object.freeze({ first: '', second: '' });

export function useCalculator() {
  const [values, setValues] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState({ ...EMPTY_ERRORS });
  const [result, setResult] = useState(null);

  const [supletorioValue, setSupletorioValue] = useState('');
  const [supletorioError, setSupletorioError] = useState('');
  const [verification, setVerification] = useState(null);

  const handleChange = useCallback((field, rawValue) => {
    setValues((prev) => ({ ...prev, [field]: rawValue }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setResult(null);
    setSupletorioValue('');
    setSupletorioError('');
    setVerification(null);
  }, []);

  const calculate = useCallback(() => {
    const first = validateGrade(values.first, SEMESTER_LIMITS);
    const second = validateGrade(values.second, SEMESTER_LIMITS);

    if (!first.ok || !second.ok) {
      setErrors({
        first: first.error ?? '',
        second: second.error ?? '',
      });
      setResult(null);
      return;
    }

    const evaluation = evaluateSemesters(first.value, second.value);

    setErrors({ ...EMPTY_ERRORS });
    setResult({
      ...evaluation,
      minimumSupletorio:
        evaluation.status === 'SUPLETORIO'
          ? getMinimumSupletorio(evaluation.sum)
          : null,
    });
    setSupletorioValue('');
    setSupletorioError('');
    setVerification(null);
  }, [values]);

  const handleSupletorioChange = useCallback((rawValue) => {
    setSupletorioValue(rawValue);
    setSupletorioError('');
    setVerification(null);
  }, []);

  const verifySupletorio = useCallback(() => {
    if (!result || result.status !== 'SUPLETORIO') {
      return;
    }

    const grade = validateGrade(supletorioValue, SUPLETORIO_LIMITS);

    if (!grade.ok) {
      setSupletorioError(grade.error ?? 'Nota invalida.');
      setVerification(null);
      return;
    }

    setSupletorioError('');
    setVerification(checkSupletorio(result.sum, grade.value));
  }, [result, supletorioValue]);

  const reset = useCallback(() => {
    setValues({ ...EMPTY_FORM });
    setErrors({ ...EMPTY_ERRORS });
    setResult(null);
    setSupletorioValue('');
    setSupletorioError('');
    setVerification(null);
  }, []);

  const hasErrors = Boolean(errors.first || errors.second);

  return {
    values,
    errors,
    hasErrors,
    result,
    supletorioValue,
    supletorioError,
    verification,
    handleChange,
    calculate,
    handleSupletorioChange,
    verifySupletorio,
    reset,
  };
}
