export const setSelectedItem = (actionContext, item) => {
  actionContext.dispatch('SetSelectedItem', item);
};

export const clearSelectedItem = (actionContext, value) => {
  actionContext.dispatch('ClearSelectedItem', value);
};
