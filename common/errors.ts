import { z } from "zod";
// 1. The Custom Error Class (PascalCase is standard for classes)
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype); // Fixes 'instanceof' bugs
  }
}

// 2. The Generic Response Class (Optional, but keeps things strict)
export class ApiResponse {
    status: number;
    body: any;
    constructor(body: any, status: number = 200) {
      this.status = status;
      this.body = body;
    }
}



export function processError(error: unknown) {
  // 1. Handle Custom API Errors (You threw these manually)
  if (error instanceof ApiError) {
    return {
      status: error.status,
      body: { error: error.message },
    };
  }

  // 2. Handle Zod Validation Errors (Zod threw these automatically)
  if (error instanceof z.ZodError) {
    return {
      status: 400, // Validation is always 400 Bad Request
      body: { 
        error: "Validation Failed", 
        details: error.flatten().fieldErrors // Returns { email: ["Invalid email"], ... }
      },
    };
  }

  // 3. Handle Unknown Crashes
  console.error("💥 Uncaught Error:", error);
  return {
    status: 500,
    body: { error: "Internal Server Error" },
  };
}