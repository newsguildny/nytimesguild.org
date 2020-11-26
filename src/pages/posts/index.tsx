import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import PostList from '../../components/PostList';
import { getTags, TagContent } from '../../lib/tags';
import { getPostsData, PostData } from '../../lib/posts';
import { withNav } from '../../lib/withNav';

interface Props {
  posts: PostData[];
  tags: TagContent[];
}
export default function Index({ posts, tags }: Props) {
  const url = '/posts';
  const title = 'All posts';
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} tags={tags} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPostsData();
  const tags = getTags();
  return withNav({
    props: {
      posts,
      tags,
    },
  });
};
