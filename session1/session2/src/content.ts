import { slugify, truncate } from "./helpers.js";

// Use both functions here with typed inputs and observe what TypeScript knows about them
const slug = slugify("Hello World");
const short = truncate("This is a long text", 10);