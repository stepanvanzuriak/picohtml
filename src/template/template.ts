import { htmlEscape } from "../utils/utils";

class Template {
  public literal: string[];
  public values: any[];
  public result: string;
  public events: Events;

  constructor(literal: string[], values: Events) {
    this.literal = literal;
    this.values = values;
    this.result = "";
    this.events = [];
  }

  public checkValues(values: Events) {
    if (
      !(
        values.length === this.values.length &&
        values.every((value, index) => value === this.values[index])
      )
    ) {
      this._update(values);
      return false;
    }
  }

  public getResult() {
    if (this.result === "") {
      this._update();
    }
    return { result: this.result, events: this.events };
  }

  private _update(values = this.values) {
    this.result = "";

    values.forEach((val: any, i) => {
      let lit = this.literal[i];

      if (Array.isArray(val)) {
        val = val.join("");
      }

      if (lit.endsWith("$")) {
        val = htmlEscape(val);
        lit = lit.slice(0, -1);
      }

      this.result += lit;

      if (lit.endsWith("=")) {
        this.events.push(val);
        this.result += `"${val}"`;
      } else {
        this.result += val;
      }
    });

    this.result += this.literal[this.literal.length - 1];
  }
}

export default Template;
