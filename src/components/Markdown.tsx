import { FC } from 'react';

export const Heading1: FC = ({ children }) => {
  return (
    <>
      <h2>{children}</h2>
      <style jsx>
        {`
          h2 {
            font-family: Crimson Pro;
            font-size: 2.625rem;
            font-weight: 200;
            color: #ff4040;
          }
          @media (min-width: 769px) {
            h2 {
              font-family: Crimson Pro;
              font-size: 4.25rem;
              font-weight: 200;
              color: #ff4040;
            }
          }
        `}
      </style>
    </>
  );
};

export const Heading2: FC = ({ children }) => {
  return (
    <>
      <h2>{children}</h2>
      <style jsx>
        {`
          h2 {
            font-family: Crimson Pro;
            font-size: 2rem;
            font-weight: 200;
            color: #666666;
          }
          @media (min-width: 769px) {
            h2 {
              font-family: Crimson Pro;
              font-size: 2.75rem;
              font-weight: 200;
              color: #666666;
            }
          }
        `}
      </style>
    </>
  );
};

export const Heading3: FC = ({ children }) => {
  return (
    <>
      <h2>{children}</h2>
      <style jsx>
        {`
          h2 {
            font-family: Crimson Pro;
            font-size: 2rem;
            font-weight: 200;
            color: #ff4040;
          }
          @media (min-width: 769px) {
            h2 {
              font-family: Crimson Pro;
              font-size: 2.75rem;
              font-weight: 200;
              color: #ff4040;
            }
          }
        `}
      </style>
    </>
  );
};

export const Paragraph: FC = ({ children }) => {
  return (
    <>
      <p>{children}</p>
      <style jsx>
        {`
          p {
            font-family: Crimson Pro;
            font-size: 1.5rem;
            font-weight: 200;
            color: #666666;
          }
        `}
      </style>
    </>
  );
};
