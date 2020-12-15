interface Props {
  children: (props: never) => React.ReactNode;
}

export function Heading1({ children }: Props) {
  return (
    <>
      <h1>{children}</h1>
      <style jsx>
        {`
          h1 {
            font-family: Crimson Pro;
            font-size: 42px;
            font-weight: 200;
            color: #ff4040;
          }
          @media (min-width: 769px) {
            h1 {
              font-family: Crimson Pro;
              font-size: 68px;
              font-weight: 200;
              color: #ff4040;
            }
          }
        `}
      </style>
    </>
  );
}

export function Heading2({ children }: Props) {
  return (
    <>
      <h2>{children}</h2>
      <style jsx>
        {`
          h2 {
            font-family: Crimson Pro;
            font-size: 32px;
            font-weight: 200;
            color: #666666;
          }
          @media (min-width: 769px) {
            h2 {
              font-family: Crimson Pro;
              font-size: 44px;
              font-weight: 200;
              color: #666666;
            }
          }
        `}
      </style>
    </>
  );
}

export function Paragraph({ children }: Props) {
  return (
    <>
      <p>{children}</p>
      <style jsx>
        {`
          p {
            font-family: Crimson Pro;
            font-size: 24px;
            font-weight: 200;
            color: #666666;
          }
        `}
      </style>
    </>
  );
}
