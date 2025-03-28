import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const chatbotShown = cookieStore.get('chatbot-shown');
    
    return NextResponse.json({ shown: !!chatbotShown });
  } catch (error) {
    console.error('Error reading chatbot cookie:', error);
    return NextResponse.json({ shown: false, error: 'Failed to read cookie' });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Create a new response
    const response = NextResponse.json({ success: true });
    
    // Set cookie on the response object
    response.cookies.set('chatbot-shown', 'true', { 
      maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
      path: '/',
      httpOnly: true,
      sameSite: 'lax'
    });
    
    return response;
  } catch (error) {
    console.error('Error setting chatbot cookie:', error);
    return NextResponse.json({ success: false, error: 'Failed to set cookie' });
  }
} 