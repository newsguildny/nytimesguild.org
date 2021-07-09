import { EditorComponentOptions } from 'netlify-cms-core';
import { ReactNode } from 'react';

export const options: EditorComponentOptions = {
  id: 'centered-content',
  label: 'Centered Content',
  fields: [
    {
      name: 'content',
      label: 'Content',
      widget: 'string',
    },
  ],
  pattern: /<CenteredContent>([^\s]*)<\/CenteredContent>/,
  fromBlock: (match) => ({
    content: match[1],
  }),
  toBlock: (data) => `<CenteredContent>${data.content}</CenteredContent>`,
  toPreview: (data) => `<div style="text-align:center;">${data.content}</div>`,
};

interface Props {
  children: ReactNode;
}

export function CenteredContent({ children }: Props) {
  return (
    <>
      <div className="center">{children}</div>
      <style jsx>{`
        .center {
          padding-top: 12px;
          font-size: 26px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
