class DocParamMap {
  private values: { [key: string]: string[] };

  constructor() {
    const state: { [key: string]: string[] } = {};
    let search: string = document.location.search;

    if (search && search.length > 1) {
      if (search.charAt(0) === '?') {
        search = search.substring(1);
      }

      const split: string[] = search.split("&");
      for (let i = 0; i < split.length; i++) {
        const p = split[i];
        const nv = p.split("=");
        if (nv && nv.length === 2) {
          const param = nv[0];
          const value = nv[1];

          const existingValues = state[param];
          if (existingValues === undefined) {
            state[param] = [value];
          } else {
            existingValues[existingValues.length] = value;
          }
        }
      }
    }
    this.values = state;
  }

  getValues(name: string, defVal: string[] = []): string[] {
    return this.values[name] ? this.values[name] : defVal;
  }

  getValue(name: string, defVal: string = ""): string {
    const vals = this.getValues(name);
    return vals && vals.length > 0 ? vals[0] : defVal;
  }

  getValueAsInt(name: string, defVal: number = 0): number {
    const i = this.getValue(name);
    return i ? Number.parseInt(i) : defVal;
  }

  getValuesAsInts(name: string, defVal: number[] = []): number[] {
    const vals = this.getValues(name);
    return vals ? vals.map(v => Number.parseInt(v)) : defVal;
  }
}

export default DocParamMap;