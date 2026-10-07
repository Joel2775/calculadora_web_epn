import Calculator from './components/Calculator.jsx';

const RULES = [
  <>Se aprueba con <strong>28 / 40</strong> (suma de dos semestres sobre 20 c/u).</>,
  <>Supletorio desde <strong>18</strong> puntos de suma.</>,
  <>Para pasar: <strong>(suma + supletorio) / 2 &ge; 24</strong>.</>,
];

export default function App() {
  return (
    <main className="tarjeta">
      <header className="cabecera">
        <span className="escudo" aria-hidden="true">
          EPN
        </span>
        <div>
          <h1>Escuela Polit&eacute;cnica Nacional</h1>
          <p className="subtitulo">Calculadora de aprobaci&oacute;n de materia</p>
        </div>
      </header>

      <section className="reglas" aria-label="Reglas de aprobacion">
        <ul>
          {RULES.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </section>

      <Calculator />
    </main>
  );
}
