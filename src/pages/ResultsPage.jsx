import React, { useEffect, useState } from 'react';
import '../styles/schedule-styles.css';

const ResultsPage = () => {

const [results, setResults] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [expandedRowIndex, setExpandedRowIndex] = useState(null);

const toggleRow = (index) => {
    if (expandedRowIndex === index) {
        setExpandedRowIndex(null);
    } else {
        setExpandedRowIndex(index);
    }
}

useEffect(() => {
    const fetchResultsData = async () => {
        try {
            // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/data/team-results.json`);
            const response = await fetch(`${import.meta.env.BASE_URL}/data/team-results.json`);
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
                <h2 className='hero-subtitle'>You Can Make It If You Slide</h2>
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
                            <React.Fragment key={index}>
                            <tr onClick={() => toggleRow(index)}>
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
                            {expandedRowIndex === index && (
                            <tr className='expanded-boxscore'>
                                <td colSpan="9">
                                    <div className='boxscore-details'>
                                        {game.boxscore_red.length === 0 && game.boxscore_blue.length === 0 ? 'No Boxscore Available' : 'Boxscore:'}<br />
                                        <div className='boxscores'>
                                            <div className='red-bg'>{game.hammer === 'red' ? '🔨' : ''}</div>
                                            {game.boxscore_red.map((end, endIndex) => (
                                                <div key={endIndex}>
                                                    {end === '' || end == null ? '--' : end}
                                                </div>
                                            ))}
                                            <div className='boxscore-total'>{game.total_red}</div>
                                        </div>
                                        <div className='boxscores'>
                                            <div className='blue-bg'>{game.hammer === 'blue' ? '🔨' : ''}</div>
                                            {game.boxscore_blue.map((end, endIndex) => (
                                                <div key={endIndex}>
                                                    {end === '' || end == null ? '--' : end}
                                                </div>
                                            ))}
                                            <div className='boxscore-total'>{game.total_blue}</div>
                                        </div>



                                    </div>
                                </td>
                            </tr>
                            )}
                            </React.Fragment>
                            
                        ))}
                    </tbody>
                </table>
            </div>
            </section>
        </div>
    );
};

export default ResultsPage;