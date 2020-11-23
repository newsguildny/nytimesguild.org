export interface MdxSource {
  compiledSource: string;
  renderedOutput: string;
  scope: Record<string, unknown>;
}
