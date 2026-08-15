document.addEventListener("DOMContentLoaded",async()=>{
 const u=await Cube3Auth.requireUser(); if(!u)return;
 document.querySelector("#userEmail")?.replaceChildren(document.createTextNode(u.email||""));
 document.querySelector("#userRole")?.replaceChildren(document.createTextNode(u.user_metadata?.role||"creator"));
 document.querySelector("#logout")?.addEventListener("click",Cube3Auth.signOut);
});
