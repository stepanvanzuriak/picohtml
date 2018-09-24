import { htmlEscape } from "../utils/utils";

class Template {
  public literal: string[];
  public values: any[];
  public result: string;
  public events: any[];

  constructor(literal: string[], values: any[]) {
    this.literal = literal;
    this.values = values;
    this.result = "";
    this.events = [];
  }

  public checkValues(newValues: any[]) {
    if (
      !(
        newValues.length === this.values.length &&
        newValues.every((value, index) => value === this.values[index])
      )
    ) {
      this.values = newValues;
      this.calcEventsAndResult();
    }
  }

  public getResult() {
    if (this.result === "") {
      this.calcEventsAndResult();
    }
    return { result: this.result, events: this.events };
  }

  private calcEventsAndResult() {
    this.result = "";

    this.values.forEach((val: any, i) => {
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
