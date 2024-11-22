// custom.d.ts

declare namespace Express {
    export interface Request {
      user?: any; // Define user as an optional property
    }
  }
  
  