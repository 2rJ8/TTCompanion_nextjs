import { RotateCcw } from "lucide-react";

const filters = [
  ["estrategia", "Estrategia", 48],
  ["familiar", "Familiar", 31],
  ["cooperativo", "Cooperativo", 29],
  ["solitario", "Solitario", 18],
];

export default function GameFilters({ selected, onToggle, onReset }) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-heading">
        <strong>Filtros</strong>
        <button type="button" onClick={onReset}>
          <RotateCcw className="icon--sm" aria-hidden="true" /> Restablecer
        </button>
      </div>
      <fieldset>
        <legend>Género</legend>
        {filters.map(([value, label, count]) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
            />{" "}
            {label} <span>{count}</span>
          </label>
        ))}
      </fieldset>
    </aside>
  );
}
