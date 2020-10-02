exports.getCSVContentInMatrixFactory = () => {
  return {
    getCSVContentInMatrix: ({ fileContent } = {}) => {
      try {
        let newFileContent = fileContent;
        if (fileContent.charAt(fileContent.length - 1) === ',') {
          newFileContent = fileContent.substring(0, fileContent.length - 1);
        }
        const newFileContentArray = newFileContent.split(',');
        const csvLineBreakRegex = new RegExp(/(\r\n|\n|\r)/g);
        let fileContentMatrix = [];
        let currentRow = 0;
        newFileContentArray.forEach((newFileContentArrayItem) => {
          if (csvLineBreakRegex.test(newFileContentArrayItem)) {
            const [lastRowItem, , nextFirstRowItem] = newFileContentArrayItem.split(csvLineBreakRegex);
            fileContentMatrix[currentRow] = [...(fileContentMatrix[currentRow] || []), lastRowItem];
            fileContentMatrix[currentRow + 1] = [...(fileContentMatrix[currentRow + 1] || []), nextFirstRowItem];
            currentRow++;
          } else {
            fileContentMatrix[currentRow] = [...(fileContentMatrix[currentRow] || []), newFileContentArrayItem];
          }
        });
        fileContentMatrix.splice(fileContentMatrix.length - 1, 1);
        return { fileContentMatrix };
      } catch (getCSVContentInMatrixError) {
        console.log(getCSVContentInMatrixError);
        throw new Error('Nao foi possivel converter o conteudo do arquivo CSV em uma matriz');
      }
    },
  };
};
