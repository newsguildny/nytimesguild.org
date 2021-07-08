interface Props {
  text: string;
}

export function CenteredText({ text }: Props) {
  return (
    <>
      <div className="center">{text}</div>
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
