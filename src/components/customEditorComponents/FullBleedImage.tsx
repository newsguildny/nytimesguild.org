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

const FullBleedImage = ({ src, alt, title }: FullBleedImageProps) => (
  <>
    <img src={src} alt={alt} title={title} />
    <style jsx>{`
      img {
        margin-top: 3rem;
        padding: 0;
        width: 100%;
        max-width: 100%;
      }
    `}</style>
  </>
);

export default FullBleedImage;
