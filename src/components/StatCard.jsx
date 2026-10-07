import PropTypes from 'prop-types';
import { formatGrade } from '../utils/validation.js';

export default function StatCard({ value, label }) {
  return (
    <div className="dato">
      <span className="dato-valor">{formatGrade(value)}</span>
      <span className="dato-etiqueta">{label}</span>
    </div>
  );
}

StatCard.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};
