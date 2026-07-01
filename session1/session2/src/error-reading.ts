
// Error 1:
// src/app.ts:8:15 - error TS2339:
// Property 'username' does not exist on type 'User'.

// This error occurs because the User type does not define a property called 'username'. TypeScript prevents access to
// properties that are not declared in the object's type.


// Error 2:
// src/app.ts:14:22 - error TS2345:
// Argument of type 'string' is not assignable to parameter of type 'number'.

// This error occurs because a string value is being passed  to a function parameter that expects a number. TypeScript
// prevents assigning incompatible types to function arguments
// to avoid runtime errors.

// Error 3:
// src/app.ts:21:3 - error TS7006:
// Parameter 'data' implicitly has an 'any' type.

//This occurs because the ts compiler option noImplicitAny has been enabled. Without that ts would silence the error which 4
// automatically resolve the type as any.

// Error 4:
// src/app.ts:30:10 - error TS2532:
// Object is possibly 'undefined'.

// This error occurs because the user object may be optioanl(?) parameters in some occasions which automatically resolve it as undefined
//So it must be handled using if-else statement. 

// Error 5:
// src/app.ts:38:5 - error TS2322:
// Type 'string | undefined' is not assignable to type 'string'.


// This error occurs because a string value is being passed  to a function parameter that expects a number. TypeScript
// prevents assigning incompatible types to function arguments
// to avoid runtime errors.
// ```

