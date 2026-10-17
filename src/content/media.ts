/**
 * All imagery comes from Lorem Picsum (free, no attribution required) and is
 * served in grayscale to match the studio's monochrome art direction.
 * Videos are free stock clips from Mixkit (Mixkit License: free for
 * commercial and personal use, no attribution required).
 *
 * Swap any id/url here to re-skin the whole site.
 */
export function pic(id: number, w = 1600, h = 1000) {
  return `https://picsum.photos/id/${id}/${w}/${h}?grayscale`;
}

export const video = {
  /** Smoke in motion, black and white. Plays behind the hero wordmark. */
  hero: "https://assets.mixkit.co/videos/1964/1964-720.mp4",
  /** Ballet dancer in the dark. Used as the showreel. */
  showreel: "https://assets.mixkit.co/videos/3636/3636-720.mp4",
  /** Black and white ink underwater. The "manifesto" film in the museum frame. */
  manifesto: "https://assets.mixkit.co/videos/487/487-720.mp4",
};

export const img = {
  // Home
  museumWall: pic(949, 2000, 1250),
  studioSmall: pic(1073, 800, 800),
  studioLarge: pic(1069, 1400, 860),
  glitchHero: pic(1083, 1600, 1600),
  glitchBox: pic(1080, 900, 740),
  glitchBalloon: pic(1062, 600, 850),
  // Studio
  studioHero: pic(972, 2000, 1250),
  studioAwards: pic(1076, 900, 900),
  // Method
  methodHero: pic(1069, 1400, 900),
  augmented: pic(1033, 900, 900),
  // Awards
  awardsHero: pic(1079, 1400, 900),
  // Prefooter texture (crumpled paper stand-in)
  prefooter: pic(1073, 2000, 1200),
};
