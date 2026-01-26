import { auth0 } from './auth0';
import { redirect } from 'next/navigation';

/**
 * Get the current authenticated user's session
 * Returns null if not authenticated
 */
export async function getSession() {
    return await auth0.getSession();
}

/**
 * Get the current authenticated user's ID (Auth0 sub)
 * Returns null if not authenticated
 */
export async function getUserId() {
    const session = await getSession();
    return session?.user?.sub || null;
}

/**
 * Require authentication - redirects to login if not authenticated
 * Returns the user's Auth0 sub (user ID)
 */
export async function requireAuth() {
    const userId = await getUserId();

    if (!userId) {
        redirect('/api/auth/login');
    }

    return userId;
}

/**
 * Get the current user's full profile
 */
export async function getUser() {
    const session = await getSession();
    return session?.user || null;
}
