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
