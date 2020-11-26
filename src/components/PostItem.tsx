import Link from 'next/link';
import { parseISO } from 'date-fns';
import { PostData } from '../lib/posts';
import Date from './Date';

interface Props {
  post: PostData;
}

export default function PostItem({ post }: Props) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a>
        <Date date={parseISO(post.date)} />
        <h2>{post.title}</h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
          `}
        </style>
      </a>
    </Link>
  );
}
