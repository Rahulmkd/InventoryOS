export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message: string;

  constructor(statusCode: number, data: T, message = "Success") {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
