import { EditorComponentOptions } from 'netlify-cms-core';

export interface QuestionPair {
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsData {
  questions: QuestionPair[];
}

const frequentlyAskedQuestions: EditorComponentOptions = {
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
          widget: 'string',
        },
      ],
    },
  ],
  pattern: /<FAQ>(.*)<\/FAQ>/,
  fromBlock: (match): FrequentlyAskedQuestionsData => ({
    questions: match[1]
      .split('<li>')
      .slice(1)
      .map((pair) => pair.slice(3, -9).split('</p><p>'))
      .map(([question, answer]) => ({ question, answer })),
  }),
  toBlock: (data: FrequentlyAskedQuestionsData) =>
    `<FAQ questionPairs={${JSON.stringify(data.questions)}} />`,
  toPreview: (data: FrequentlyAskedQuestionsData) =>
    `
    ${data.questions
      ?.map(
        (questionPair) => `
            <h3>${questionPair.question}</h3>
            <p>${questionPair.answer}</p>
        `
      )
      .join('')}`,
};

export default frequentlyAskedQuestions;
