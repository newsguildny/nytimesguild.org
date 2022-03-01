import { ReactNode } from 'react';
import { breakingBackground, breakingBorder } from '../../lib/styles/tokens/colors';

export interface VoteCountSectionProps {
  breaking?: boolean;
  children: ReactNode;
}

export const VoteCountSection = ({ breaking, children }: VoteCountSectionProps) => (
  <>
    <section className={breaking ? 'breaking' : undefined}>{children}</section>
    <style jsx>{`
      .breaking {
        background: ${breakingBackground};
        border: 0.125rem solid ${breakingBorder};
        padding: 0 1rem;
      }
    `}</style>
  </>
);
