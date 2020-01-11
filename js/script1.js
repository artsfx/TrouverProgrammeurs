(
    // Au chargement de la page exécuter cette fonction
    function () {
        var menuRecherche = document.querySelector(".menu-recherche");
        var rechercheBtn = document.querySelector(".recherche-btn");
        var ajouterModalBtn = document.getElementById("ajouter-programmeur-modal");
        var fermerModalBtn = document.getElementById("fermer-modal");
        var fermerRechercheBtn = document.querySelector(".fermer-btn");
        var fermerAjoutBtn = document.getElementById("ajout-fermer");
        var listeProgrammeurs = new ListeProgrammeurs();
        var listeFavorisHTML = new ListeFavorisHTML();
        var programmeur1 = new Programmeur("Gates", "Bill", ["C#", "Visual Basic", "Assembleur"], "gates.bill@microsoft.com");
        var programmeur2 = new Programmeur("Jobs", "Steve", ["Swift", "C"], "jobs.steve@apple.com");
        var programmeur3 = new Programmeur("Zuckerberg", "Mark", ["ReactJS", "React Native", "PHP"], "zuckerberg.mark@facebook.com");

        listeProgrammeurs.addProgrammeur(programmeur1);
        listeProgrammeurs.addProgrammeur(programmeur2);
        listeProgrammeurs.addProgrammeur(programmeur3);

        var listeFavoris = new ListeFavoris();
        var selectTriElem = document.getElementById("tri");
        var listeCards = new ListeCards();
        var prenomInput = document.getElementById("inputPrenom");
        var nomInput = document.getElementById("inputNom");
        var emailInput = document.getElementById("inputEmail");
        var langagesTxtField = document.getElementById("langagesTxtField");
        var cardsContainer = document.getElementById("cards");
        var rechercheInput = document.getElementById("recherche");
        var rechercheBtnIn = document.getElementById("recherche-btn");
        var favorisContainer = document.getElementById("modal-favoris-content");
        var open = false;
        var rechercher = new Rechercher();
        const LANGAGE = "LANGAGE";
        const NOM = "NOM";
        const PRENOM = "PRENOM";
        listeProgrammeurs.sortBy(selectTriElem.value);
        programmeursToCards(listeProgrammeurs.getAllProgrammeurs());
        afficherCards();
        afficherFavoris();
        resetFormAjouter();
        setListeners();


        /********************************** Les fonctions **********************************************/
        // LA FONCTION Programmeur
        function Programmeur(nomProg, prenomProg, langagesProg, emailProg) {
            var nom = nomProg;
            var prenom = prenomProg;
            var langages = langagesProg;
            var email = emailProg;
            var estFavoris = false;
            var date = new Date();
            var dateResult = date.toLocaleDateString("fr-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });

            var timeResult = date.toLocaleTimeString();


            this.setNom = function (nomProg) {
                nom = nomProg;
            }

            this.setPrenom = function (prenomProg) {
                prenom = prenomProg;
            }

            this.addLangage = function (langage) {
                langages.push(langage);
            }

            this.setEmail = function (emailProg) {
                email = emailProg;
            }

            this.setEstFavoris = function (favoris) {
                estFavoris = favoris;
            }

            this.getEstFavoris = function () {
                return estFavoris;
            }

            this.getNom = function () {
                return nom;
            }

            this.getPrenom = function () {
                return prenom;
            }

            this.getLangages = function () {
                return langages;
            }

            this.getEmail = function () {
                return email;
            }

            this.getDate = function () {
                return dateResult;
            }

            this.getTime = function () {
                return timeResult;
            }
        };

        // Creation d'une carte HTML
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
            var favorisTextNode;

            if (programmeur.getEstFavoris()) {
                favorisTextNode = document.createTextNode("★");
            } else {
                favorisTextNode = document.createTextNode("☆");
            }
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

            favoris.addEventListener("click", function () {
                if (programmeur.getEstFavoris()) {
                    listeFavorisHTML.resetFavoris();
                    programmeur.setEstFavoris(false);
                    listeFavoris.removeFavoris(programmeur);
                    //listeFavorisHTML.removeFavoris(programmeur);
                    favorisToFavorisHTML(listeFavoris, listeFavorisHTML);
                    afficherFavoris();
                    favoris.removeChild(favorisTextNode);
                    favorisTextNode = document.createTextNode("☆");
                    favoris.appendChild(favorisTextNode);
                    console.log(listeFavoris.getAllFavoris());

                } else {
                    listeFavorisHTML.resetFavoris();
                    programmeur.setEstFavoris(true);
                    listeFavoris.addFavoris(programmeur);
                    //listeFavorisHTML.addFavoris(favorisHTML);
                    favorisToFavorisHTML(listeFavoris, listeFavorisHTML);
                    afficherFavoris();
                    favoris.removeChild(favorisTextNode);
                    favorisTextNode = document.createTextNode("★");
                    favoris.appendChild(favorisTextNode);
                    console.log(listeFavoris.getAllFavoris());


                }
            })
            message.addEventListener("click", function () {
                window.open(`mailto:${programmeur.getEmail()}`);
            });

            return colCard;
        }

        // Création de l'élément HTML d'un favoris
        function FavorisHTML(programmeur) {
            var favorisElem = document.createElement("a");
            var favorisElemClass = document.createAttribute("class");
            favorisElemClass.value = "dropdown-item";
            var favorisElemHref = document.createAttribute("href");
            favorisElemHref.value = "#";
            favorisElem.setAttributeNode(favorisElemClass);
            favorisElem.setAttributeNode(favorisElemHref);
            favorisElemTxtNode = document.createTextNode(`${programmeur.getPrenom()} ${programmeur.getNom()}`);
            favorisElem.appendChild(favorisElemTxtNode);
            return favorisElem;
        }

        // Liste des favoris en objet JavaScript       
        function ListeFavoris() {
            var favoris = [];
            this.addFavoris = function (programmeur) {
                favoris.push(programmeur);
            }
            this.getAllFavoris = function () {
                return favoris;
            }

            this.removeFavoris = function (programmeur) {
                favoris.splice(favoris.indexOf(programmeur), 1);
            }
        }

        // La liste des favoris en HTML
        function ListeFavorisHTML() {
            var favorisHTML = [];

            this.resetFavoris = function () {
                return favorisHTML = [];
            }

            this.addFavoris = function (favoris) {
                favorisHTML.push(favoris);
            }

            this.getAllFavoris = function () {
                return favorisHTML;
            }
        }

        // La liste des cartes 
        function ListeCards() {
            var cards = [];


            this.resetCards = function () {
                return cards = [];
            }

            this.addCard = function (card) {
                cards.push(card);
            }

            this.getCards = function () {
                return cards;
            }
        }


        // Effacer les informations du modal Ajouter programmeur
        function resetFormAjouter() {
            var nomErreurSpan = document.getElementById("erreur-nom");
            var prenomErreurSpan = document.getElementById("erreur-prenom");
            var langagesErreurSpan = document.getElementById("erreur-langages");
            var erreurEmailSpan = document.getElementById("erreur-email");
            var erreurGlobale = document.getElementById("erreur-globale");
            erreurEmailSpan.innerHTML = "";
            nomErreurSpan.innerHTML = "";
            prenomErreurSpan.innerHTML = "";
            langagesErreurSpan.innerHTML = "";
            nomInput.value = "";
            prenomInput.value = "";
            langagesTxtField.value = "";
            emailInput.value = "";
            erreurGlobale.innerHTML = "";
        }

        //Liste des programmeurs 
        function ListeProgrammeurs() {
            var programmeurs = [];

            this.addProgrammeur = function (programmeur) {
                programmeurs.push(programmeur);
            }

            this.getAllProgrammeurs = function () {
                return programmeurs;
            }

            this.sortBy = function (critere) {

                if (critere == NOM) {
                    return programmeurs.sort((a, b) => {
                        var x = a.getNom().toLowerCase();
                        var y = b.getNom().toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    });
                }

                if (critere == LANGAGE) {
                    return programmeurs.sort((a, b) => {
                        var x = a.getLangages().map(langage => langage.toLowerCase());
                        var y = b.getLangages().map(langage => langage.toLowerCase());
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    });
                }

                if (critere == PRENOM) {
                    return programmeurs.sort((a, b) => {
                        var x = a.getPrenom().toLowerCase();
                        var y = b.getPrenom().toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
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

        // Afficher les favoris sur la plage HTML
        function afficherFavoris() {
            while (favorisContainer.hasChildNodes()) {
                favorisContainer.removeChild(favorisContainer.firstChild);
            }

            console.log(favorisContainer);
            if (listeFavorisHTML.getAllFavoris().length > 0) {
                listeFavorisHTML.getAllFavoris().forEach(fav => {
                    favorisContainer.appendChild(fav)
                })
            }
        }

        /********************* Ajouter les favoris dans une liste d'éléments HTML ***********************/
        function favorisToFavorisHTML(listeFavoris, listeFavorisHTML) {
            for (i = 0; i < listeFavoris.getAllFavoris().length; i++) {
                listeFavorisHTML.addFavoris(new FavorisHTML(listeFavoris.getAllFavoris()[i]));
            }
        }
        /******************************************************************************************************* */

        //Creer pour chaque programmeur existant une carte
        function programmeursToCards(programmeurs) {
            for (i = 0; i < programmeurs.length; i++) {
                listeCards.addCard(new Card(programmeurs[i]));
            }
        }

        //La fonction qui fait la recherche, retourne un array de programmeurs trouvés
        function Rechercher() {
            var resultatRecherche;
            this.getResultat = function (motCle) {
                resultatRecherche = listeProgrammeurs.getAllProgrammeurs().filter(programmeur => {
                    return programmeur.getNom().toLowerCase().includes(motCle) || programmeur.getPrenom().toLowerCase().includes(motCle) || programmeur.getEmail().toLowerCase().includes(motCle) || programmeur.getLangages().map(langage => langage.toLowerCase()).includes(motCle);
                });
                return resultatRecherche
            };
        }

        //Afficher les résultats comme cartes
        function afficherRecherche() {
            listeCards.resetCards();
            programmeursToCards(rechercher.getResultat(rechercheInput.value.toLowerCase()));
            afficherCards();
        }




        /*************************************** Les Listeners  ************************************/

        function setListeners() {
            rechercheBtn.addEventListener("click", function () {
                if (!open) {
                    menuRecherche.classList.add("open");
                    open = true;
                }
            })

            fermerRechercheBtn.addEventListener("click", function () {
                if (open) {
                    rechercheInput.value = "";
                    menuRecherche.classList.remove("open");
                    open = false;
                }
            })

            rechercheBtnIn.addEventListener("click", function () {
                if (open) {
                    menuRecherche.classList.remove("open");
                    open = false;
                }
                if (rechercher.getResultat(rechercheInput.value.toLowerCase()).length > 0) {
                    afficherRecherche();
                }
            });

            rechercheInput.addEventListener("input", function () {
                console.log(listeProgrammeurs.getAllProgrammeurs()[0].getLangages())
                if (rechercher.getResultat(rechercheInput.value.toLowerCase()).length > 0) {
                    afficherRecherche();
                }
            })


            ajouterModalBtn.addEventListener("click", function () {
                var regex = /,|;/;
                var programmeur = new Programmeur(nomInput.value, prenomInput.value, langagesTxtField.value.split(regex), emailInput.value);
                var erreurGlobale = document.getElementById("erreur-globale");

                try {
                    validerEmail(emailInput.value);
                    validerLangages(document.getElementById("langagesTxtField").value);
                    validerAlphabetique(document.getElementById("inputPrenom").value, document.getElementById("erreur-prenom"), "Prénom");
                    validerAlphabetique(document.getElementById("inputNom").value, document.getElementById("erreur-nom"), "Nom");
                    listeProgrammeurs.addProgrammeur(programmeur);
                    listeProgrammeurs.sortBy(selectTriElem.value);
                    listeCards.resetCards();
                    programmeursToCards(listeProgrammeurs.getAllProgrammeurs());
                    //listeCards.addCard(new Card(programmeur));
                    afficherCards();
                    resetFormAjouter();
                    var dismiss = document.createAttribute("data-dismiss");
                    dismiss.value = "modal";
                    ajouterModalBtn.setAttributeNode(dismiss);
                    erreurGlobale.innerHTML = "";
                } catch (err) {
                    erreurGlobale.innerHTML = "Veuillez remplir le formulaire correctement";
                }
            });

            //Si on ferme le modal ajouter a partir du X on efface le formulaire
            fermerModalBtn.addEventListener("click", function () {
                resetFormAjouter();
            });

            selectTriElem.addEventListener("change", function () {
                listeCards.resetCards();
                listeProgrammeurs.sortBy(selectTriElem.value);
                programmeursToCards(listeProgrammeurs.getAllProgrammeurs());
                afficherCards();
            })



            emailInput.addEventListener("input", function () {
                var erreurEmailSpan = document.getElementById("erreur-email");
                try {
                    validerEmail(emailInput.value);
                    erreurEmailSpan.innerHTML = "";
                } catch (err) {
                    erreurEmailSpan.innerHTML = err;
                }
            })

            nomInput.addEventListener("input", function () {
                try {
                    var elementErreurSpan = document.getElementById("erreur-nom");
                    validerAlphabetique(document.getElementById("inputNom").value, document.getElementById("erreur-nom"), "Nom");
                    elementErreurSpan.innerHTML = "";
                } catch (err) {
                    elementErreurSpan.innerHTML = err;
                }
            })

            prenomInput.addEventListener("input", function () {
                try {
                    var elementErreurSpan = document.getElementById("erreur-prenom");
                    validerAlphabetique(document.getElementById("inputPrenom").value, document.getElementById("erreur-prenom"), "Prénom");
                    elementErreurSpan.innerHTML = "";
                } catch (err) {
                    elementErreurSpan.innerHTML = err;
                }
            })

            langagesTxtField.addEventListener("input", function () {
                try {
                    var langagesErreurSpan = document.getElementById("erreur-langages");
                    validerLangages(document.getElementById("langagesTxtField").value);
                    langagesErreurSpan.innerHTML = "";
                } catch (err) {
                    langagesErreurSpan.innerHTML = err;
                }
            })

            fermerAjoutBtn.addEventListener("click", function () {
                resetFormAjouter();
            })
        }
        /********************************************************************************************/
        /******************************** Fonctions de validation de formulaire */
        function validerEmail(email) {
            var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (emailRegex.test(email)) {
                return (true)
            } else throw "Adresse email invalide"
        }

        function validerAlphabetique(inputValue, elementErreurSpan, inputName) {
            var alphaRegex = /^[a-zA-Z ]{2,30}$/;
            if (alphaRegex.test(inputValue)) {
                return (true)
            } else throw `${inputName} doit contenir uniquement des lettres et au moins 2 lettres`;
        }

        function validerLangages(langageValue) {

            if (langageValue.length != 0) {
                return (true);
            } else throw `Ajoutez au moins un langage qui contient 1 caractère minimum`;
        }

        /********************************************************************************************/

    })();

