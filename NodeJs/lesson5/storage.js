const storage = {
    _data: {},
  
    setItem(key, value) {
      this._data[key] = value.toString();
    },
  
    getItem(key) {
      return this._data.hasOwnProperty(key) ? this._data[key] : null;
    },
  
    removeItem(key) {
      delete this._data[key];
    },
  
    clear() {
      this._data = {};
    },
  
    getAll() {
      return this._data;
    }
  };
  
  
  storage.setItem('name', 'Olena');
  console.log(storage.getItem('name')); 
  
  storage.removeItem('name');
  console.log(storage.getItem('name')); 
  
  
  