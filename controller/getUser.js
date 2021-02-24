import fetch from 'isomorphic-fetch'

export async function getUser(authorization) {
    console.log(authorization)
    const fetchURL = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `https://giraffeql.io`;
    const res = await fetch(`${fetchURL}/api/user`, { headers: { authorization } })
      .catch(err => console.log(err));
  
    const data = await res.json();
    
    const newAuthorization = !authorization ? null : authorization
    if (res.status === 200) return { authorization: newAuthorization, user: data }
    else return { authorization: newAuthorization }
}

export default getUser;