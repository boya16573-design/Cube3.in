async function apiFetch(path,options={}){
  const user=await Cube3Auth.currentUser();
  const headers={"Content-Type":"application/json",...(options.headers||{})};
  if(user){const {data}=await cube3Supabase.auth.getSession();if(data.session?.access_token)headers.Authorization=`Bearer ${data.session.access_token}`;}
  const r=await fetch(`${CUBE3_CONFIG.API_BASE_URL}${path}`,{...options,headers});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(j.error||`Request failed: ${r.status}`);return j;
}
window.Cube3API={apiFetch};
