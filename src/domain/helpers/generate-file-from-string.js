const fs = require('fs');
const randomstring = require('randomstring');

exports.generateFileFromStringFactory = ({ ENV } = {}) => {
  return {
    generateFileFromString: ({ content, ext } = {}) => {
      try {
        const fileName = randomstring.generate({
          length: 12,
          charset: 'alphabetic',
        });
        const filePath = `${ENV.TEMP_FOLDER}/${fileName}.${ext}`;
        fs.writeFileSync(filePath, content);
        return { filePath, fileName: `${fileName}.${ext}` };
      } catch (generateFileFromStringError) {
        console.log(generateFileFromStringError);
        throw new Error('Nao foi possivel gerar o arquivo');
      }
    },
  };
};
