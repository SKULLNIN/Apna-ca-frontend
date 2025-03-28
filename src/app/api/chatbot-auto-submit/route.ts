import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const chatbotAutoSubmitted = cookieStore.get('chatbot-auto-submitted');
    
    return NextResponse.json({ autoSubmitted: !!chatbotAutoSubmitted });
  } catch (error) {
    console.error('Error reading chatbot auto-submit cookie:', error);
    return NextResponse.json({ autoSubmitted: false, error: 'Failed to read cookie' });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Create a new response
    const response = NextResponse.json({ success: true });
    
    // Set cookie on the response object
    response.cookies.set('chatbot-auto-submitted', 'true', { 
      maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
      path: '/',
      httpOnly: true,
      sameSite: 'lax'
    });
    
    return response;
  } catch (error) {
    console.error('Error setting chatbot auto-submit cookie:', error);
    return NextResponse.json({ success: false, error: 'Failed to set cookie' });
  }
} 