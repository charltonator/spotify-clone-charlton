import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server'


export async function middleware(req: NextRequest) {
    // Token will exist if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const { pathname} = req.nextUrl
    // Allow the requests if the following is true
    // 1) its a request for next-auth session & provider fetching
    // 2) the token exists
    // 
    if (pathname.startsWith('/_next/') || pathname.includes('.')) {
        return
    }

    if ( pathname.includes('/login')|| token || pathname.includes('/api/auth') ) {
        return NextResponse.next();
    }

    // Redirect them to login if they dont have a token and 
    // are requesting a protected route
    if (!token && pathname !== '/login') {
        const url = new URL('/login', process.env.NEXT_PUBLIC_BASE_URL)
        return NextResponse.redirect(url);
    }
}