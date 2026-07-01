interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
};

function renderProfile(profile: Profile): string {
    let display = `Display name:${profile.displayName}\n`;
    display+=`Bio:${profile.bio?? "no bio provided"}\n`;
    if(profile.website){
        display += `website: ${profile.website}`;
    }
    return display;
}
// const result = renderProfile(Profile.bio.toUpperCase);
// console.log(result);
// **Explore:** What happens if you try to call `profile.bio.toUpperCase()` directly without checking if it exists first?
// Write a comment explaining what error TypeScript gives and why.

// Profile' only refers to a type, but is being used as a value here (this happens of the optional parameter where the user are allowed
// to omit some arguments instaed of passing them).
