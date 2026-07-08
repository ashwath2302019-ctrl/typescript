function TsxRules() {
  return (
    <div>
        <label htmlFor="#">Enter text:</label>
      <input id="text"/> 
      <p className="highlight">Styled paragraph</p> 
      <label htmlFor="email">Email</label>
      <input id="email" type="email"/> 
      <p style={ 
        {
          color:"red",
          fontSize:"16px"  
        }
      }>Red Text</p>
      {/*comment*/} 
    </div>
  )
}

export default TsxRules

//Every input tag in a tsx file must be closed with a '/' 
//Class is reserved keyword in js so react use className instead.
// The outer braces represent that it a javascript object so that the browser can able to render it.