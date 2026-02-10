/**
 * Error parsing and formatting utilities.
 */

export interface ParsedApiError {
    status: number;
    message: string;
    code?: string;
}

/**
 * Parse API errors into a consistent format.
 */
export function parseApiError(error: unknown): ParsedApiError {
    // Network error (fetch failed)
    if (error instanceof TypeError && error.message.includes('fetch')) {
        return { status: 0, message: 'Unable to connect. Check your internet connection.' };
    }

    // Error with message from server
    if (error instanceof Error) {
        // Check for specific network-related messages
        if (error.message.includes('network') || error.message.includes('Network')) {
            return { status: 0, message: 'Unable to connect. Check your internet connection.' };
        }
        return { status: 500, message: error.message || 'An unexpected error occurred' };
    }

    return { status: 500, message: 'An unexpected error occurred' };
}

/**
 * Get a user-friendly error title based on HTTP status.
 */
export function getErrorTitle(status: number): string {
    if (status === 0) return 'Connection Lost';
    if (status === 401) return 'Session Expired';
    if (status === 403) return 'Access Denied';
    if (status === 404) return 'Not Found';
    if (status >= 500) return 'Server Error';
    return 'Something Went Wrong';
}

/**
 * Get the error variant for styling.
 */
export function getErrorVariant(status: number): 'default' | 'network' | 'server' {
    if (status === 0) return 'network';
    if (status >= 500) return 'server';
    return 'default';
}
