

const FaqAccordion = ({ data }) => {
    return (
        <div>
            <h2 className='center-text'>Questions?</h2>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <strong>{item.question}</strong>
                            <p>{item.answer}</p>
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default FaqAccordion;