import Store from 'fluxible/addons/BaseStore';

class FiltersStore extends Store {
  static storeName = 'FiltersStore';

  constructor(dispatcher) {
    super(dispatcher);
    const { config } = dispatcher.getContext();
    this.filters = { ...config.filters };
  }

  getFilters() {
    return this.filters;
  }

  setFilters(filters) {
    this.filters = filters;
    this.emitChange();
  }

  static handlers = {
    SetFilters: 'setFilters'
  };
}

export default FiltersStore;
