/* ---- Navbar sticky ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
 
/* ---- Scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
/* ---- Counter animation ---- */
function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 1800;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = '+' + Math.round(current) + (suffix || '%');
    if (current >= target) clearInterval(timer);
  }, 16);
}
 
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.getAttribute('data-target'));
      animateCounter(e.target, target, '%');
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.impact-num[data-target]').forEach(el => counterObserver.observe(el));
 
/* ---- Hero chat animation ---- */
const heroMsgs = [
  { side: 'bot', text: 'Bonjour ! Je suis HotelBot 🤖 Comment puis-je vous aider ?' },
  { side: 'user', text: 'Bonjour, avez-vous une chambre pour 2 personnes ce samedi ?' },
  { side: 'bot', text: 'Oui ! Nous avons la Suite Lumière disponible à 189€/nuit. Petit-déjeuner inclus ✨' },
  { side: 'user', text: 'Parfait ! Je la prends.' },
  { side: 'bot', text: 'Réservation confirmée 🎉 Vous recevrez votre confirmation par email.' },
];
const heroChatEl = document.getElementById('heroChatMsgs');
let heroIdx = 0;
function now() {
  const d = new Date();
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
}
function addHeroMsg() {
  if (heroIdx >= heroMsgs.length) { heroIdx = 0; heroChatEl.innerHTML = ''; setTimeout(addHeroMsg, 1200); return; }
  const m = heroMsgs[heroIdx++];
  const div = document.createElement('div');
  div.className = `msg msg-${m.side}`;
  div.innerHTML = `<div class="msg-bubble">${m.text}</div><div class="msg-time">${now()}</div>`;
  // Typing indicator for bot
  if (m.side === 'bot') {
    const typ = document.createElement('div');
    typ.className = 'typing-indicator';
    typ.innerHTML = '<span></span><span></span><span></span>';
    heroChatEl.appendChild(typ);
    heroChatEl.scrollTop = heroChatEl.scrollHeight;
    setTimeout(() => {
      heroChatEl.removeChild(typ);
      heroChatEl.appendChild(div);
      heroChatEl.scrollTop = heroChatEl.scrollHeight;
      setTimeout(addHeroMsg, m.side === 'bot' ? 1600 : 900);
    }, 900);
  } else {
    heroChatEl.appendChild(div);
    heroChatEl.scrollTop = heroChatEl.scrollHeight;
    setTimeout(addHeroMsg, 800);
  }
}
setTimeout(addHeroMsg, 800);
 
/* ---- Demo chat ---- */
const demoResponses = {
  default: [
    "Je vais vérifier ça pour vous immédiatement… ✅",
    "Bien sûr ! Voici ce que je peux vous proposer :",
    "Excellente question ! Laissez-moi vous répondre précisément.",
  ],
  'chambre': "Nous avons plusieurs chambres disponibles : Chambre Classique (89€), Supérieure (129€) et notre Suite Lumière (189€). Quelle est votre préférence ?",
  'week-end': "Ce week-end, j'ai de la disponibilité du vendredi au dimanche. Combien de personnes ? Je vous prépare les meilleures offres 🌟",
  'tarif': "Nos tarifs : Classique 89€/nuit · Supérieure 129€/nuit · Suite 189€/nuit. Petit-déjeuner à 18€/pers en option. Je vous réserve laquelle ?",
  'suite': "Notre Suite Lumière est à 189€/nuit, vue panoramique, jacuzzi privatif et champagne à l'arrivée 🥂 Envie de la réserver ?",
  'réserver': "Parfait ! Pour finaliser votre réservation, j'ai besoin de :\n1. Vos dates d'arrivée/départ\n2. Nombre de personnes\n3. Préférence de chambre\nOn y va ? 😊",
  'spa': "Notre Spa Lumière est ouvert de 9h à 21h. Massages (à partir de 60€), soins visage, bain nordique… Souhaitez-vous réserver un soin avec votre chambre ?",
  'juin': "Parfait ! Pour le 20 juin, je vous propose notre Chambre Supérieure à 129€/nuit pour 2 pers. Confirmé ? Je vous envoie la confirmation par email 📧",
  'merci': "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bonne journée et à bientôt à l'Hôtel Le Lumière 🌟",
};
 
function getResponse(msg) {
  const m = msg.toLowerCase();
  for (const [key, resp] of Object.entries(demoResponses)) {
    if (key !== 'default' && m.includes(key)) return resp;
  }
  const defaults = demoResponses.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
}
 
function demoSend(preset) {
  const input = document.getElementById('demoInput');
  const msgs = document.getElementById('demoMsgs');
  const chips = document.getElementById('demoChips');
  const text = preset || input.value.trim();
  if (!text) return;
  input.value = '';
 
  // User msg
  const userDiv = document.createElement('div');
  userDiv.className = 'demo-msg user';
  userDiv.innerHTML = `<div class="bubble">${text}</div><div class="t">${now()}</div>`;
  msgs.appendChild(userDiv);
  msgs.scrollTop = msgs.scrollHeight;
  chips.style.display = 'none';
 
  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'demo-msg bot';
  typing.innerHTML = '<div class="bubble" style="display:flex;gap:5px;padding:12px 16px;"><span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typing 1.2s infinite;display:block;"></span><span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typing 1.2s 0.2s infinite;display:block;"></span><span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typing 1.2s 0.4s infinite;display:block;"></span></div>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;
 
  setTimeout(() => {
    msgs.removeChild(typing);
    const botDiv = document.createElement('div');
    botDiv.className = 'demo-msg bot';
    const resp = getResponse(text);
    botDiv.innerHTML = `<div class="bubble">${resp}</div><div class="t">${now()}</div>`;
    msgs.appendChild(botDiv);
    msgs.scrollTop = msgs.scrollHeight;
  }, 900 + Math.random() * 600);
}


// partie rajoutée pour la demo du bot

const chatBox = document.getElementById("chatBox");  // recup des infos du chatbox dans la cons "chatBox"
const userInput = document.getElementById("userInput");


// fonction message qui ajoute un message dans le chat
function addMessage(text, sender) {
    const messageDiv = document.createElement("div"); // cree un nouvel espace div pour le message 
    messageDiv.classList.add("message", sender); 

    const bubbleDiv = document.createElement("div");  //  cree la bulle de message
    bubbleDiv.classList.add("bubble");               
    bubbleDiv.textContent = text;  // ajoute le dans text la bulle contenant le message 

    messageDiv.appendChild(bubbleDiv); // met la bulle dans le message 
    chatBox.appendChild(messageDiv); // ajoute la bulle dans la zone de chat
    chatBox.scrollTop = chatBox.scrollHeight; // fait defiler les message vers le bas 
}

// permet d'attendre le chargement des reponses du bot
async function sendMessage() {
    const message = userInput.value.trim(); // recup le message de l'user
                                            // texte saisi par l’utilisateur
                                            //trim() enlève les espaces inutiles

    if (!message) return; // si il y a rien on stop

    addMessage(message, "user"); // Affiche le message dans le chat
    userInput.value = "";  // vide le champ de saisie

    addMessage("Le bot réfléchit...", "bot"); // chargement de la reponse du bot 

    const loadingMessage = chatBox.lastChild; 

    try {
        const response = await fetch("/chat", {  // Envoie une requête HTTP POST vers chat
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message }) // envoie en format json
        });

        const data = await response.json(); // Convertit la réponse du serveur en JSON

        loadingMessage.remove();  //Supprime "Le bot réfléchit..."  
        addMessage(data.reply, "bot");  // Affiche la vraie réponse

    } catch (error) {
        loadingMessage.remove();
        addMessage("Erreur de connexion avec le serveur.", "bot");
    }
}

async function resetChat() {  // Fonction pour réinitialiser la conversation
    await fetch("/reset", {
        method: "POST"
    });

    chatBox.innerHTML = `
        <div class="message bot">
            <div class="bubble">
                Bonjour, je suis votre assistant en hôtellerie. Posez-moi une question sur les réservations, l’accueil client, le service ou la gestion hôtelière.
            </div>
        </div>
    `;
}

userInput.addEventListener("keypress", function(event) {  // Écoute les touches clavier
    if (event.key === "Enter") {  // Quand on appuie sur Entrer ça envoie le message automatiquement
        sendMessage();
    }
});
    