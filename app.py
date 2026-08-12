from flask import Flask, render_template, request, jsonify
import ollama
import discord
from discord.ext import commands
import threading
from config import DISCORD_TOKEN



#render_template sert à afficher des html
#request permet de recup les reponse utilisateur
#jsonify permet de renvoyer une réponse au format JSON (pour communiquer avec le front)



app = Flask(__name__) # initialisation de l'application flask

# Contexte du bot, guide le bot dans les réponse, sa fonction et comportement 
SYSTEM_PROMPT = """
Tu es un chatbot professionnel spécialisé uniquement dans le secteur de l’hôtellerie

Tu réponds uniquement aux questions concernant :
- l’accueil client
- les réservations
- la réception
- les chambres
- le service hôtelier
- l’organisation d’un hôtel
- la relation client
- les procédures internes d’un hôtel
- la qualité de service
- la gestion des demandes clients

Règles importantes :
- Tu réponds toujours en français
- Tu restes strictement dans le domaine de l’hôtellerie
- Si une question est hors sujet, tu refuses poliment
- Tu ne changes jamais de sujet
- Tu réponds de façon claire, simple et professionnelle
- Si tu ne sais pas, dis-le clairement sans inventer

Règles très importantes :
- ne repond à aucun hors sujet, donne des refus polis et courts
- donne des réponses très claires
- 3 phrases maximum
- ne coupe jamais une phrase 
- si la réponse est trop longue, fais plus court mais termine toujours proprement
"""

# mots clés pour que le bot analyse en fontion de la phrase, dans une liste
MOTS_CLES_HOTELLERIE = [
    "hôtel", "hotel", "hôtellerie", "hotellerie", "réservation", "réserver",
    "réception", "client", "clients", "chambre", "chambres", "check-in",
    "check-out", "accueil", "service", "conciergerie", "ménage", "séjour",
    "nuit", "nuits", "réceptionniste", "bagagiste", "room service",
    "paiement", "annulation", "disponibilité", "booking", "établissement",
    "tourisme", "hôtelier", "hôtelière","prendre","reserver","comment","ok",
    "merci","au revoir","d'accord","bonjour","salut","bon","tarifs"
]

# variable utilisée pour les instructions du bot et ses réponses, stocke la conversasion
messages = [
    {"role": "system", "content": SYSTEM_PROMPT}
]

# c'est la route qui ouvre la  page html ou se trouvre le bot(proto)
@app.route("/")
def index():
    return render_template("index.html")


# c'est la route qui ouvre la page du site pour la demo
@app.route("/demo")
def demo():
    return render_template("landing.html")


# cette route reçoit les message de l'utilisateur par la méthode post
@app.route("/chat", methods=["POST"])
def chat():
    global messages # appel global du message, fonctionnel en dehors de la fonction caht

    data = request.get_json() # recupere le message en json
    question = data.get("message", "").strip() # on enleve les espaces au debut et fin du message(input)

     
    # on verifie si l'utilisateur n'envoie rien et envoie un message d'erreur
    if not question:
        return jsonify({"reply": "Merci d'écrire une question."})


    # Vérification du sujet, on regarde si les mots sont dans MOTS_CLES_HOTELLERIE, il renvoie true
    question_min = question.lower() # question en miniscule
    autorisee = any(mot in question_min for mot in MOTS_CLES_HOTELLERIE)
    
    
    # et la on verifie si on ne trouve pas de mots clés, le hors sujet s'applique
    if not autorisee:
        return jsonify({
            "reply": (
                "Je suis spécialisé uniquement dans le domaine de l’hôtellerie. "
                "Merci de poser une question liée à l’accueil, aux réservations, "
                "au service hôtelier ou à la gestion d’un établissement."
            )
        })
        
    MAX_MESSAGES = 6
    try:
        messages.append({"role": "user", "content": question}) # envoie la question à ollama
        conversation = [messages[0]] + messages[-MAX_MESSAGES:]
            # donne la reponse à ollama
        response = ollama.chat(
            model="phi3.5", # model
            messages=conversation, # message devient la conv
            options={
                "num_predict": 150  # limite la longueur de la réponse
            }
        )

        # on met dans answer la reponse du bot
        answer = response["message"]["content"]
        messages.append({"role": "assistant", "content": answer}) 

        return jsonify({"reply": answer}) # renvoie de la réponse au navigateur

    except Exception as e:
        return jsonify({"reply": f"Erreur Ollama : {str(e)}"}) # si ollama plante il envoie un message d'erreur


# la route qui remet la conversasion à zero
@app.route("/reset", methods=["POST"])
def reset():
    global messages
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]
    return jsonify({"status": "ok"})



# ------------partie pour la connexion avec discord (plus importante)
#-------------modification par rapport à celui de la demo

#cette partie gere la connexion du bot sur discord, le comportement du bot et ses reponses


intents = discord.Intents.default() # connexionn au serveur discord par defaut
intents.message_content = True # permet au bot de lire les messages

bot = commands.Bot(command_prefix="!", intents=intents) # creation du bot

@bot.event  # declanche un evenement discord qui affiche un message à la connexion du bot
async def on_ready():
    print(f"Bot Discord connecté : {bot.user}")

@bot.event # appel un event discord à chaque messages et stocke dans message
async def on_message(message):
    global messages

    if message.author == bot.user: # verifie si les messages sont du bot ou de l'user, si bot vers bot, on stop
        return

    print("------ MESSAGE DISCORD REÇU ------") # message affichés dans la console (infos)
    print(f"Auteur : {message.author}")
    print(f"Contenu brut : {message.content}")

    question = message.content.strip() # le contenu de message est stocké comme question que le bot va traiter

    if not question:  # verifie si question est vide et envoie un message
        print("Message vide")
        await message.channel.send("Merci d'écrire une question.")
        return

    question_min = question.lower() #affiche le message(question)
    autorisee = any(mot in question_min for mot in MOTS_CLES_HOTELLERIE) #verifie si des mots de la question sont
                                                                            # dans mots clés

    print(f"Question : {question}")
    print(f"Autorisée : {autorisee}")

    if not autorisee:  # si les mots ne sont pas dans autorise(mots clés), il repond selon temps_messages
        temp_messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": question},
        ]

        response = ollama.chat( # ollama(model phi3.5) qui donne la reponse
            model="phi3.5",
            messages=temp_messages,
            options={"num_predict": 60}
        )

        answer = response["message"]["content"] # solution est donc le message reponse du bot
        await message.channel.send(answer)
        return

    try:  # essai de repondre si les mots sont dans autorise(meme chose)
        temp_messages_rep = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": question},
        ]
        msg = await message.channel.send("Je traite votre demande...")

        async with message.channel.typing():
            response = ollama.chat(
                model="phi3.5",
                messages=temp_messages_rep,
                options={"num_predict": 90}
            )

        answer = response["message"]["content"]

        await msg.delete()  # supprime le message d'attente
        await message.channel.send(answer)

    except Exception as e:
        print(f"Erreur Ollama/Discord : {e}")
        await message.channel.send(f"Erreur : {str(e)}")

    await bot.process_commands(message)

def run_flask():
    app.run(debug=True, use_reloader=False)

def run_discord():
    if not DISCORD_TOKEN:
        print("Erreur : token Discord introuvable.")
        return
    bot.run(DISCORD_TOKEN)

if __name__ == "__main__":
    threading.Thread(target=run_flask).start()
    run_discord()