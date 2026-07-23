function StatusBadge() {
  const isAdmin:    boolean  = true
  const hasWarning: boolean  = false
  const isVerified: boolean  = true
  const messages:   string[] = ['Assignment submitted', 'PR created']

  return (
    <div>
     
      {isAdmin && <span>Admin</span>}

      {hasWarning && <p style={{ color: 'orange' }}>Warning: incomplete tasks</p>}

   
      {isVerified && <span>Verified</span>}

      
      {messages.length === 0 && <p>No messages yet</p>}

     
      {messages.length>0  && (
        <ul>
          {messages.map((msg: string, i: number) => <li key={i}>{msg}</li>)}
        </ul>
      )}
    </div>
  )
}

export default StatusBadge

// If we use messages.length directly, an empty array gives length 0.
// In JavaScript, 0 && <ul>...</ul> returns 0, and React renders 0 on the page.
// So we should use messages.length > 0 to get a true/false value instead.