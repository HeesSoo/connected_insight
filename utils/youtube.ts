/**
 * Converts various YouTube URL formats to embed URL format
 * Supports:
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID (already embed format)
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    // Validate YouTube domain
    const validDomains = ['www.youtube.com', 'youtube.com', 'youtu.be'];
    if (!validDomains.includes(parsedUrl.hostname)) {
      console.warn('Invalid YouTube URL domain:', parsedUrl.hostname);
      return null;
    }

    let videoId: string | null = null;

    // Extract video ID based on URL format
    if (parsedUrl.hostname === 'youtu.be') {
      // Format: https://youtu.be/VIDEO_ID
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.pathname.includes('/embed/')) {
      // Already in embed format: https://www.youtube.com/embed/VIDEO_ID
      videoId = parsedUrl.pathname.split('/embed/')[1];
    } else {
      // Format: https://www.youtube.com/watch?v=VIDEO_ID
      videoId = parsedUrl.searchParams.get('v');
    }

    if (!videoId) {
      console.warn('Could not extract video ID from URL:', url);
      return null;
    }

    // Return embed URL with no-cookie domain for better privacy
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch (error) {
    console.error('Error parsing YouTube URL:', error);
    return null;
  }
}

/**
 * Validates if a URL is a valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  return getYouTubeEmbedUrl(url) !== null;
}
