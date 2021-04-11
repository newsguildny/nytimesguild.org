import { Literal, Node, Parent } from 'unist';
import visit from 'unist-util-visit';

/**
 * @see https://github.com/syntax-tree/mdast#literal
 */
interface MDASTLiteral extends Literal {
  value: string;
}

const lineBreakRegex = /[\t]*\\(?:\r?\n|\r)/;

/**
 * Adds support for parsing Netlify CMS's chosen syntax for
 * hard line breaks, a `\` character followed by a newline.
 * @see https://unifiedjs.com/learn/guide/create-a-plugin/
 */
export function remarkLineBreaks() {
  return (tree: Node) => {
    // Since we're filtering `visit` to only `text` nodes, our visitor
    // only needs to handle mdast Literals (nodes with a string value)
    visit(tree, 'text', (node: MDASTLiteral, index: number, parent?: Parent) => {
      const match = node.value.match(lineBreakRegex);
      if (match) {
        parent?.children.splice(
          index,
          1,
          { type: 'text', value: node.value.slice(0, match.index) },
          { type: 'break' }
        );
        return index + 2;
      }
      return undefined;
    });
  };
}
