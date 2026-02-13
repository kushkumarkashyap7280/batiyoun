import { NextResponse } from "next/server";
import { processError } from "@/utils/errors";

type Handler = (req: Request) => Promise<NextResponse | any>;

export function routeWrapper(handler: Handler) {
  return async (req: Request) => {
    try {
      // 1. Run your logic
      const result = await handler(req);
      
      // 2. If you returned a plain object/data, wrap it in 200 OK
      // Ensure response has success flag
      if (result && typeof result === 'object' && !('success' in result)) {
        result.success = true;
      }
      
      return NextResponse.json(result, { status: 200 });
      
    } catch (err) {
      // 3. If crash, use your Common Error Processor
      const { status, body } = processError(err);
      
      // Log error details for debugging
      if (status >= 500) {
        console.error("🔴 Route Error [" + status + "]:", err);
      } else if (status >= 400) {
        console.warn("⚠️  Client Error [" + status + "]:", body.message);
      }
      
      // 4. Return JSON (Prevents the HTML crash!)
      return NextResponse.json(body, { status });
    }
  };
}