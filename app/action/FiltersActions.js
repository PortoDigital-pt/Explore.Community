export const setFilters = (actionContext, filters) => {
  actionContext.dispatch('SetFilters', filters);
};

export const addCategory = (actionContext, data) => {
  const { type, category } = data;
  const filtersState = actionContext.getStore('FiltersStore').getFilters();

  const newState = {
    ...filtersState,
    [type]: [...filtersState[type], category],
  };

  setFilters(actionContext, newState);
};

export const removeCategory = (actionContext, data) => {
  const { type, category } = data;
  const filtersState = actionContext.getStore('FiltersStore').getFilters();

  const newState = {
    ...filtersState,
    [type]: filtersState[type].filter(it => it !== category)
  };

  setFilters(actionContext, newState);
};

export const categoryOnOff = (actionContext, data) => {
  const { type, isSelected } = data;
  const {
    config: { filters: defaultFilters }
  } = actionContext;

  const filtersState = actionContext.getStore('FiltersStore').getFilters();

  const newState = {
    ...filtersState,
    [type]: isSelected ? [...defaultFilters[type]] : []
  };

  setFilters(actionContext, newState);
};
