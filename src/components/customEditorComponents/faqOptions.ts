import { EditorComponentOptions } from "netlify-cms-core";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkToRehype from "remark-rehype";
import rehypeToRemark from "rehype-remark";
import { unified } from "unified";

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
  return String(getMarkdownToHtmlProcessor().processSync(markdown));
}

function convertHtmlToMarkdown(html: string) {
  return String(getHtmlToMarkdownProcessor().processSync(html));
}

export const faqOptions: EditorComponentOptions = {
  id: "frequently-asked-questions",
  label: "Frequently Asked Questions",
  fields: [
    {
      name: "questions",
      label: "Questions",
      widget: "list",
      fields: [
        {
          name: "question",
          label: "Question",
          widget: "string",
        },
        {
          name: "answer",
          label: "Answer",
          widget: "markdown",
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
      questionsJsx.matchAll(
        /<FAQItem question="(.*?)">\n\s*([\s\S]*?)\n\s*<\/FAQItem>/g,
      ),
    );

    return {
      questions: questions.map(([, question, answer]) => ({
        question: question.replaceAll("&quot;", '"'),
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
  <FAQItem question="${questionPair.question?.replaceAll('"', "&quot;") ?? ""}">
    ${convertMarkdownToHtml(questionPair.answer)}
  </FAQItem>`,
        )
        .join("") ?? ""
    }
</FAQ>
  `,
  toPreview: (data: FrequentlyAskedQuestionsData) =>
    data.questions
      ?.map(
        (questionPair) => `
          <h3>${questionPair.question}</h3>
          <div>${convertMarkdownToHtml(questionPair.answer)}</div>
        `,
      )
      .join("") ?? "",
};
