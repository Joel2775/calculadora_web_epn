import { SEMESTER_LIMITS } from '../constants/grades.js';
import { useCalculator } from '../hooks/useCalculator.js';
import GradeInput from './GradeInput.jsx';
import ResultPanel from './ResultPanel.jsx';

export default function Calculator() {
  const {
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
  } = useCalculator();

  const handleSubmit = (event) => {
    event.preventDefault();
    calculate();
  };

  return (
    <section className="calculadora">
      <form onSubmit={handleSubmit} noValidate>
        <div className="campos">
          <GradeInput
            id="semestre1"
            label="Nota Semestre 1"
            min={SEMESTER_LIMITS.min}
            max={SEMESTER_LIMITS.max}
            value={values.first}
            error={errors.first}
            onChange={(value) => handleChange('first', value)}
          />
          <GradeInput
            id="semestre2"
            label="Nota Semestre 2"
            min={SEMESTER_LIMITS.min}
            max={SEMESTER_LIMITS.max}
            value={values.second}
            error={errors.second}
            onChange={(value) => handleChange('second', value)}
          />
        </div>

        <div className="acciones">
          <button type="submit" className="btn btn-primario">
            Calcular
          </button>
          <button type="button" className="btn btn-secundario" onClick={reset}>
            Limpiar
          </button>
        </div>
      </form>

      {hasErrors ? (
        <p className="mensaje-error" role="alert">
          Revisa las notas ingresadas antes de calcular.
        </p>
      ) : null}

      {result ? (
        <ResultPanel
          result={result}
          supletorio={{
            value: supletorioValue,
            error: supletorioError,
            verification,
          }}
          onSupletorioChange={handleSupletorioChange}
          onVerify={verifySupletorio}
        />
      ) : null}
    </section>
  );
}
