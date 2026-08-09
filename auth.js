const authClient = window.cube3Supabase;
async function signUp(email,password,role,fullName){
  const {data,error}=await authClient.auth.signUp({
    email,password,options:{data:{role,full_name:fullName}}
  });
  if(error) throw error;
  return data.session ? {message:"Account created.",user:data.user}
    : {message:"Account created. Check your email to confirm your account."};
}
async function signIn(email,password){
  const {data,error}=await authClient.auth.signInWithPassword({email,password});
  if(error) throw error; return data;
}
async function signOut(){const {error}=await authClient.auth.signOut();if(error)throw error;location.href="/";}
async function currentUser(){const {data}=await authClient.auth.getUser();return data.user||null;}
async function requireUser(){const u=await currentUser();if(!u)location.href="login.html";return u;}
window.Cube3Auth={signUp,signIn,signOut,currentUser,requireUser};
