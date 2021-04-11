import { ReactNode } from 'react';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkToRehype from 'remark-rehype';
import rehypeToRemark from 'rehype-remark';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { EditorComponentOptions } from 'netlify-cms-core';
import { sansSerif, serif, serifSizes } from '../../lib/styles/tokens/fonts';

interface QuestionPair {
  question?: string;
  answer: string;
}

interface FrequentlyAskedQuestionsData {
  questions?: QuestionPair[];
}

function getMarkdownToHtmlProcessor() {
  return unified().use(remarkParse).use(remarkToRehype).use(rehypeStringify);
}

function getHtmlToMarkdownProcessor() {
  return unified().use(rehypeParse).use(rehypeToRemark).use(remarkStringify);
}

function convertMarkdownToHtml(markdown: string) {
  return getMarkdownToHtmlProcessor().processSync(markdown).contents.toString();
}

function convertHtmlToMarkdown(html: string) {
  return getHtmlToMarkdownProcessor().processSync(html).contents.toString();
}

export const options: EditorComponentOptions = {
  id: 'frequently-asked-questions',
  label: 'Frequently Asked Questions',
  fields: [
    {
      name: 'questions',
      label: 'Questions',
      widget: 'list',
      fields: [
        {
          name: 'question',
          label: 'Question',
          widget: 'string',
        },
        {
          name: 'answer',
          label: 'Answer',
          widget: 'markdown',
        },
      ],
    },
  ],
  // [\s\S]* is an alternative to .* that captures newline characters.
  pattern: /<FAQ>([\s\S]*)<\/FAQ>/,
  fromBlock: (match): FrequentlyAskedQuestionsData => {
    const questionsJsx = match[1];
    const questions = Array.from(
      // [\s\S]* is an alternative to .* that captures newline characters.
      questionsJsx.matchAll(/<FAQItem question="(.*?)">\n\s*([\s\S]*?)\n\s*<\/FAQItem>/g)
    );

    return {
      questions: questions.map(([, question, answer]) => ({
        question: question.replaceAll('&quot;', '"'),
        answer: convertHtmlToMarkdown(answer),
      })),
    };
  },
  toBlock: (data: FrequentlyAskedQuestionsData) =>
    `
<FAQ>${
      data.questions
        ?.map(
          (questionPair) =>
            `
  <FAQItem question="${questionPair.question?.replaceAll('"', '&quot;') ?? ''}">
    ${convertMarkdownToHtml(questionPair.answer)}
  </FAQItem>`
        )
        .join('') ?? ''
    }
</FAQ>
  `,
  toPreview: (data: FrequentlyAskedQuestionsData) =>
    data.questions
      ?.map(
        (questionPair) => `
          <h3>${questionPair.question}</h3>
          <div>${convertMarkdownToHtml(questionPair.answer)}</div>
        `
      )
      .join('') ?? '',
};

interface QuestionProps {
  question: string;
  children: ReactNode;
}

export function FAQItem({ question, children }: QuestionProps) {
  return (
    <>
      <AccordionItem className="accordion-item">
        <AccordionItemHeading className="accordion-item-heading">
          <AccordionItemButton className="accordion-item-button">
            <span className="question">{question}</span>
            <AccordionItemState>
              {({ expanded }) => <span className={`icon ${expanded ? 'expanded' : 'collapsed'}`} />}
            </AccordionItemState>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>{children}</AccordionItemPanel>
      </AccordionItem>
      <style jsx>{`
        :global(.accordion-item) {
          border-bottom: 0.15rem solid #f3f3f3;
        }
        :global(.accordion-item-button) {
          display: flex;
          align-items: center;
          width: 100%;
          border: none;
          background-color: #fff;
          text-align: left;
          color: #666666;
          cursor: pointer;
        }

        :global(.accordion-item-heading) {
          padding: 0.5rem 0;
          font-family: ${serif};
          font-size: ${serifSizes.medium};
          font-weight: 200;
        }

        :global(.accordion-item-button):hover {
          color: #000;
        }

        .question {
          width: 95%;
        }

        .icon {
          float: right;
          font-size: 1.5em;
          font-weight: 100;
          font-family: ${sansSerif};
          margin-left: 10px;
        }

        .expanded::after {
          content: '–';
        }

        .collapsed::after {
          content: '+';
        }

        @media (min-width: 769px) {
          .question {
            width: 97%;
          }
        }
      `}</style>
    </>
  );
}

interface FAQProps {
  children: ReactNode;
}

export function FAQ({ children }: FAQProps) {
  return (
    <div>
      <Accordion allowMultipleExpanded allowZeroExpanded>
        {children}
      </Accordion>
      <style jsx>{`
        div {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
}
