import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import '../styles/faq-styles.css';

const renderAnswer = (answer) => {
  // Regex to find [Link Text](Mailto)
  const linkRegex = /\[([^\]]+)]\((Mailto)\)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(answer)) !== null) {
    const [fullMatch, linkText, linkType] = match;
    const start = match.index;

    // Push text before the match
    if (start > lastIndex) {
      parts.push(answer.slice(lastIndex, start));
    }

    // Push the actual Link component
    if (linkType === 'Mailto') {
      parts.push(
        <Link key={start} to="/contact" className="faq-link">
          {linkText}
        </Link>
      );
    }

    lastIndex = start + fullMatch.length;
  }

  // Push any remaining text after the last link
  if (lastIndex < answer.length) {
    parts.push(answer.slice(lastIndex));
  }

  return <p>{parts}</p>;
};

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
                            <p>{renderAnswer(item.answer)}</p>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </div>
    );
};

export default FaqAccordion;

