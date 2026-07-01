import arcjet, { detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Force Node.js runtime to prevent Vercel Edge Runtime crashes with Arcjet APIs
export const runtime = "nodejs";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// 1. Create Arcjet instance
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
        "GO_HTTP", 
      ],
    }),
  ],
});

// 2. Export Clerk middleware directly and run Arcjet inside it
export default clerkMiddleware(async (auth, req) => {
  // Run Arcjet protection first
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ code: 429, message: "Too Many Requests" }, { status: 429 });
    } else {
      return NextResponse.json({ code: 403, message: "Forbidden" }, { status: 403 });
    }
  }

  // Check authentication for protected routes
  if (isProtectedRoute(req)) {
    const authObject = await auth();
    
    // If there is no user logged in, redirect them to sign-in securely
    if (!authObject.userId) {
      return authObject.redirectToSignIn();
    }
  }

  // Note: We do NOT return NextResponse.next() here. 
  // Allowing the callback to finish without returning a custom response 
  // lets Clerk automatically inject the required authentication headers.
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
