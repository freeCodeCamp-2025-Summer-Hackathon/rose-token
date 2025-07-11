class ApiError extends Error {
    
    statusCode:number
    data?:string|null
    success:boolean
    errors:string[]|Record<string, string>[]

    constructor(statusCode:number, message:string = "Something went wrong", errors: string[]|Record<string, string>[] = [], stack ?: string) { 
      
        super(message);
      
        this.statusCode = statusCode;
   
        this.data = null;
    
        this.message = message;

        this.success = false;

        this.errors = errors;

        if (stack) {

            this.stack = stack;

        } else {

            Error.captureStackTrace(this, this.constructor);
        
        }

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    
}

export  { ApiError };

