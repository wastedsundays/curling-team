import { useEffect, useState } from 'react';

const ResultsPage = () => {

const [results, setResults] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchResultsData = async () => {
        try {
            const response = await fetch('/data/team-results.json');
            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }
            const resultsData = await response.json();
            setResults(resultsData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchResultsData();
}, []);



if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <img src='https://adamh.ca/slidefamilycurling/images/marpole_cc.webp' alt='A shot of Marpole Curling Club' />
            <h1>Results</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Opponent</th>
                            <th>Sheet</th>
                            <th>Time</th>
                            <th>Competition</th>
                            <th>Box</th>
                            <th>Score</th>
                            <th>Result</th>
                            <th>Record</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.games.map((game, index) => (
                            <tr key={index}>
                                <td>{game.date}</td>
                                <td>{game.opponent}</td>
                                <td>{game.sheet}</td>
                                <td>{game.time}</td>
                                <td>{game.competition}</td>
                                <td>{game.box}</td>
                                <td>{game.score === '' || game.score == null ? '--' : game.score}</td>
                                <td>{game.result === '' || game.result == null ? '--' : game.result}</td>
                                <td>{game.record === '' || game.record == null ? '--' : game.record}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsPage;