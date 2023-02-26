export class RequestContext {
  private tempData: string;

  constructor(tempData: string) {
    this.tempData = tempData;
  }

  getTempData(): string {
    return this.tempData;
  }
}
