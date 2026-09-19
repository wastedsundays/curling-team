// calculatePointsPerEnd() / calculateRecordsStats() in dashboardStats.js.
const PointsPerEndTable = ({ pointsPerEnd }) => {
    if (!pointsPerEnd || pointsPerEnd.length === 0) {
        return null;
    }

    return (
        <table className="points-per-end-table">
            <thead>
                <tr>
                    <th>End</th>
                    <th>Points For</th>
                    <th>Points Against</th>
                    <th>Avg For</th>
                    <th>Avg Against</th>
                    <th>Ends Played</th>
                </tr>
            </thead>
            <tbody>
                {pointsPerEnd.map((row) => (
                    <tr key={row.endNumber}>
                        <td>{row.endNumber}</td>
                        <td>{row.pointsFor}</td>
                        <td>{row.pointsAgainst}</td>
                        <td>{row.avgFor ?? '--'}</td>
                        <td>{row.avgAgainst ?? '--'}</td>
                        <td>{row.endsPlayed}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PointsPerEndTable;