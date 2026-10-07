import PropTypes from 'prop-types';

export default function GradeInput({
  id,
  label,
  min,
  max,
  value,
  error = '',
  onChange,
}) {
  const errorId = `${id}-error`;

  return (
    <div className="campo">
      <label htmlFor={id}>
        {label} <span>({min} - {max})</span>
      </label>
      <input
        type="number"
        id={id}
        name={id}
        min={min}
        max={max}
        step="0.01"
        inputMode="decimal"
        autoComplete="off"
        placeholder="0.00"
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <span className="campo-error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

GradeInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
