module.exports = {
  "*.(ts|tsx|json)": ["prettier --write", "eslint --fix"],
  "*.(yml|json|html|css)": "prettier --write",
};
