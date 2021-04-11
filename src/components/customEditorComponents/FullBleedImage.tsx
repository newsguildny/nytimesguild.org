import { EditorComponentOptions } from 'netlify-cms-core';

export const options: EditorComponentOptions = {
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
};

interface FullBleedImageProps {
  src: string;
  alt: string;
  title: string;
}

export function FullBleedImage({ src, alt, title }: FullBleedImageProps) {
  return (
    <>
      {/* We need the extra specificity from the class here to content with the
          hack in _app.tsx to get around next-mdx-remote's SSR */}
      <img className="full-bleed-image" src={src} alt={alt} title={title} />
      <style jsx>{`
        img.full-bleed-image {
          margin-top: 3rem;
          margin-left: 0;
          margin-right: 0;
          width: 100%;
          max-width: 100%;
        }
      `}</style>
    </>
  );
}
