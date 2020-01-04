(
	function() {
		var menuRecherche = document.querySelector(".menu-recherche");
        var rechercheBtn = document.querySelector(".recherche-btn");
        var ajouterBtn = document.getElementById("ajouter-programmeur");
        var fermerBtn = document.querySelector(".fermer-btn");
        var listeProgrammeurs = new ListeProgrammeurs();
        var selectTriElem = document.getElementById("tri");
        var listeCards = new ListeCards();
        var prenomInput = document.getElementById("inputPrenom");
        var nomInput = document.getElementById("inputNom");
        var emailInput = document.getElementById("inputEmail");
        var langagesTxtField = document.getElementById("langagesTxtField");
        var cardsContainer = document.getElementById("cards");
        var rechercheInput = document.getElementById("recherche");
        var rechercheBtnIn = document.getElementById("recherche-btn");
        var open = false;
        var rechercher = new Rechercher();
        const LANGAGE = "LANGAGE";
        const NOM = "NOM";
        const PRENOM = "PRENOM";

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
        

        // LA FONCTION Programmeur
        function Programmeur(nomProg, prenomProg, langagesProg, emailProg) {
            var nom = nomProg;
            var prenom = prenomProg;
            var langages = langagesProg;
            var email = emailProg;
            var date = new Date();
            var dateResult = date.toLocaleDateString("fr-CA", { 
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });

              var timeResult = date.toLocaleTimeString();

              
            this.setNom = function(nomProg) {
                nom = nomProg;
            }
            
                this.setPrenom = function(prenomProg) {
                prenom = prenomProg;
            }
            
            this.addLangage = function(langage) {
                langages.push(langage);
            }
            
            this.setEmail = function(emailProg) {
            email = emailProg;	
            } 
            
            this.getNom = function() {
                return nom;
            }
            
            this.getPrenom = function() {
                return prenom;  
            }
            
            this.getLangages = function() {
                return langages;
            }
            
            this.getEmail = function() {
                return email;
            }

            this.getDate = function() {
                return dateResult;
            }

            this.getTime = function() {
                return timeResult;
            }
        };
        
        function Card(programmeur) {
            //Col card creation
            var colCard = document.createElement("div");
            var colCardClassAttr = document.createAttribute("class");
            colCardClassAttr.value = "col mb-4";
            colCard.setAttributeNode(colCardClassAttr);
            // Card creation
            var card = document.createElement("div");
            var cardClassAttr = document.createAttribute("class");
            cardClassAttr.value = "card card-hover rounded-0";
            card.setAttributeNode(cardClassAttr);
            //img user creation
            var imgUser = document.createElement("img");
            var srcAttr = document.createAttribute("src");
            srcAttr.value = "images/utilisateur.png";
            var altAttr = document.createAttribute("alt");
            altAttr.value = "...";
            var imgClassAttr = document.createAttribute("class");
            imgClassAttr.value = "card-img-top";
            imgUser.setAttributeNode(srcAttr);
            imgUser.setAttributeNode(altAttr);
            imgUser.setAttributeNode(imgClassAttr);
            //Langages 
            var langages = document.createElement("p");
            var pLangagesClass = document.createAttribute("class");
            pLangagesClass.value = "card-text langages-programmeur";
            langages.setAttributeNode(pLangagesClass);
            var pLangagesContent = "";
            var langagesTextNodeElem;
            programmeur.getLangages().forEach(langage => {
                if (pLangagesContent == "") {
                    pLangagesContent += langage;
                } else 
                pLangagesContent += "," + langage;
            });
            langagesTextNodeElem = document.createTextNode(pLangagesContent);
            langages.appendChild(langagesTextNodeElem);
            // Card body creation
            var cardBody = document.createElement("div");
            var cardBodyClassAttr = document.createAttribute("class");
            cardBodyClassAttr.value = "card-body";
            cardBody.setAttributeNode(cardBodyClassAttr);
            //title element
            var title = document.createElement("h5");
            var titleClassAttr = document.createAttribute("class");
            var titleText = document.createTextNode(`${programmeur.getPrenom()} ${programmeur.getNom()}`);
            titleClassAttr.value = "card-title nom-programmeur";
            title.setAttributeNode(titleClassAttr);
            title.appendChild(titleText);
            //Envoyer un message et favoris
            var message = document.createElement("a");
            var hrefMessage = document.createAttribute("href");
            var messageClass = document.createAttribute("class");
            var titleMessage = document.createAttribute("title");
            var idMessage = document.createAttribute("id");
            var messageTextNode = document.createTextNode("✉");
            idMessage.value = `${programmeur.getEmail()}message`;
            messageClass.value = "icons";
            hrefMessage.value = "#";
            titleMessage.value = "Envoyer un message";
            message.setAttributeNode(messageClass);
            message.setAttributeNode(idMessage);
            message.setAttributeNode(hrefMessage);
            message.setAttributeNode(titleMessage);
            message.appendChild(messageTextNode);

            var favoris = document.createElement("a");
            var hrefFavoris = document.createAttribute("href");
            var favorisClass = document.createAttribute("class");
            var titleFavoris = document.createAttribute("title");
            var favorisTextNode = document.createTextNode("★");
            favorisClass.value = "icons";
            hrefFavoris.value = "#";
            titleFavoris.value = "Ajouter aux favoris";
            favoris.setAttributeNode(favorisClass);
            favoris.setAttributeNode(hrefFavoris);
            favoris.setAttributeNode(titleFavoris);
            favoris.appendChild(favorisTextNode);

            //mise à jour il y a....
            var miseAJour = document.createElement("p");
            var miseAJourClass = document.createAttribute("class");
            miseAJourClass.value = "card-text";
            miseAJour.setAttributeNode(miseAJourClass);
            var smallElem = document.createElement("small");
            var smallClass = document.createAttribute("class");
            smallClass.value = "text-muted";
            smallElem.setAttributeNode(smallClass);
            
            var smallTextNodeElem = document.createTextNode(`Mise à jour le: ${programmeur.getDate()} à ${programmeur.getTime()}`);
            smallElem.appendChild(smallTextNodeElem);
            miseAJour.appendChild(smallElem);
            // Assembly
            cardBody.appendChild(title);
            cardBody.appendChild(langages);
            cardBody.appendChild(message);
            cardBody.appendChild(favoris);
            cardBody.appendChild(miseAJour);
            card.appendChild(imgUser);
            card.appendChild(cardBody);
            colCard.appendChild(card);

            message.addEventListener("click", function() {
                window.open(`mailto:${programmeur.getEmail()}`);
            }); 

           return colCard;
           //cardsContainer.appendChild(colCard);
        }


        function ListeCards() {
            var cards = [];


            this.resetCards = function() {
               return cards = []; 
            }

            this.addCard = function(card) {
                cards.push(card);
            }

            this.getCards = function() {
                return cards;
            }
        }
        
        // Effacer les informations du modal Ajouter programmeur
        function resetFormAjouter() {
            nomInput.value = "";
            prenomInput.value = "";
            langagesTxtField.value = "";
            emailInput.value = ""; 
        }

        //Liste des programmeurs 
        function ListeProgrammeurs() {
            var programmeurs = [];
            
            this.addProgrammeur = function(programmeur) {
                programmeurs.push(programmeur);
            }
            
            this.getAllProgrammeurs = function() {
                return programmeurs;
            }

            this.sortBy = function(critere) {

                if (critere == NOM) {
                    return programmeurs.sort((a,b) => {
                        var x = a.getNom().toLowerCase(); 
                        var y = b.getNom().toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                }

                if (critere == LANGAGE) {
                    return programmeurs.sort((a,b) => {
                        var x = a.getLangages().map(langage => langage.toLowerCase());
                        var y = b.getLangages().map(langage => langage.toLowerCase());
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                }

                if (critere == PRENOM) {
                    return programmeurs.sort((a,b) => {
                        var x = a.getPrenom().toLowerCase(); 
                        var y = b.getPrenom().toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                }
            }
        }

        // Afficher les cartes sur la page HTML
        function afficherCards() {
            while (cardsContainer.hasChildNodes()) {  
                cardsContainer.removeChild(cardsContainer.firstChild);
              }

            if (listeCards.getCards().length > 0) {
                listeCards.getCards().forEach(card => {
                    cardsContainer.appendChild(card)
                })
            }
        }

        //Creer pour chaque programmeur existant une carte
        function programmeursToCards(programmeurs) {
            for (i = 0; i < programmeurs.length; i++) {
                listeCards.addCard(new Card(programmeurs[i]));
            }
        }

        //La fonction qui fait la recherche, retourne un array de programmeurs trouvés
        function Rechercher() {
            var resultatRecherche; 
            this.getResultat = function(motCle) {
               resultatRecherche = listeProgrammeurs.getAllProgrammeurs().filter(programmeur => {
                return programmeur.getNom().toLowerCase().includes(motCle) || programmeur.getPrenom().toLowerCase().includes(motCle) || programmeur.getEmail().toLowerCase().includes(motCle) || programmeur.getLangages().map(langage => langage.toLowerCase()).includes(motCle);             });
                return resultatRecherche
            };
        }

        //Afficher les résultats comme cartes
        function afficherRecherche() {
            listeCards.resetCards();
            programmeursToCards(rechercher.getResultat(rechercheInput.value.toLowerCase()));
            afficherCards();
        }

        rechercheInput.addEventListener("keyup", function() {
            console.log(listeProgrammeurs.getAllProgrammeurs()[0].getLangages())
            if (rechercher.getResultat(rechercheInput.value.toLowerCase()).length > 0) {
           afficherRecherche();
        }
        })

        rechercheBtnIn.addEventListener("click", function() {
            if (open) {
                menuRecherche.classList.remove("open");
                open = false;
            }
            console.log(listeProgrammeurs.getAllProgrammeurs()[0].getLangages())
            if (rechercher.getResultat(rechercheInput.value.toLowerCase()).length > 0) {
           afficherRecherche();
        }
        });

        
        ajouterBtn.addEventListener("click", function() {
            var regex = /,|;/;
            var programmeur = new Programmeur(nomInput.value,prenomInput.value,langagesTxtField.value.split(regex), emailInput.value);
            listeProgrammeurs.addProgrammeur(programmeur);
            listeProgrammeurs.sortBy(selectTriElem.value);
            listeCards.resetCards();
            programmeursToCards(listeProgrammeurs.getAllProgrammeurs());
            //listeCards.addCard(new Card(programmeur));
            afficherCards();     
            resetFormAjouter();
            var dismiss = document.createAttribute("data-dismiss");
            dismiss.value = "modal";
            ajouterBtn.setAttributeNode(dismiss);
        });


        selectTriElem.addEventListener("change", function() {
            listeCards.resetCards();
            listeProgrammeurs.sortBy(selectTriElem.value);
            programmeursToCards(listeProgrammeurs.getAllProgrammeurs());
            afficherCards();
        })

        listeProgrammeurs.sortBy(selectTriElem.value);
        programmeursToCards(listeProgrammeurs.getAllProgrammeurs());

        afficherCards();

        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img = document.querySelector('img');  // $('img')[0]
                img.src = URL.createObjectURL(this.files[0]); // set src to blob url
               // img.onload = imageIsLoaded;
            }
        });

})();

