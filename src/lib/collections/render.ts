import { MdxRemote } from 'next-mdx-remote/types';
import { renderToString } from '../mdx/renderToString';

interface CollectionItem {
  content: string;
}

type RenderedItem<Item extends CollectionItem> = Omit<Item, 'content'> & {
  source: MdxRemote.Source;
};

async function renderItem<Item extends CollectionItem>(
  collectionItem: Item,
  components?: Record<string, (props: never) => JSX.Element>
) {
  const { content, ...rest } = collectionItem;
  const mdxSource = await renderToString(content, {
    components,
  });
  return { ...rest, source: mdxSource };
}

export async function render<Item extends CollectionItem>(
  collection: Item,
  components?: Record<string, (props: never) => JSX.Element>
): Promise<RenderedItem<Item>>;
export async function render<Item extends CollectionItem>(
  collection: Item[],
  components?: Record<string, (props: never) => JSX.Element>
): Promise<RenderedItem<Item>[]>;
export async function render<Item extends CollectionItem>(
  collection: Item | Item[],
  components?: Record<string, (props: never) => JSX.Element>
): Promise<RenderedItem<Item>[] | RenderedItem<Item>> {
  if (Array.isArray(collection)) {
    return Promise.all(collection.map((item) => renderItem(item, components)));
  }
  return renderItem<Item>(collection, components);
}
