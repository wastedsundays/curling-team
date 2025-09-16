import { useEffect, useState } from 'react';

const AboutPage = () => {

const [team, setTeam] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchTeamData = async () => {
        try {
            const response = await fetch('/data/team-info.json');
            if (!response.ok) {
                throw new Error('Failed to fetch team info');
            }
            const teamData = await response.json();
            setTeam(teamData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchTeamData();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

    return (

        <div>
            <section>
                <img src={team.image_url} alt={team.image_alt} />
                <h1>Marpole Soul Men</h1>
                <h2>Everybody Is A Star</h2>
            </section>
            <section>
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
            <section>
                <h2>Meet the Team</h2>
                <div className='players-grid'>
                    <article>
                        <img src='https://picsum.photos/250/150' alt='placeholder image' />
                        <h3>Brad Lowe</h3>
                        <p>Skip</p>
                    </article>
                    <article>
                        <img src='https://picsum.photos/250/150' alt='placeholder image' />
                        <h3>Kerry Plowman</h3>
                        <p>Third</p>
                    </article>
                    <article>
                        <img src='https://picsum.photos/250/150' alt='placeholder image' />
                        <h3>David Hignell</h3>
                        <p>Second</p>
                    </article>
                    <article>
                        <img src='https://picsum.photos/250/150' alt='placeholder image' />
                        <h3>Adam Hauck</h3>
                        <p>Lead</p>
                    </article>
                </div>
            </section>
            <section>
                <h2>Recent Achievements</h2>
                <ul>
                    {team.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </section>
            <section>
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