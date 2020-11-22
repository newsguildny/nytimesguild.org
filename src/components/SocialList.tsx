import Twitter from './icons/TwitterIcon';
import GitHub from './icons/GitHubIcon';
import config from '../lib/config.json';

export function SocialList() {
  return (
    <div>
      <a
        title="Twitter"
        href={`https://twitter.com/${config.twitterAccount}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter width={24} height={24} fill="#222" />
      </a>
      <a
        title="GitHub"
        href={`https://github.com/${config.githubAccount}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub width={24} height={24} fill="#222" />
      </a>
      <style jsx>{`
        a {
          display: inline-block;
        }
        a:not(:last-child) {
          margin-right: 2em;
        }
      `}</style>
    </div>
  );
}
