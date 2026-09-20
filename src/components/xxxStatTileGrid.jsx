const StatTileGrid = ({ title, stats, statRows, onStatClick, selectedKey }) => (
    <section className="section-spacing">
        {title && <h2>{title}</h2>}
        <div className="stat-grid">
            {statRows.map(({ key, label, suffix, decimals, chartable }) => {
                const value = stats[key];
                const display =
                    value === null || value === undefined
                        ? '--'
                        : `${typeof value === 'number' && decimals !== undefined ? value.toFixed(decimals) : value}${suffix ?? ''}`;
                const isClickable = Boolean(chartable && onStatClick);
                return (
                    <div
                        className={`stat-item${isClickable ? ' stat-item--clickable' : ''}${key === selectedKey ? ' stat-item--selected' : ''}`}
                        key={key}
                        onClick={isClickable ? () => onStatClick(key) : undefined}
                        role={isClickable ? 'button' : undefined}
                        tabIndex={isClickable ? 0 : undefined}
                    >
                        <span className="stat-value">{display}</span>
                        <span className="stat-label">{label}</span>
                    </div>
                );
            })}
        </div>
    </section>
);
 
export default StatTileGrid;