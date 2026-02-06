import { NextResponse } from "next/server";
import { processError, ApiError } from "@batiyoun/common";

type Handler = (req: Request) => Promise<NextResponse | any>;

export function routeWrapper(handler: Handler) {
  return async (req: Request) => {
    try {
      // 1. Run your logic
      const result = await handler(req);
      
      // 2. If you returned a plain object/data, wrap it in 200 OK
      return NextResponse.json(result, { status: 200 });
      
    } catch (err) {
      // 3. If crash, use your Common Error Processor
      const { status, body } = processError(err);
      
      // 4. Return JSON (Prevents the HTML crash!)
      return NextResponse.json(body, { status });
    }
  };
}