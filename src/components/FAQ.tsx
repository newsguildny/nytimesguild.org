import { FC } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { sansSerif, serif, serifSizes } from '../styles/tokens/fonts';
import { QuestionPair } from '../lib/frequentlyAskedQuestions';

interface Props {
  questionPairs: QuestionPair[];
}

const FAQ: FC<Props> = (props) => (
  <div>
    <Accordion allowMultipleExpanded allowZeroExpanded>
      {props.questionPairs?.map((pair, index) => (
        <AccordionItem key={index.toString()}>
          <AccordionItemHeading>
            <AccordionItemButton className="accordion-item-button">
              <h3>{pair.question}</h3>
              <AccordionItemState>
                {({ expanded }) => (
                  <span className={`icon ${expanded ? 'expanded' : 'collapsed'}`} />
                )}
              </AccordionItemState>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>{pair.answer}</p>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
    <style jsx>{`
      div {
        max-width: 100%;
        margin-bottom: 1em;
      }

      div :global(.accordion-item-button:hover h3) {
        color: #000;
      }

      div :global(.accordion-item-button:hover .icon) {
        color: #000;
      }

      div :global(.accordion-item-button) {
        display: flex;
        align-items: center;
        width: 100%;
        border: none;
        background-color: #fff;
        border-bottom: 0.15rem solid #f3f3f3;
        text-align: left;
        color: #666666;
        cursor: pointer;
      }

      div h3 {
        width: 95%;
        font-family: ${serif};
        font-size: ${serifSizes.medium};
        font-weight: 200;
      }

      div .icon {
        float: right;
        font-size: 4rem;
        font-weight: 100;
        font-family: ${sansSerif};
        margin-left: 10px;
      }

      div .expanded::after {
        content: '–';
      }

      div .collapsed::after {
        content: '+';
      }

      @media (min-width: 769px) {
        div {
          min-width: 65%;
          max-width: 65%;
        }

        div :global(.icon) {
          font-size: 3.5rem;
        }

        div :global(h3) {
          width: 97%;
        }
      }
    `}</style>
  </div>
);

export default FAQ;
