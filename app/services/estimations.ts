var PouchDB = require('pouchdb/dist/pouchdb');

export class Estimation {
  public _id: string = '' + Date.now();
  constructor(
    public title: string,
    public value: number
  ) { };
}

export class EstimationService {
  values: Estimation[] = [];
  db: any;

  constructor() {
    this.db = new PouchDB('estimation_1');
    PouchDB.debug.enable('*');

    var values = this.values;

    this.db.allDocs({ include_docs: true }).then(function(response) {
      response.rows.map((row) => {
        values.push(row.doc as Estimation);
      });
    });
  };

  getEstimations() {
    return this.values;
  };

  add(estimation: Estimation) {
    this.values.push(estimation);
    this.db.put(estimation)
      .catch(function (err) {
        console.log(err);
      });
  };

  remove(i: number) {
    var estimation = this.values[i];
    this.values.splice(i, 1);
    this.db.remove(estimation);
  };

  update(i: number) {
    var estimation = this.values[i];
    console.log(estimation);
    this.db.put(estimation)
      .catch(function (err) {
        console.log(err);
      });
  }
}
