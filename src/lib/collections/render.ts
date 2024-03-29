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
  components?: Record<string, (props: never) => JSX.Element>,
  staticContextValue?: Record<string, unknown>
) {
  const { content, ...rest } = collectionItem;
  const mdxSource = await renderToString(content, {
    components,
    staticContextValue,
  });
  return { ...rest, source: mdxSource };
}

export async function render<Item extends CollectionItem>(
  collection: Item,
  components?: Record<string, (props: never) => JSX.Element>,
  staticContextValue?: Record<string, unknown>
): Promise<RenderedItem<Item>>;
export async function render<Item extends CollectionItem>(
  collection: Item[],
  components?: Record<string, (props: never) => JSX.Element>,
  staticContextValue?: Record<string, unknown>
): Promise<RenderedItem<Item>[]>;
export async function render<Item extends CollectionItem>(
  collection: Item | Item[],
  components?: Record<string, (props: never) => JSX.Element>,
  staticContextValue?: Record<string, unknown>
): Promise<RenderedItem<Item>[] | RenderedItem<Item>> {
  if (Array.isArray(collection)) {
    return Promise.all(collection.map((item) => renderItem(item, components, staticContextValue)));
  }
  return renderItem<Item>(collection, components, staticContextValue);
}
