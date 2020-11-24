import { PostContent } from '../lib/posts';
import PostItem from './PostItem';
import TagLink from './TagLink';
import { TagContent } from '../lib/tags';

interface Props {
  posts: PostContent[];
  tags: TagContent[];
}

export default function PostList({ posts, tags }: Props) {
  return (
    <div className="container">
      <div className="posts">
        <ul className="post-list">
          {posts.map((it) => (
            <li key={it.slug}>
              <PostItem post={it} />
            </li>
          ))}
        </ul>
      </div>
      <ul className="categories">
        {tags.map((it) => (
          <li key={it.slug}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .posts li {
          margin-bottom: 1.5rem;
        }
        .post-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
