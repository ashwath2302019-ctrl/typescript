function greetUser(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

greetUser("Alice","bob");         // should work after your change
greetUser("Alice", "Dr.");  // should still work

// Task B — add a default value for 'role'
function createAccount(email: string, role?: string): object {
  return { email, role };
}

createAccount("alice@example.com");          // should default role
createAccount("bob@example.com", "admin");   // should use provided role

// What is the difference between an optional parameter (`name?: string`) and a parameter with a default value (`name: string = "Guest"`)?  
// In what situation would you choose one over the other? Write your answer as a comment.

//I will use the optional parameter when I need to omit some arguements . In real-world scenarios, like 
// website login where they asked about their middle name, some people may not have a middle name, so I will use optional parameter.  