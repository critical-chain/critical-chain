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
}
