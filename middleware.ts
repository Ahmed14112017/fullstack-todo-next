import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  console.log("🔍 Middleware is running on:", req.nextUrl.pathname);
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});
export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // يسيب static و _next
    "/", // الصفحة الرئيسية
    "/(api|trpc)(.*)", // API routes
  ],
};
