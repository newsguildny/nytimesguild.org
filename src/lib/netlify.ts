import { CmsConfig, EditorComponentOptions } from 'netlify-cms-core';
import netlifyIdentityWidget from 'netlify-identity-widget';

const customEditorComponents: EditorComponentOptions[] = [
  {
    id: 'call-to-action',
    label: 'Call To Action',
    fields: [
      {
        name: 'destination',
        label: 'Destination',
        widget: 'string',
      },
      {
        name: 'content',
        label: 'Content',
        widget: 'string',
      },
    ],
    pattern: /<CallToAction to="([^\s]*)">(.*)<\/CallToAction>/,
    fromBlock: (match) => ({
      destination: match[1],
      content: match[2],
    }),
    toBlock: (data) => `<CallToAction to="${data.destination}">${data.content}</CallToAction>`,
    toPreview: (data) => `<a href="${data.destination}">${data.content}</a>`,
  },
];

export async function init(config: CmsConfig) {
  netlifyIdentityWidget.init();
  // This library executes client-only side effects when imported,
  // so it's important to use a dynamic import to avoid trying to
  // run the client-only code on the server.
  const netlifyCmsApp = (await import('netlify-cms-app')).default;
  netlifyCmsApp.init({ config });
  customEditorComponents.forEach((editorComponentOptions) =>
    netlifyCmsApp.registerEditorComponent(editorComponentOptions)
  );
}
