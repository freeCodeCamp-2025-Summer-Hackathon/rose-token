import { Response } from "express"
class ApiResponse {

    statusCode:number
    data?:string|object|null
    message:string
    success: boolean
    
    constructor(statusCode:number, data:string|object|null, message: string = "Success") {
       
        this.statusCode = statusCode;
        
        this.data = data;
       
        this.message = message;
        
        this.success = statusCode < 400;
  
    }

    send(res: Response) {
    return res.status(this.statusCode).json(this);
  }
}

export { ApiResponse }