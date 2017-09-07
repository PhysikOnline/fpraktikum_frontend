export abstract class Record {
  static fromApiType(record: any): any { return undefined; };
  abstract toApiType(): any;
}
