import { ReactNode } from 'react';
import { breakingBackground, breakingBorder } from '../../lib/styles/tokens/colors';
import { sansSerif, sansSerifSizes } from '../../lib/styles/tokens/fonts';

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

      h3 {
        outline: 4px solid blue;
        font-family: ${sansSerif};
        font-size: ${sansSerifSizes.large};
        font-weight: 700;
      }
    `}</style>
  </>
);
