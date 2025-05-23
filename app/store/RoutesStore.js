import Store from 'fluxible/addons/BaseStore';

class RoutesStore extends Store {
  static handlers = {
    SetSelectedItem: 'setSelectedItem'
  };

  selectedItem = 0;

  setSelectedItem = item => {
    this.selectedItem = item;
    this.emitChange();
  };

  getSelectedItem() {
    return this.selectedItem;
  }
}

export default RoutesStore;
