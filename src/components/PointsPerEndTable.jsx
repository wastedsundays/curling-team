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
                        <td data-label="End No: ">{row.endNumber}</td>
                        <td data-label="Points For: ">{row.pointsFor}</td>
                        <td data-label="Points Against: ">{row.pointsAgainst}</td>
                        <td data-label="Avg For: ">{row.avgFor ?? '--'}</td>
                        <td data-label="Avg Against: ">{row.avgAgainst ?? '--'}</td>
                        <td data-label="Ends Played: ">{row.endsPlayed}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PointsPerEndTable;