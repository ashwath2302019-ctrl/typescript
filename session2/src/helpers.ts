export function slugify(text:string):string {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function truncate(text:string, maxLength:number):string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// 🔍 **Explore:** What is a `.d.ts` declaration file and when would you write one?
// Research it and write a comment explaining its purpose in the migration context.


// A .d.ts declaration file provides type information for JavaScript
// code without containing any implementation. During a migration from
// JavaScript to TypeScript, declaration files allow existing .

