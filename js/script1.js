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

