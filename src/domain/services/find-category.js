exports.findCategoryFactory = ({ Category } = {}) => {
  return {
    findCategory: async () => {
      try {
        const category = await Category.find();
        return { category };
      } catch (findCategoryError) {
        console.log(findCategoryError);
        throw new Error('Não foi possivel obter a categoria!');
      }
    },
  };
};
