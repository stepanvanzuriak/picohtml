import { htmlEscape, replace, same } from "../utils/utils";

class Template {
  public values: any[];
  public result: string;
  public events: Events;
  public isRaw: boolean;
  public lit: string[];

  constructor(literal: string[], values: any[]) {
    this.lit = literal;
    this.values = values;
    this.result = "";
    this.events = [];
    this.isRaw = false;
  }

  public checkValues(values: any[]) {
    if (!same(values, this.values)) {
      this._update(values);
      return false;
    }
    return true;
  }

  public checkLiteral(lit: string[]) {
    return same(lit, this.lit);
  }

  public getResult() {
    if (this.result === "") {
      this._update();
    }
    return { result: this.result, events: this.events };
  }

  public forceUpdate() {
    this._update();
  }

  private _update(values = this.values) {
    this.result = "";
    this.events = [];

    if (this.isRaw) {
      this.result += "\n<!-- RAW_START -->\n";
    }

    values.forEach((val: any, i) => {
      let lit = this.lit[i];

      if (Array.isArray(val)) {
        val = val.join("");
      }

      if (lit.endsWith("$")) {
        val = htmlEscape(val);
        lit = lit.slice(0, -1);
      }

      this.result += lit;

      if (lit.endsWith("=") || lit.endsWith('="')) {
        if (
          lit
            .split(" ")
            .pop()
            .startsWith("on")
        ) {
          this.events.push(val);
        }

        const replacedVal = replace(val.toString(), ["'", '"'], [`\'`, `'`]);

        if (lit.endsWith("=")) {
          this.result += `"${replacedVal}"`;
        }

        if (lit.endsWith('="')) {
          this.result += `${replacedVal}`;
        }
      } else {
        this.result += val;
      }
    });

    this.result += this.lit[this.lit.length - 1];

    if (this.isRaw) {
      this.result += "\n<!-- RAW_END -->\n";
    }
  }
}

export default Template;
