import PropTypes from 'prop-types';
import { STATUS } from '../constants/grades.js';

const STYLES = {
  [STATUS.APPROVED]: 'estado estado-aprobado',
  [STATUS.SUPLETORIO]: 'estado estado-supletorio',
  [STATUS.REPROBADO]: 'estado estado-perdido',
};

export default function StatusBanner({ status }) {
  return (
    <p className={STYLES[status] ?? 'estado'} role="status">
      {status}
    </p>
  );
}

StatusBanner.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
};
