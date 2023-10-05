
var indices = [
    "Indice 1 : Lorem ipsum dolor sit amet.",
    "Indice 2 : consectetur adipiscing elit.",
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

    const User = 5;
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