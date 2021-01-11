import Link from 'next/link';
import { FC } from 'react';

interface Props {
  to: string;
}

const CallToAction: FC<Props> = ({ to, children }) => (
  <>
    {/* CallToActions can point to internal or external links.
        If links are external, then we can't use next/link. */}
    {to.includes('://') ? (
      <a href={to}>
        {children}
        <svg
          width="38"
          height="16"
          viewBox="0 0 38 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.7071 8.7071C38.0976 8.31658 38.0976 7.68341 37.7071 7.29289L31.3431 0.928929C30.9526 0.538405 30.3195 0.538405 29.9289 0.92893C29.5384 1.31945 29.5384 1.95262 29.9289 2.34314L35.5858 8L29.9289 13.6569C29.5384 14.0474 29.5384 14.6805 29.9289 15.0711C30.3195 15.4616 30.9526 15.4616 31.3431 15.0711L37.7071 8.7071ZM8.74228e-08 9L37 9L37 7L-8.74228e-08 7L8.74228e-08 9Z"
            fill="currentColor"
          />
        </svg>
      </a>
    ) : (
      <Link href={to} passHref>
        <a>
          {children}
          <svg
            width="38"
            height="16"
            viewBox="0 0 38 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.7071 8.7071C38.0976 8.31658 38.0976 7.68341 37.7071 7.29289L31.3431 0.928929C30.9526 0.538405 30.3195 0.538405 29.9289 0.92893C29.5384 1.31945 29.5384 1.95262 29.9289 2.34314L35.5858 8L29.9289 13.6569C29.5384 14.0474 29.5384 14.6805 29.9289 15.0711C30.3195 15.4616 30.9526 15.4616 31.3431 15.0711L37.7071 8.7071ZM8.74228e-08 9L37 9L37 7L-8.74228e-08 7L8.74228e-08 9Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </Link>
    )}
    <style jsx>{`
      a {
        font-family: Public Sans;
        display: block;
        margin: 3rem 0 6rem 0;
        width: max-content;
        padding: 1.5rem;
        border: 2px solid #dedede;
        font-size: 1.5rem;
        line-height: 1.875rem;
        color: #666;
        text-decoration: none;
        transition: color 0.3s;
        transition: border 0.3s;
      }

      a:hover {
        border-color: #666;
        color: #222;
      }

      svg {
        margin-left: 1rem;
        transition: transform 0.3s ease-out;
      }

      a:hover > svg {
        transform: translateX(2.5rem);
      }
    `}</style>
  </>
);

export default CallToAction;
