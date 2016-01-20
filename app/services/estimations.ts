export class Estimation {
  constructor(
    public title: string,
    public value: number
  ) { };
}

export class EstimationService {
  values: Estimation[];

  constructor() {
    this.values = [
      new Estimation('Sell!', 42)
    ];
  };

  getEstimations() {
    return this.values;
  };

  add(estimation: Estimation) {
    this.values.push(estimation);
  };

  remove(i: number) {
    this.values.splice(i, 1);
  };
}