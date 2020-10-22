exports.createCategoryFactory = ({ Category } = {}) => {
  return {
    createCategory: async ({ name } = {}) => {
      try {
        const category = await Category.create({ name });
        return { category };
      } catch (createCategoryError) {
        console.log(createCategoryError);
        throw new Error('Não foi possivel criar a category!');
      }
    },
  };
};
