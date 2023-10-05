
var indices = [
"Indice 1 : Ce forum contient des failles XSS.",
"Indice 2 : Exploiter cette faille pour mettre des potentiels scripts.",
"Indice 3 : Nunc vel rutrum nunc."];

var indiceCourant = 0;
var dernierClic = 0;
var delaiEntreIndices = 2 * 60 * 1000; // 2 minutes en millisecondes

function genererIndice() {
    var tempsActuel = new Date().getTime();

    if (tempsActuel - dernierClic >= delaiEntreIndices) {
        if (indiceCourant < indices.length) {
            var nouvelIndice = indices[indiceCourant];
            document.getElementById("indice").textContent = nouvelIndice;
            indiceCourant++;
            dernierClic = tempsActuel;
        } else {
            document.getElementById("indice").textContent = "Plus d'indices disponibles.";
            document.getElementById("genererIndice").disabled = true;
        }
    } else {
        var attenteRestante = (delaiEntreIndices - (tempsActuel - dernierClic)) / 1000;
        alert("Attendez encore " + attenteRestante + " secondes avant de générer un nouvel indice.");
    }
}

document.getElementById("genererIndice").addEventListener("click", genererIndice);

var popup = document.getElementById("popup");
var closeButton = document.getElementById("closeButton");
var button = document.getElementById("genererIndice");
var synopsis = document.getElementById("Synopsis");

// Afficher la pop-up au chargement de la page
window.addEventListener("load", function() {
    popup.style.display = "block";
    button.style.display = "none";
    synopsis.style.display = "none";
});

// Gérer la fermeture de la pop-up lorsque le bouton est cliqué
closeButton.addEventListener("click", function() {
    popup.style.display = "none";
    button.style.display = "block";
    synopsis.style.display = "block";
});

synopsis.addEventListener("click", function() {
    popup.style.display = "block";
});

// Fonction pour ajouter un commentaire à la zone d'affichage
function addComment(name, comment) {
    const commentsDiv = document.getElementById("comments");
    const commentDiv = document.createElement("div");
    commentDiv.innerHTML = `<strong>${name}:</strong> ${comment}`;
    commentsDiv.appendChild(commentDiv);
}

// Gestionnaire d'événement pour soumettre le formulaire
document.getElementById("comment-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement
    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;
    addComment(name, comment); // Ajoute le commentaire à la zone d'affichage
    document.getElementById("name").value = ""; // Efface le champ Nom
    document.getElementById("comment").value = ""; // Efface le champ Commentaire
});

var phraseCookie = getCookie("maPhrase");
if (!phraseCookie) {
    var maPhrase = "Votre phrase ici";
    setCookie("maPhrase", maPhrase, 30); // Le dernier paramètre est la durée en jours avant l'expiration du cookie
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}