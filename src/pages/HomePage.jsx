

const HomePage = () => {
  return (
    <div>
        <section className='hero-section'>
            <img className='hero-image' src='https://adamh.ca/slidefamilycurling/images/ai_team_photo.webp' alt='Curling team photo with 4 men in matching uniforms.' />
            <h1 className='hero-title'>Slide & The Family Stone</h1>
            <h2 className='hero-subtitle'>Curling Funkdamentals</h2>
            <div className='cta-button-group'>
                <button className='link-button red-button'>Challenge Us</button>
                <button className='link-button black-button'>Meet The Team</button>
            </div>
        </section>
        <section className='section-spacing'>

        </section>
        <section className='section-spacing dark-bg-transparent'>
            <h2>What We're All About</h2>
            <div>
                <p>We're 4 guys who were all in the same Thursday league and thought it would be fun to take on the Monday Open League.</p>
                <p>Sure, our technique is questionable, our strategy meetings are debating whose turn it is to buy drinks and 50/50 tickets. But what we lack in skill, we make up for in determination to have the best possible time on the ice.</p>
                <p>We curl for the love of the game, the frindship, and the inexplicable joy of yelling at a 44 pound slab of granite.</p>

            </div>
            <img src='https://picsum.photos/600' alt='placeholder image' />
        </section>
        <section className='section-spacing'>
            <h2 className='center-text-700'>Everything You Need to Know</h2>
            <div>
                <article>
                    <img src='https://picsum.photos/300/150' alt='placeholder image' />
                    <h3>Meet the Team</h3>
                    <p>Get to know the people responsible for this beautiful disaster.</p>
                    <p>Learn About Us --</p>
                </article>
                <article>
                    <img src='https://picsum.photos/300/150' alt='placeholder image' />
                    <h3>Results</h3>
                    <p>Check out our schedule and see how we're doing this season.</p>
                    <p>See Our Results --</p>
                </article>
                <article>
                    <img src='https://picsum.photos/300/150' alt='placeholder image' />
                    <h3>Get in Touch</h3>
                    <p>Questions about our technique? Want to challenge us? We're surprisingly responsive</p>
                    <p>Contact Us --</p>
                </article>
            </div>
        </section>
        <section className='section-spacing'>
            <h2 className='center-text-700'>What People Are Saying</h2>
            <div className='testimonial-block'>
                <blockquote>
                    <p>"This team is amazing! They bring so much energy and fun to the ice. Watching them play is always a highlight of my week."</p>
                    <cite>- Jane Doe, Curling Enthusiast</cite>
                </blockquote>
                <blockquote>
                    <p>"I had the pleasure of playing against this team, and let me tell you, they are a force to be reckoned with. Their teamwork and strategy are top-notch!"</p>
                    <cite>- John Smith, Opposing Team Captain</cite>
                </blockquote>
            </div>
        </section>
        <section className='section-spacing red-section center-text-700'>
            <h2>Ready to Take Us On?</h2>
            <p>We promise a good time, questionable curling, and you definitely buying drinks after.</p>
            <div className='cta-button-group'>
                <button className='link-button black-button'>Challenge Us</button>
                <button className='link-button white-button'>Just Say Hello</button>
            </div>
        </section>
    </div>
  )
}

export default HomePage
