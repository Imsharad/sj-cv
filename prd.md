# GitHub OAuth Setup Guide for resume.sharadja.in

## Setting Up Your GitHub OAuth Callback URL

The callback URL for your GitHub OAuth App should match the API route you'll create in your Next.js application. Based on the code and requirements, your callback URL should be:

```plaintext
https://resume.sharadja.in/api/github/callback
```

## Creating a GitHub OAuth App

1. Go to GitHub.com and log in to your account (currently logged in as 'Imsharad')

2. Navigate to GitHub OAuth Apps settings page by either:
   - Using this direct URL: https://github.com/settings/developers
   - Or navigating manually: GitHub → Settings → Developer Settings → OAuth Apps

3. Click on "New OAuth App" button

4. Fill in the required fields:
   - Application name: resume.sharadja.in
   - Homepage URL: https://resume.sharadja.in
   - Application description: (Optional) Resume portfolio with GitHub integration
   - Authorization callback URL: https://resume.sharadja.in/api/github/callback

5. Click "Register application"

6. After registration, you'll be provided with a Client ID

7. To generate a Client Secret, click on "Generate a new client secret"

8. Make sure to copy and securely store both the Client ID and Client Secret values as they will be needed for your application

## Setting Up Environment Variables

Create a .env.local file in your project root and add these credentials:

```
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_APP_URL=https://resume.sharadja.in
```

Make sure .env.local is included in your .gitignore file to avoid committing sensitive information.

## Implementing the API Routes

Once you have created your GitHub OAuth App and obtained the credentials, you'll need to implement the API routes in your Next.js application to handle the OAuth flow:

1. First, create the API directory structure for GitHub OAuth:

```bash
mkdir -p src/app/api/github/callback
```

2. Create the callback route file:

```bash
touch src/app/api/github/callback/route.ts
```

3. Implement the callback route with this code:

```typescript
// src/app/api/github/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + "/api/github/callback";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || ""));
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error("Error exchanging code for token:", tokenData.error);
      return NextResponse.redirect(new URL("/?error=authentication_failed", process.env.NEXT_PUBLIC_APP_URL || ""));
    }

    const accessToken = tokenData.access_token;

    // You can store the access token in a cookie, session, or database
    // For this example, we'll redirect with a token param (not secure for production)
    // In a real app, use a secure cookie or server-side session
    
    return NextResponse.redirect(
      new URL(`/?token=${accessToken}`, process.env.NEXT_PUBLIC_APP_URL || "")
    );
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(new URL("/?error=server_error", process.env.NEXT_PUBLIC_APP_URL || ""));
  }
}
```

4. Create a login route to initiate the OAuth flow:

```bash
mkdir -p src/app/api/github/login
touch src/app/api/github/login/route.ts
```

5. Implement the login route:

```typescript
// src/app/api/github/login/route.ts
import { NextResponse } from "next/server";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + "/api/github/callback";

export async function GET() {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=read:user`;
  
  return NextResponse.redirect(githubAuthUrl);
}
```

6. Add a button in your UI to initiate the GitHub OAuth flow:

```tsx
// In your React component
const handleGitHubLogin = () => {
  window.location.href = "/api/github/login";
};

return (
  <button 
    onClick={handleGitHubLogin}
    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
  >
    <GitHubIcon className="w-5 h-5" />
    Connect with GitHub
  </button>
);
```

## Environment Variables Setup

For production:
```
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_APP_URL=https://resume.sharadja.in
```

For local development:
```
GITHUB_CLIENT_ID=your_dev_client_id_here
GITHUB_CLIENT_SECRET=your_dev_client_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

You might want to create a separate GitHub OAuth App for development with a localhost callback URL.

## Important Notes

1. **Exact Match Required**: The callback URL must exactly match what your application expects. Even a trailing slash difference can cause authentication failures.

2. **Environment Variables**: Make sure your `NEXT_PUBLIC_APP_URL` environment variable is set correctly for both development and production environments.

3. **Testing the Flow**: After setting up the OAuth App, you can test the flow by:
   - Clicking your "Connect GitHub" button
   - Being redirected to GitHub for authorization
   - Being redirected back to your site with the authorization code
   - Seeing your GitHub data appear in your application

4. **Security Considerations**: 
   - Always store tokens securely
   - Use HTTPS in production
   - Consider implementing PKCE for public clients
   - Implement proper session management for storing tokens
