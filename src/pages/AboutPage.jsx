import { useEffect, useState } from 'react';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import PlayerModal from '../components/PlayerCard/PlayerModal';

const AboutPage = () => {

    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamRes, playersRes] = await Promise.all([
                    fetch('/data/team-info.json'),
                    fetch('/data/team-players.json')
                ]);

                if (!teamRes.ok || !playersRes.ok) {
                    throw new Error('Network response was not ok');
                }
                const [teamData, playersData] = await Promise.all([
                    teamRes.json(),
                    playersRes.json()
                ]);
                setTeam(teamData);
                setPlayers(playersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(players);

    return (

        <div>
            <section className='hero-section'>
                <img className='hero-image' src={team.image_url} alt={team.image_alt} />
                <h1 className='hero-title'>Marpole Soul Men</h1>
                <h2 className='hero-subtitle'>Everybody Is A Star</h2>
            </section>
            <section className='section-spacing dark-bg-transparent'>
                <div>
                    <div>
                        <p>Slide & the Family Stone is a mildly competitive men's curling team based in Vancouver at Marpole Curling Club. We pride ourselves on strategic play that sometimes pans out, team chemistry, and good sportsmanship both on and off the ice.</p>
                        <p>The team was founded in 2023 as a mixed team, then known as The House Cleaners. In 2024, David joined us as a super-spare. With our lead Suzanne stepping back at the end of 2024, David joined us full-time (and that's how we became a men's team).</p>
                        <p>Our best work usually comes in the lounge after a game.</p>
                    </div>
                    <img src='https://picsum.photos/450' alt='placeholder image' />
                </div>
                <div>
                    <h3>Fast Facts</h3>
                    <b>Founded:</b>  {team.foundedYear}<br/>
                    <b>Home Club:</b>  {team.homeClub}<br/>
                    <b>League:</b>  {team.league}<br/>
                    <b>From:</b>  {team.city}
                </div>                
            </section>
            <section className='section-spacing'>
                <h2>Meet the Team</h2>
                <div className='players-grid'>
                    {players.players.map((player) => (
                        <PlayerCard
                            key={player.id}
                            {...player}
                            onClick={() => setSelectedPlayer(player)}
                        />
                    ))}

                </div>
                {selectedPlayer && (
                    <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
                )}
            </section>
            <section className='section-spacing dark-bg-transparent'>
                <h2>Recent Achievements</h2>
                <ul>
                    {team.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </section>
            <section className='section-spacing'>
                <h2>Questions?</h2>
                <ul>
                    {team.faq.map((item, index) => (
                        <li key={index}>
                            <strong>{item.question}</strong>
                            <p>{item.answer}</p>
                        </li>
                    ))}
                </ul>
            </section>

        
        </div>
    );
};

export default AboutPage;