module.exports = {
  '*.(ts|tsx|json)': (filenames) => [`eslint --fix ${filenames.join(' ')}`, 'tsc --noEmit -p .'],
  '*.(yml|json|html|css)': 'prettier --write',
};
