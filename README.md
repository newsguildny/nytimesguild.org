## Dependencies

- [yarn](https://yarnpkg.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Netlify](https://www.netlify.com/)
- [MDX](https://mdxjs.com/)

## Getting started

Install dependencies:

```
yarn
```

Spin up development server:

```
yarn dev
```

**Note**: The local development server will publish to the live site. **Do not** publish anything locally that you don't want to go live!

View the CMS interface at [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html).

## Debugging

You can use the provided Visual Studio Code configs to debug both the dev server and client.

### Attach the VSCode Debugger to the Dev Server

1. Use Visual Studio Code to [set debugger breakpoints](https://code.visualstudio.com/docs/editor/debugging).
2. Start `yarn dev` in a terminal.
3. In Visual Studio Code's **Run and Debug** sidebar (<kbd>Command</kbd> + <kbd>Shit</kbd> + <kbd>D</kbd>), select the **Dev Server** debugger profile from the menu and start it.
   - **Note:** You can click the "…" menu and choose "Start Additional Session" to run multiple debugger sessions simultaneously.
4. Perform an action (such as loading a web page in-browser) which will trigger the breakpoint/s.
5. Wait for the VSCode debugger to pause on your breakpoint/s.

### Launch and Debug Google Chrome or Microsoft Edge

1. Use Visual Studio Code to [set debugger breakpoints](https://code.visualstudio.com/docs/editor/debugging).
2. Start `yarn dev` in a terminal.
3. In Visual Studio Code's **Run and Debug** sidebar (<kbd>Command</kbd> + <kbd>Shit</kbd> + <kbd>D</kbd>), select either the **\[Chrome\] Launch Dev Client** or **\[Edge\] Launch Dev Client** debugger profile from the menu and start it.
   - **Note:** You can click the "…" menu and choose "Start Additional Session" to run multiple debugger sessions simultaneously.
4. Once the browser launches, perform an action (such as loading the page or clicking on an element) which will trigger the breakpoint/s.
5. Wait for the VSCode debugger to pause on your breakpoint/s.

### Demo Video: VSCode Dev Server and Client Debugging



## References

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/intro/)
- [Building a Markdown blog with Next 9.4 and Netlify](https://www.netlify.com/blog/2020/05/04/building-a-markdown-blog-with-next-9.4-and-netlify/)
- [Hugo Theme - Codex](https://github.com/jakewies/hugo-theme-codex)
- [Next.js Starter Template for TypeScript](https://github.com/vercel/next-learn-starter/tree/master/typescript-final)
- [Building Blog with NextJS and Netlify CMS](https://dev.to/mefaba/building-blog-with-nextjs-and-netlify-cms-fom)
- [Unicons](https://github.com/Iconscout/unicons)

## License

MIT
