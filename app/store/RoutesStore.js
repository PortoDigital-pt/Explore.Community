import Store from 'fluxible/addons/BaseStore';

class RoutesStore extends Store {
  static handlers = {
    SetSelectedItem: 'setSelectedItem',
    ClearSelectedItem: 'clearSelectedItem'
  };

  selectedItem;

  constructor(dispatcher) {
    super(dispatcher);
    this.selectedItem = 0;
  }

  setSelectedItem = item => {
    this.selectedItem = item;
    this.emitChange();
  };

  getSelectedItem() {
    return this.selectedItem;
  }

  clearSelectedItem() {
    this.selectedItem = 0;
    this.emitChange();
  }
}

export default RoutesStore;
