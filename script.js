const forms={login:document.getElementById('login'),signup:document.getElementById('signup')};
const titles={login:['Welcome','Login to continue your journey'],signup:['Create Account','Sign up to start your journey']};
const card=document.querySelector('.card');let busy=false;
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{
  if(busy)return;busy=true;
  const t=b.dataset.go,cur=t==='signup'?forms.login:forms.signup,next=forms[t];
  const t1=document.getElementById('title'),t2=document.getElementById('sub');
  const h0=card.offsetHeight;card.style.height=h0+'px';
  cur.classList.add('leave');cur.classList.remove('active');
  t1.classList.add('out');t2.classList.add('out');
  setTimeout(()=>{
    cur.classList.remove('leave');
    t1.textContent=titles[t][0];t2.textContent=titles[t][1];
    t1.classList.remove('out');t2.classList.remove('out');
    next.classList.toggle('fromLeft',t==='login');
    next.classList.add('active');
    card.style.height='auto';const h1=card.offsetHeight;card.style.height=h0+'px';
    requestAnimationFrame(()=>{card.style.height=h1+'px';});
    setTimeout(()=>{card.style.height='';busy=false},450);
  },250);
});
document.querySelectorAll('.eye').forEach(b=>b.onclick=()=>{
  const i=b.parentElement.querySelector('input');
  i.type=i.type==='password'?'text':'password';
});
Object.values(forms).forEach(f=>f.onsubmit=e=>{
  e.preventDefault();
  const m=f.querySelector('.msg'),v=[...f.querySelectorAll('input:not([type=checkbox])')].map(i=>i.value.trim());
  m.className='msg';
  if(v.some(x=>!x)){m.textContent='Please fill in all fields.';return}
  if(f.id==='signup'&&v[2]!==v[3]){m.textContent='Passwords do not match.';return}
  m.className='msg ok';m.textContent=f.id==='login'?'Login successful!':'Account created!';
});
