import { headerText, headerBackground } from '../../lib/styles/tokens/colors';
import { sansSerifSizes } from '../../lib/styles/tokens/fonts';

export const LivePill = ({ outlined = false, small = false }) => (
  <>
    <span className={`live-pill ${outlined ? 'outlined' : 'filled'}${small ? ' small' : ''}`}>
      live
    </span>
    <style jsx>{`
      .live-pill {
        box-sizing: border-box;
        display: inline-block;
        margin-left: 0.5rem;
        padding: 0.25rem 0.5rem;
        border-radius: 1.5rem;
        font-size: ${sansSerifSizes.extraSmall};
        font-weight: 800;
        color: ${headerText};
        text-transform: uppercase;
      }
      .filled {
        background: ${headerBackground};
      }
      .outlined {
        border: 0.09375rem solid ${headerText};
      }
      .small {
        padding: 0.0625rem 0.4375rem;
        margin-left: 0.125rem;
      }
    `}</style>
  </>
);
