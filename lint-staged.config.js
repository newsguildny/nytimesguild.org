module.exports = {
  '*.(ts|tsx|json)': (filenames) => [`eslint --fix ${filenames.join(' ')}`, 'yarn type-check'],
  '*.(yml|json|html|css)': 'prettier --write',
};
