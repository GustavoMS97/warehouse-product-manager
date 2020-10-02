exports.validateCSVHeadersFactory = ({ getCSVContentInMatrix } = {}) => {
  return {
    validateCSVHeaders: ({ expectedHeaders, fileContent }) => {
      const { fileContentMatrix } = getCSVContentInMatrix({ fileContent });
      const headers = fileContentMatrix[0];
      return {
        isHeadersValid:
          headers.filter((header, i) => header === expectedHeaders[i]).length === headers.length &&
          headers.length === expectedHeaders.length,
      };
    },
  };
};
