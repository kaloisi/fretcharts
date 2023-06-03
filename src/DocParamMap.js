




class DocParamMap {

  constructor() {
    let state = {};
    let search = document.location.search;

    if (search && search.length > 1) {
      if (search.charAt(0) === '?') {
          search = search.substring(1);
      }

      let split = search.split("&");
      for(let i = 0; i < split.length; i++) {
          let p = split[i];
          //console.log("Name/Value = " + p)
          let nv = p.split("=");
          if (nv && nv.length === 2) {
            let param = nv[0];
            let value = nv[1];

            let existingValues = state[param];
            if (existingValues === undefined) {
              state[param] = [ value ];

            } else {
              existingValues[existingValues.length] = value;
            }
          }
      }
    }
    this.values = state;
  }

  getValues(name) {
    return this.values[name];
  }

  getValue(name) {
    let vals = this.getValues(name);
    return vals && vals.length > 0 ? vals[0] : undefined;
  }

  getValueAsInt(name) {
    let i = this.getValue(name);
    return i ? Number.parseInt(i) : undefined;
  }
}

export default DocParamMap;