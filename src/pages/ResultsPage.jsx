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
            <section className='hero-section'>
                <img className='hero-image' src='https://adamh.ca/slidefamilycurling/images/marpole_cc.webp' alt='A shot of Marpole Curling Club' />
                <h1 className='hero-title'>Schedule & Results</h1>
            </section>
            <section className='section-spacing dark-bg-transparent'>
            <div>
                <table className='schedule-table'>
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
                                <td data-label='Date: '>{game.date === '' || game.date == null ? '--' : game.date}</td>
                                <td data-label='Opponent: '>{game.opponent === '' || game.opponent == null ? '--' : game.opponent}</td>
                                <td data-label='Sheet: '>{game.sheet === '' || game.sheet == null ? '--' : game.sheet}</td>
                                <td data-label='Time: '>{game.time === '' || game.time == null ? '--' : game.time}</td>
                                <td data-label='Competition: '>{game.competition === '' || game.competition == null ? '--' : game.competition}</td>
                                <td data-label='Box: '>{game.box === '' || game.box == null ? '--' : game.box}</td>
                                <td data-label='Score: '>{game.score === '' || game.score == null ? '--' : game.score}</td>
                                <td data-label='Result: '>{game.result === '' || game.result == null ? '--' : game.result}</td>
                                <td data-label='Record: '>{game.record === '' || game.record == null ? '--' : game.record}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </section>
        </div>
    );
};

export default ResultsPage;