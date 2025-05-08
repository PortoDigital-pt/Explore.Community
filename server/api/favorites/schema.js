export const deleteSchema = {
  '*': {
    isString: true,
    errorMessage: 'The id must be a string'
  },
  '': {
    custom: {
      options: value => {
        return Array.isArray(value) && value.length > 0;
      },
      errorMessage: 'Id not found'
    }
  }
};
