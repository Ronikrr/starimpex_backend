export class HttpException extends Error {
  public status: number;
  public message: string;
  public data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    if (data) {
      this.data = data;
    }
  }
}
