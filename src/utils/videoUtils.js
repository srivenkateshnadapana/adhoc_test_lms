/**
 * Converts any YouTube or Vimeo URL into an embeddable iframe-compatible URL.
 * Handles standard, short, and URL-with-params formats.
 */
export function getEmbedUrl(url) {
  if (!url) return null;

  // --- Vimeo ---
  // Handles: https://vimeo.com/12345678, https://vimeo.com/12345678?...
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&badge=0&byline=0&portrait=0&title=0`;
  }

  // --- YouTube ---
  // Handles: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&modestbranding=1&rel=0`;
  }

  // --- Direct MP4 or other video files ---
  if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
    return url; // pass-through for direct video tags
  }

  // --- Already an embed URL ---
  if (url.includes('player.vimeo.com') || url.includes('youtube.com/embed')) {
    return url;
  }

  // Unrecognized: return as-is (will render in iframe)
  return url;
}

/**
 * Returns the type of the video URL so we can render the right player.
 * @returns 'mp4' | 'iframe'
 */
export function getVideoType(url) {
  if (!url) return null;
  if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
    return 'mp4';
  }
  return 'iframe';
}
