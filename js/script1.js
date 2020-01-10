(
	function() {
		var menuRecherche = document.querySelector(".menu-recherche");
        var rechercheBtn = document.querySelector(".recherche-btn");
        var fermerBtn = document.querySelector(".fermer-btn");

        var open = false;
		rechercheBtn.addEventListener("click", function() {
            if (!open) {
            menuRecherche.classList.add("open");
            open = true;
		}
        })

        fermerBtn.addEventListener("click", function() {
            if (open) {
            menuRecherche.classList.remove("open");
            open = false;
		}
        })

        var programmeur1message = document.getElementById("programmeur1message");
        programmeur1message.addEventListener("click", function() {
            window.open('mailto:test@example.com');

        });
})();

function Programmeur (nom, prenom, courriel, listeLangages){
	this.nom = nom;
	this.prenom=prenom;
	this.courriel= courriel;
	this.listeLangages = listeLangages;
}

var listeProgrammeurs = [
	new Programmeur("Boukhoulda", "Lokman", "l@b.com", ["JavaScript", "HTML", "CSS", "Java"]);
	new Programmeur("Mousavi", "Babak", "b@m.com", ["Java", "Python", "SQL"]);
	new programmeur("Flouflou", "Alain", "a@f.com", ["C#", "SQL Server", "HTML", "CSS", "JavaScript"]);
	new Programmeur("Claireclaire", "Annie", "a@c.com", ["Kutlin", "JavaScript"]);
];

$(#ajouterModal).on('shown.bs.modal', function(){
	document.document.getElementById('ajouter')=function () {
		var nom = document.document.getElementById('inputNom').value;
		var prenom = document.getElementById('inputPrenom').value;
		var courriel = document.document.getElementById('inputEmail').value;
		var langagesStr = document.document.getElementById('langagesTxtField').value;
		var langages = langagesStr.trim().split(" ");
		listeProgrammeurs.push(new Programmeur(nom, prenom, courriel, langages));
});
