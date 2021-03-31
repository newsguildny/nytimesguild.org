import { CmsConfig } from 'netlify-cms-core';
import netlifyIdentityWidget from 'netlify-identity-widget';
import { options } from '../components/customEditorComponents';

export async function init(config: CmsConfig) {
  netlifyIdentityWidget.init();
  // This library executes client-only side effects when imported,
  // so it's important to use a dynamic import to avoid trying to
  // run the client-only code on the server.
  const netlifyCmsApp = (await import('netlify-cms-app')).default;
  netlifyCmsApp.init({ config });
  options.forEach((editorComponentOptions) =>
    netlifyCmsApp.registerEditorComponent(editorComponentOptions)
  );
}
