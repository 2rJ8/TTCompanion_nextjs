import { RotateCcw } from "lucide-react";

const filters = [
  ["estrategia", "Estrategia"],
  ["familiar", "Familiar"],
  ["cooperativo", "Cooperativo"],
  ["solitario", "Solitario"],
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
        {filters.map(([value, label]) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
            />{" "}
            {label} 
          </label>
        ))}
      </fieldset>
    </aside>
  );
}
