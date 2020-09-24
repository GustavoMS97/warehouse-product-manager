exports.createDocumentFactory = ({ Document } = {}) => {
  return {
    createDocument: async ({ code, observation } = {}) => {
      try {
        const document = await Document.create({
          code,
          observation,
        });
        return { document };
      } catch (createDocumentError) {
        console.log(createDocumentError);
        throw new Error('Não foi possivel criar o documento');
      }
    },
  };
};
