interface Props {
  url: string;
  title: string;
}

const YouTube = ({ url, title }: Props) => {
  const videoId =
    url.match(
      /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/
    )?.[1] ?? '';
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <>
      <iframe
        title={title}
        width="560"
        height="315"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <style jsx>{`
        iframe {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default YouTube;
