import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import '../styles/faq-styles.css';

const FaqAccordion = ({ data }) => {
return (
        <div className="faq-container">
            <h2 className="center-text">Questions?</h2>
            <Accordion.Root type="single" collapsible className="accordion-root">
                {data.map((item, index) => (
                    <Accordion.Item value={`item-${index}`} key={index} className="accordion-item">
                        <Accordion.Header className="accordion-header">
                            <Accordion.Trigger className="accordion-trigger">
                                {item.question}
                                <ChevronDownIcon className="arrow" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="accordion-content">
                            <p>{item.answer}</p>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </div>
    );
};

export default FaqAccordion;

