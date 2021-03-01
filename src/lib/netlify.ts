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
  {
    id: 'youtube',
    label: 'YouTube Embed',
    fields: [
      {
        name: 'title',
        label: 'Title',
        widget: 'string',
      },
      {
        name: 'url',
        label: 'Video URL',
        widget: 'string',
      },
    ],
    pattern: /<YouTube url="(.*)" title="(.*)" \/>/,
    fromBlock: (match) => ({
      url: match[1],
      title: match[2],
    }),
    toBlock: (data) => `<YouTube url="${data.url}" title="${data.title}" />`,
    toPreview: (data) => `
      <iframe
        title=${data.title}
        width="560"
        height="315"
        src=${`https://www.youtube.com/embed/${
          data.url.match(
            /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/
          )?.[1] ?? ''
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    `,
  },
  {
    id: 'full-bleed-image',
    label: 'Full Bleed Image',
    fields: [
      {
        name: 'alt',
        label: 'Alt text',
        widget: 'string',
      },
      {
        name: 'src',
        label: 'Image',
        widget: 'image',
      },
    ],
    pattern: /<FullBleedImage alt="(.*)" src="(.*)" \/>/,
    fromBlock: (match) => ({
      alt: match[1],
      src: match[2],
    }),
    toBlock: (data) => `<FullBleedImage alt="${data.alt}" src="${data.src}" />`,
    toPreview: (data) => `<img alt="${data.alt}" src="${data.src}" />`,
  },
  {
    id: 'recent-papers',
    label: 'Recent Shop Papers',
    fields: [],
    pattern: /<RecentPapers \/>/,
    fromBlock: () => ({}),
    toBlock: () => `<RecentPapers />`,
    toPreview: () => `<p><strong>Recent Shop Papers Block</strong></p>`,
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
