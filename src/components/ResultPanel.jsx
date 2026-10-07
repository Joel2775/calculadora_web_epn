import PropTypes from 'prop-types';
import { STATUS } from '../constants/grades.js';
import StatCard from './StatCard.jsx';
import StatusBanner from './StatusBanner.jsx';
import SupletorioPanel from './SupletorioPanel.jsx';

export default function ResultPanel({ result, supletorio, onSupletorioChange, onVerify }) {
  return (
    <section className="resultado" aria-live="polite">
      <StatusBanner status={result.status} />

      <div className="resumen">
        <StatCard value={result.sum} label="Suma semestres / 40" />
        <StatCard value={result.average} label="Promedio / 20" />
      </div>

      {result.status === STATUS.SUPLETORIO ? (
        <SupletorioPanel
          minimum={result.minimumSupletorio}
          sum={result.sum}
          value={supletorio.value}
          error={supletorio.error}
          verification={supletorio.verification}
          onValueChange={onSupletorioChange}
          onVerify={onVerify}
        />
      ) : null}

      {result.status === STATUS.REPROBADO ? (
        <div className="bloque-perdido">
          <p>
            No llegas al supletorio: la suma de tus semestres es menor a{' '}
            <strong>18</strong>.
          </p>
        </div>
      ) : null}

      {result.status === STATUS.APPROVED ? (
        <div className="bloque-aprobado">
          <p>
            Aprobaste la materia con <strong>28</strong> o mas, sin necesidad
            de supletorio.
          </p>
        </div>
      ) : null}
    </section>
  );
}

ResultPanel.propTypes = {
  result: PropTypes.shape({
    status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
    sum: PropTypes.number.isRequired,
    average: PropTypes.number.isRequired,
    minimumSupletorio: PropTypes.number,
  }).isRequired,
  supletorio: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    verification: PropTypes.shape({
      passed: PropTypes.bool.isRequired,
      finalAverage: PropTypes.number.isRequired,
      missingPoints: PropTypes.number.isRequired,
    }),
  }).isRequired,
  onSupletorioChange: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
};
