import { EditorComponentOptions } from 'netlify-cms-core';

interface PDFEmbedProps {
  src?: string;
  title?: string;
}

export const options: EditorComponentOptions = {
  id: 'pdf',
  label: 'PDF Embed',
  fields: [],
  pattern: /<PDFEmbed src="(.*)" title="(.*?)" \/>/,
  fromBlock: (match) => ({
    src: match[1],
    title: match[2],
  }),
  toBlock: ({ src, title }: PDFEmbedProps) => `<PDFEmbed src="${src}" title="${title}" />`,
  toPreview: ({ title }: PDFEmbedProps) => `<p><strong>${title}</strong></p>`,
};

export function PDFEmbed({ src, title }: PDFEmbedProps) {
  return (
    <>
      <div className="pdf-iframe-container">
        <iframe src={src} title={title} />
      </div>
      <style jsx>{`
        div.pdf-iframe-container {
          padding-top: 2rem;
          padding-bottom: 2rem;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        iframe {
          width: 100%;
          height: 30rem;
          border: none;
        }

        @media (min-width: 769px) {
          iframe {
            height: 60rem;
          }
        }
      `}</style>
    </>
  );
}
