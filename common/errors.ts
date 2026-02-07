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
      body: { 
        success: false,
        message: error.message 
      },
    };
  }

  // 2. Handle Zod Validation Errors (Zod threw these automatically)
  if (error instanceof z.ZodError) {
    // Get the first error message for better UX
    const firstError = error.issues[0];
    const fieldName = firstError.path.join('.');
    const message = firstError.message;
    
    return {
      status: 400,
      body: { 
        success: false,
        message: fieldName ? `${fieldName}: ${message}` : message,
        errors: error.flatten().fieldErrors // Still include all errors for debugging
      },
    };
  }

  // 3. Handle Prisma/Database Errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;
    
    // Prisma error codes
    if (prismaError.code === 'P2002') {
      const target = prismaError.meta?.target?.[0] || 'field';
      return {
        status: 409,
        body: { 
          success: false,
          message: `This ${target} is already taken. Please choose another one.` 
        },
      };
    }
    
    if (prismaError.code === 'P2025') {
      return {
        status: 404,
        body: { 
          success: false,
          message: 'Record not found. The requested resource does not exist.' 
        },
      };
    }
    
    if (prismaError.code === 'P2003') {
      return {
        status: 400,
        body: { 
          success: false,
          message: 'Invalid reference. The related record does not exist.' 
        },
      };
    }

    if (prismaError.code?.startsWith('P')) {
      return {
        status: 500,
        body: { 
          success: false,
          message: 'Database operation failed. Please try again.' 
        },
      };
    }
  }

  // 4. Handle JWT/Token Errors
  if (error instanceof Error) {
    if (error.message.includes('jwt') || error.message.includes('token')) {
      return {
        status: 401,
        body: { 
          success: false,
          message: 'Invalid or expired authentication token. Please log in again.' 
        },
      };
    }

    // Handle generic errors with their message
    if (error.message) {
      return {
        status: 500,
        body: { 
          success: false,
          message: `Server error: ${error.message}` 
        },
      };
    }
  }

  // 5. Handle Unknown Crashes
  console.error("💥 Uncaught Error:", error);
  return {
    status: 500,
    body: { 
      success: false,
      message: 'An unexpected error occurred. Please try again later.' 
    },
  };
}