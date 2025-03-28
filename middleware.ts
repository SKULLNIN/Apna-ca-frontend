import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    // Skip processing for favicon.ico
    if (request.nextUrl.pathname === '/favicon.ico') {
      return NextResponse.next();
    }

    const response = NextResponse.next();
    
    // Clone response to allow setting headers
    const modifiedResponse = new NextResponse(response.body, response);
    
    // Add security headers
    modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
    modifiedResponse.headers.set('X-Frame-Options', 'DENY');
    modifiedResponse.headers.set('X-XSS-Protection', '1; mode=block');
    
    return modifiedResponse;
  } catch (error) {
    console.error('Error in middleware:', error);
    // Return the original response if there's an error
    return NextResponse.next();
  }
}

// Explicitly exclude favicon.ico from middleware processing
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}; 