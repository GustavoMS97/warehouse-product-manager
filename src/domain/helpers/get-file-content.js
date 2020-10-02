const fs = require('fs');

exports.getFileContentFactory = () => {
  return {
    getFileContent: ({ filePath }) => {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        return { content };
      } catch (getFileContentError) {
        console.log(getFileContentError);
        throw new Error('Erro ao ler arquivo!');
      }
    },
  };
};
