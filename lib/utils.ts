// Simplified cn function without external dependencies
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      // Handle object with boolean values (e.g., { 'class-name': true })
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  // Basic Tailwind class deduplication (simple version)
  // This handles common cases but is not as comprehensive as tailwind-merge
  const seen = new Set<string>();
  const result: string[] = [];
  
  for (const cls of classes) {
    // Simple deduplication: keep first occurrence
    if (!seen.has(cls)) {
      seen.add(cls);
      result.push(cls);
    }
  }
  
  return result.join(' ');
}

