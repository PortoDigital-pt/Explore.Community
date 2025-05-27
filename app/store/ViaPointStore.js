import Store from 'fluxible/addons/BaseStore';

class ViaPointStore extends Store {
  static storeName = 'ViaPointStore';

  viaPoints = [];

  addViaPoint(val) {
    this.viaPoints.push(val);
    this.emitChange();
  }

  setViaPoints(viaPoints) {
    this.viaPoints = [...viaPoints];
    this.emitChange();
  }

  clearViaPoints() {
    this.viaPoints = [];
    this.emitChange();
  }

  getViaPoints() {
    return this.viaPoints;
  }

  static handlers = {
    addViaPoint: 'addViaPoint',
    setViaPoints: 'setViaPoints',
    clearViaPoints: 'clearViaPoints'
  };
}

export default ViaPointStore;
