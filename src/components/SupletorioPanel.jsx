import PropTypes from 'prop-types';
import { SUPLETORIO_LIMITS } from '../constants/grades.js';
import { formatGrade } from '../utils/validation.js';

export default function SupletorioPanel({
  minimum,
  sum,
  value,
  error = '',
  verification = null,
  onValueChange,
  onVerify,
}) {
  return (
    <div className="bloque-supletorio">
      <div className="nota-caja">
        <span className="nota-etiqueta">Necesitas en el supletorio</span>
        <p className="nota-minima">
          {formatGrade(minimum)}
          <small> / 40</small>
        </p>
        <p className="nota-pie">Minimo para pasar la materia</p>
      </div>

      <div className="campo campo-supl">
        <label htmlFor="notaSupletorio">
          Nota obtenida en el supletorio{' '}
          <span>({SUPLETORIO_LIMITS.min} - {SUPLETORIO_LIMITS.max})</span>
        </label>
        <input
          type="number"
          id="notaSupletorio"
          name="notaSupletorio"
          min={SUPLETORIO_LIMITS.min}
          max={SUPLETORIO_LIMITS.max}
          step="0.01"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'supletorio-error' : undefined}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onVerify();
            }
          }}
        />
        {error ? (
          <span className="campo-error" id="supletorio-error" role="alert">
            {error}
          </span>
        ) : null}
        <button type="button" className="btn btn-peligro" onClick={onVerify}>
          Verificar supletorio
        </button>
      </div>

      {verification ? (
        <div
          className={`verificacion ${
            verification.passed ? 'aprobo' : 'noaprobo'
          }`}
          role="status"
        >
          {verification.passed
            ? `\u2713 APROBASTE la materia \u00b7 nota final ${formatGrade(
                verification.finalAverage,
              )} / 20`
            : `\u2717 Au\u00f3n no apruebas \u00b7 nota final ${formatGrade(
                verification.finalAverage,
              )} / 20`}
          {!verification.passed ? (
            <span>
              Te faltan {formatGrade(verification.missingPoints)} puntos en el
              supletorio (sumaste {formatGrade(sum)} con los semestres).
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

SupletorioPanel.propTypes = {
  minimum: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  verification: PropTypes.shape({
    passed: PropTypes.bool.isRequired,
    finalAverage: PropTypes.number.isRequired,
    missingPoints: PropTypes.number.isRequired,
  }),
  onValueChange: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
};
