export class ApiResponse {
  success: boolean;
  statusCode: number;
  data: any;
  message: string;

  constructor(statusCode: number, data: any, message = "Success") {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
