interface User {
  name:    string
  isAdmin: boolean
}


function UserBadge({user}:{user:User}){
    return(
        <div>
            <p>Logged in as:{user.name}</p>
            {user.isAdmin && <span>Admin</span>}
        </div>
    )
}


function InternCard({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px' }}>
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  )
}


function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  )
}

function PropDrillingDemo() {
  const user: User = { name: 'Rahul', isAdmin: true }
  return <InternList user={user} />
}

export default PropDrillingDemo

// Prop drilling problem: InternList does not use the user data itself.
// It receives user only to pass it to InternCard.
// This makes the component depend on data that it does not actually need.

// Prop drilling problem: InternCard also does not directly use the user data.
// It receives user only to forward it to UserBadge.
// Adding more intermediate components would require passing user through all of them.