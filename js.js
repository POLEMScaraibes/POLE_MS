/* =========================================================
   PÔLE MS — JAVASCRIPT
   Parcours client complet
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           WEB3FORMS
           ================================================= */

        const WEB3FORMS_ACCESS_KEY =
            "3ff300db-3383-4a44-90a2-238b643d49cb";

        const WEB3FORMS_ENDPOINT =
            "https://api.web3forms.com/submit";


        /* =================================================
           GOOGLE SHEETS — SYNCHRONISATION FICHE CLIENT
           ================================================= */

        const GOOGLE_SHEETS_ENDPOINT =
            "https://script.google.com/macros/s/AKfycbxHFolQPS6LP3OQufAEqNLfi7u3okIKAOEOH0WiBjBeEfXSGsP5YDk5bru7AM2rZshU/exec";


        /* =================================================
           DONNÉES DES PÔLES
           ================================================= */

        const services = {

            habitat: {

                title:
                    "Habitat & Travaux",

                description:
                    "Rénovation, second œuvre et amélioration de l'habitat.",

                needs: [

                    "Rénovation",

                    "Peinture",

                    "Carrelage",

                    "Plomberie",

                    "Électricité",

                    "Menuiserie",

                    "Maçonnerie",

                    "Second œuvre"

                ]

            },


            exterieur: {

                title:
                    "Extérieur & VRD",

                description:
                    "Aménagement, entretien et valorisation de vos extérieurs.",

                needs: [

                    "Paysagisme",

                    "Entretien espaces verts",

                    "Élagage",

                    "Terrassement",

                    "VRD",

                    "Clôture",

                    "Portail",

                    "Aménagement extérieur"

                ]

            },


            transport: {

                title:
                    "Mobilité & Transport",

                description:
                    "Faciliter vos déplacements et vos transports.",

                needs: [

                    "Transport de personnes",

                    "Taxi",

                    "Livraison",

                    "Transport de marchandises",

                    "Débarras",

                    "Encombrants",

                    "Déménagement"

                ]

            },


            personne: {

                title:
                    "Services à la personne",

                description:
                    "Vous accompagner au quotidien.",

                needs: [

                    "Accompagnement",

                    "Aide à domicile",

                    "Courses",

                    "Accompagnement aux rendez-vous",

                    "Services du quotidien",

                    "Assistance"

                ]

            },


            maintenance: {

                title:
                    "Maintenance & Dépannage",

                description:
                    "Entretenir, réparer et remettre en état.",

                needs: [

                    "Maintenance",

                    "Dépannage",

                    "Petites réparations",

                    "Entretien",

                    "Intervention technique"

                ]

            }

        };


        /* =================================================
           VARIABLES
           ================================================= */

        let selectedService =
            null;

        let selectedNeeds =
            [];

        let requestType =
            null;

        let selectedDate =
            null;

        let selectedTime =
            null;

        let currentCalendarDate =
            new Date();


        /* =================================================
           ÉLÉMENTS HTML
           ================================================= */

        const quoteBtn =
            document.getElementById(
                "quoteBtn"
            );

        const requestSection =
            document.getElementById(
                "requestSection"
            );

        const selectedPole =
            document.getElementById(
                "selectedPole"
            );

        const needsBox =
            document.getElementById(
                "needsBox"
            );

        const needsContainer =
            document.getElementById(
                "needsContainer"
            );

        const selectedNeedsBox =
            document.getElementById(
                "selectedNeeds"
            );

        const requestTypeBox =
            document.getElementById(
                "requestTypeBox"
            );

        const appointmentBox =
            document.getElementById(
                "appointmentBox"
            );

        const calendarContainer =
            document.getElementById(
                "calendarContainer"
            );

        const appointmentTime =
            document.getElementById(
                "appointmentTime"
            );

        const appointmentSummary =
            document.getElementById(
                "appointmentSummary"
            );

        const appointmentSummaryText =
            document.getElementById(
                "appointmentSummaryText"
            );

        const clientBox =
            document.getElementById(
                "clientBox"
            );

        const confirmationBox =
            document.getElementById(
                "confirmationBox"
            );


        /* =================================================
           MODAL
           ================================================= */

        const serviceModal =
            document.getElementById(
                "serviceModal"
            );

        const closeModalBtn =
            document.getElementById(
                "closeModalBtn"
            );

        const modalTitle =
            document.getElementById(
                "modalTitle"
            );

        const modalDescription =
            document.getElementById(
                "modalDescription"
            );

        const modalList =
            document.getElementById(
                "modalList"
            );

        const modalSelectBtn =
            document.getElementById(
                "modalSelectBtn"
            );


        let modalService =
            null;


        /* =================================================
           BOUTON ACCUEIL
           ================================================= */

        if (quoteBtn) {

            quoteBtn.addEventListener(
                "click",
                function () {

                    requestSection?.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        }


        /* =================================================
           CARTES DES PÔLES
           ================================================= */

        const serviceCards =
            document.querySelectorAll(
                ".service-card"
            );


        serviceCards.forEach(
            function (card) {

                const serviceKey =
                    card.dataset.service;

                const serviceButton =
                    card.querySelector(
                        ".service-btn"
                    );


                card.addEventListener(
                    "click",
                    function (event) {

                        if (
                            event.target.closest(
                                ".service-btn"
                            )
                        ) {

                            return;

                        }

                        openServiceModal(
                            serviceKey
                        );

                    }
                );


                if (serviceButton) {

                    serviceButton.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();

                            openServiceModal(
                                serviceKey
                            );

                        }
                    );

                }

            }
        );


        /* =================================================
           OUVERTURE MODAL
           ================================================= */

        function openServiceModal(
            serviceKey
        ) {

            const service =
                services[serviceKey];

            if (!service) {
                return;
            }

            modalService =
                serviceKey;

            modalTitle.textContent =
                service.title;

            modalDescription.textContent =
                service.description;

            modalList.innerHTML =
                "";

            service.needs.forEach(
                function (need) {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        need;

                    modalList.appendChild(
                        li
                    );

                }
            );

            serviceModal.classList.add(
                "active"
            );

            serviceModal.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        /* =================================================
           FERMETURE MODAL
           ================================================= */

        function closeServiceModal() {

            serviceModal.classList.remove(
                "active"
            );

            serviceModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (closeModalBtn) {

            closeModalBtn.addEventListener(
                "click",
                closeServiceModal
            );

        }


        if (serviceModal) {

            serviceModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        serviceModal
                    ) {

                        closeServiceModal();

                    }

                }
            );

        }


        /* =================================================
           SÉLECTION D'UN PÔLE
           ================================================= */

        if (modalSelectBtn) {

            modalSelectBtn.addEventListener(
                "click",
                function () {

                    if (!modalService) {
                        return;
                    }

                    selectService(
                        modalService
                    );

                    closeServiceModal();

                }
            );

        }


        /* =================================================
           FONCTION SÉLECTION PÔLE
           ================================================= */

        function selectService(
            serviceKey
        ) {

            const service =
                services[serviceKey];

            if (!service) {
                return;
            }

            selectedService =
                serviceKey;

            selectedNeeds =
                [];

            requestType =
                null;

            selectedDate =
                null;

            selectedTime =
                null;


            if (selectedPole) {

                selectedPole.textContent =
                    service.title;

                selectedPole.classList.remove(
                    "empty"
                );

            }


            if (needsBox) {

                needsBox.classList.remove(
                    "hidden"
                );

            }


            if (requestTypeBox) {

                requestTypeBox.classList.add(
                    "hidden"
                );

            }


            if (appointmentBox) {

                appointmentBox.classList.add(
                    "hidden"
                );

            }


            renderNeeds();

            updateSummary();

            requestSection?.scrollIntoView({
                behavior: "smooth"
            });

        }


        /* =================================================
           AFFICHAGE DES PRESTATIONS
           ================================================= */

        function renderNeeds() {

            if (!needsContainer) {
                return;
            }

            needsContainer.innerHTML =
                "";

            if (!selectedService) {
                return;
            }

            const service =
                services[selectedService];

            service.needs.forEach(
                function (need) {

                    const button =
                        document.createElement(
                            "button"
                        );

                    button.type =
                        "button";

                    button.className =
                        "need-btn";

                    button.textContent =
                        need;


                    if (
                        selectedNeeds.includes(
                            need
                        )
                    ) {

                        button.classList.add(
                            "selected"
                        );

                    }


                    button.addEventListener(
                        "click",
                        function () {

                            toggleNeed(
                                need
                            );

                        }
                    );


                    needsContainer.appendChild(
                        button
                    );

                }
            );


            renderSelectedNeeds();

        }


        /* =================================================
           AJOUT / SUPPRESSION PRESTATION
           ================================================= */

        function toggleNeed(
            need
        ) {

            const index =
                selectedNeeds.indexOf(
                    need
                );


            if (index === -1) {

                selectedNeeds.push(
                    need
                );

            } else {

                selectedNeeds.splice(
                    index,
                    1
                );

            }


            renderNeeds();

            updateRequestTypeVisibility();

            updateSummary();

        }


        /* =================================================
           AFFICHAGE SÉLECTION
           ================================================= */

        function renderSelectedNeeds() {

            if (!selectedNeedsBox) {
                return;
            }


            if (
                selectedNeeds.length === 0
            ) {

                selectedNeedsBox.textContent =
                    "Aucune prestation sélectionnée";

                selectedNeedsBox.classList.add(
                    "empty"
                );

                return;

            }


            selectedNeedsBox.classList.remove(
                "empty"
            );


            selectedNeedsBox.innerHTML =
                "";


            selectedNeeds.forEach(
                function (need) {

                    const item =
                        document.createElement(
                            "div"
                        );

                    item.className =
                        "selected-item";


                    const text =
                        document.createElement(
                            "span"
                        );

                    text.textContent =
                        need;


                    const remove =
                        document.createElement(
                            "button"
                        );

                    remove.type =
                        "button";

                    remove.textContent =
                        "Supprimer";


                    remove.addEventListener(
                        "click",
                        function () {

                            selectedNeeds =
                                selectedNeeds.filter(
                                    function (itemNeed) {

                                        return (
                                            itemNeed !==
                                            need
                                        );

                                    }
                                );


                            renderNeeds();

                            updateRequestTypeVisibility();

                            updateSummary();

                        }
                    );


                    item.appendChild(
                        text
                    );

                    item.appendChild(
                        remove
                    );

                    selectedNeedsBox.appendChild(
                        item
                    );

                }
            );

        }


        /* =================================================
           VISIBILITÉ DU CHOIX DE DÉMARCHE
           ================================================= */

        function updateRequestTypeVisibility() {

            if (!requestTypeBox) {
                return;
            }


            if (
                selectedNeeds.length > 0
            ) {

                requestTypeBox.classList.remove(
                    "hidden"
                );

            } else {

                requestTypeBox.classList.add(
                    "hidden"
                );

                requestType =
                    null;

                appointmentBox?.classList.add(
                    "hidden"
                );

            }

        }


        /* =================================================
           BOUTONS DEVIS / RENDEZ-VOUS
           ================================================= */

        const choiceButtons =
            document.querySelectorAll(
                ".choice-card, .choice-btn"
            );


        choiceButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const type =
                            button.dataset.type ||
                            (
                                button.id ===
                                "appointmentChoiceBtn"
                                    ? "rdv"
                                    : "devis"
                            );


                        requestType =
                            type;


                        choiceButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        if (
                            type ===
                            "rdv"
                        ) {

                            appointmentBox?.classList.remove(
                                "hidden"
                            );

                            calendarContainer?.classList.remove(
                                "hidden"
                            );

                        } else {

                            appointmentBox?.classList.add(
                                "hidden"
                            );

                        }


                        updateSummary();

                    }
                );

            }
        );


        /* =================================================
           MODIFICATION DES PRESTATIONS
           ================================================= */

        const editNeedsBtn =
            document.getElementById(
                "editNeedsBtn"
            );


        if (editNeedsBtn) {

            editNeedsBtn.addEventListener(
                "click",
                function () {

                    needsContainer?.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }
            );

        }


        /* =================================================
           SUPPRESSION DES PRESTATIONS
           ================================================= */

        const clearNeedsBtn =
            document.getElementById(
                "clearNeedsBtn"
            );


        if (clearNeedsBtn) {

            clearNeedsBtn.addEventListener(
                "click",
                function () {

                    selectedNeeds =
                        [];

                    requestType =
                        null;

                    selectedDate =
                        null;

                    selectedTime =
                        null;


                    renderNeeds();

                    updateRequestTypeVisibility();

                    updateSummary();

                }
            );

        }


        /* =================================================
           CALENDRIER
           ================================================= */

        const previousMonth =
            document.getElementById(
                "previousMonth"
            );

        const nextMonth =
            document.getElementById(
                "nextMonth"
            );

        const calendarMonth =
            document.getElementById(
                "calendarMonth"
            );

        const calendarDays =
            document.getElementById(
                "calendarDays"
            );

        const confirmDateBtn =
            document.getElementById(
                "confirmDateBtn"
            );


        function renderCalendar() {

            if (
                !calendarDays ||
                !calendarMonth
            ) {

                return;

            }


            calendarDays.innerHTML =
                "";


            const year =
                currentCalendarDate.getFullYear();

            const month =
                currentCalendarDate.getMonth();


            const firstDay =
                new Date(
                    year,
                    month,
                    1
                );


            const lastDay =
                new Date(
                    year,
                    month + 1,
                    0
                );


            const monthName =
                firstDay.toLocaleDateString(
                    "fr-FR",
                    {
                        month: "long",
                        year: "numeric"
                    }
                );


            calendarMonth.textContent =
                monthName.charAt(0).toUpperCase() +
                monthName.slice(1);


            let startDay =
                firstDay.getDay();


            startDay =
                startDay === 0
                    ? 6
                    : startDay - 1;


            for (
                let i = 0;
                i < startDay;
                i++
            ) {

                const empty =
                    document.createElement(
                        "span"
                    );

                calendarDays.appendChild(
                    empty
                );

            }


            for (
                let day = 1;
                day <= lastDay.getDate();
                day++
            ) {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "calendar-day";

                button.textContent =
                    day;


                const date =
                    new Date(
                        year,
                        month,
                        day
                    );


                const today =
                    new Date();


                today.setHours(
                    0,
                    0,
                    0,
                    0
                );


                if (
                    date < today
                ) {

                    button.disabled =
                        true;

                    button.classList.add(
                        "disabled"
                    );

                }


                if (
                    selectedDate &&
                    sameDate(
                        date,
                        selectedDate
                    )
                ) {

                    button.classList.add(
                        "selected"
                    );

                }


                button.addEventListener(
                    "click",
                    function () {

                        selectedDate =
                            date;

                        renderCalendar();

                        confirmDateBtn?.classList.remove(
                            "hidden"
                        );

                    }
                );


                calendarDays.appendChild(
                    button
                );

            }

        }


        function sameDate(
            dateA,
            dateB
        ) {

            return (
                dateA.getFullYear() ===
                dateB.getFullYear()
            ) && (
                dateA.getMonth() ===
                dateB.getMonth()
            ) && (
                dateA.getDate() ===
                dateB.getDate()
            );

        }


        if (previousMonth) {

            previousMonth.addEventListener(
                "click",
                function () {

                    currentCalendarDate.setMonth(
                        currentCalendarDate.getMonth() - 1
                    );

                    renderCalendar();

                }
            );

        }


        if (nextMonth) {

            nextMonth.addEventListener(
                "click",
                function () {

                    currentCalendarDate.setMonth(
                        currentCalendarDate.getMonth() + 1
                    );

                    renderCalendar();

                }
            );

        }


        if (confirmDateBtn) {

            confirmDateBtn.addEventListener(
                "click",
                function () {

                    if (!selectedDate) {
                        return;
                    }

                    appointmentSummary?.classList.remove(
                        "hidden"
                    );

                    updateAppointmentSummary();

                }
            );

        }


        if (appointmentTime) {

            appointmentTime.addEventListener(
                "change",
                function () {

                    selectedTime =
                        appointmentTime.value;

                    updateAppointmentSummary();

                    updateSummary();

                }
            );

        }


        function updateAppointmentSummary() {

            if (
                !appointmentSummaryText ||
                !selectedDate
            ) {

                return;

            }


            const dateText =
                selectedDate.toLocaleDateString(
                    "fr-FR",
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            const timeText =
                selectedTime ||
                "Horaire à préciser";


            appointmentSummaryText.textContent =
                dateText +
                " à " +
                timeText;

        }


        /* =================================================
           MODIFICATION RENDEZ-VOUS
           ================================================= */

        const editAppointmentBtn =
            document.getElementById(
                "editAppointmentBtn"
            );


        if (editAppointmentBtn) {

            editAppointmentBtn.addEventListener(
                "click",
                function () {

                    calendarContainer?.classList.remove(
                        "hidden"
                    );

                    renderCalendar();

                }
            );

        }


        /* =================================================
           SUPPRESSION RENDEZ-VOUS
           ================================================= */

        const deleteAppointmentBtn =
            document.getElementById(
                "deleteAppointmentBtn"
            );


        if (deleteAppointmentBtn) {

            deleteAppointmentBtn.addEventListener(
                "click",
                function () {

                    selectedDate =
                        null;

                    selectedTime =
                        null;


                    if (appointmentTime) {

                        appointmentTime.value =
                            "";

                    }


                    appointmentSummary?.classList.add(
                        "hidden"
                    );

                    renderCalendar();

                    updateSummary();

                }
            );

        }


        /* =================================================
           RÉCAPITULATIF
           ================================================= */

        function updateSummary() {

            const summaryPole =
                document.getElementById(
                    "summaryPole"
                );

            const summaryNeeds =
                document.getElementById(
                    "summaryNeeds"
                );

            const summaryType =
                document.getElementById(
                    "summaryType"
                );

            const summaryDate =
                document.getElementById(
                    "summaryDate"
                );

            const summaryTime =
                document.getElementById(
                    "summaryTime"
                );


            if (summaryPole) {

                summaryPole.textContent =
                    selectedService &&
                    services[selectedService]
                        ? services[selectedService].title
                        : "—";

            }


            if (summaryNeeds) {

                summaryNeeds.innerHTML =
                    "";


                if (
                    selectedNeeds.length === 0
                ) {

                    summaryNeeds.textContent =
                        "Aucune prestation sélectionnée";

                } else {

                    selectedNeeds.forEach(
                        function (need) {

                            const span =
                                document.createElement(
                                    "span"
                                );

                            span.className =
                                "summary-need";

                            span.textContent =
                                need;

                            summaryNeeds.appendChild(
                                span
                            );

                        }
                    );

                }

            }


            if (summaryType) {

                summaryType.textContent =
                    requestType === "rdv"
                        ? "Prendre rendez-vous"
                        : requestType === "devis"
                            ? "Demander un devis"
                            : "—";

            }


            if (summaryDate) {

                summaryDate.textContent =
                    selectedDate
                        ? selectedDate.toLocaleDateString(
                            "fr-FR"
                        )
                        : "—";

            }


            if (summaryTime) {

                summaryTime.textContent =
                    selectedTime ||
                    "—";

            }

        }
              /* =================================================
           ENVOI FORMULAIRE
           ================================================= */

        const submitRequestBtn =
            document.getElementById(
                "submitRequestBtn"
            );


        if (submitRequestBtn) {

            submitRequestBtn.addEventListener(
                "click",
                submitRequest
            );

        }


        async function submitRequest() {

            const clientName =
                document.getElementById(
                    "clientName"
                )?.value.trim();


            const clientPhone =
                document.getElementById(
                    "clientPhone"
                )?.value.trim();


            const clientEmail =
                document.getElementById(
                    "clientEmail"
                )?.value.trim();


            const clientAddress =
                document.getElementById(
                    "clientAddress"
                )?.value.trim();


            const clientDescription =
                document.getElementById(
                    "clientDescription"
                )?.value.trim();


            const clientPhoto =
                document.getElementById(
                    "clientPhoto"
                );


            if (!clientName) {

                alert(
                    "Veuillez renseigner votre nom et prénom."
                );

                return;

            }


            if (!clientPhone) {

                alert(
                    "Veuillez renseigner votre numéro de téléphone."
                );

                return;

            }


            if (!selectedService) {

                alert(
                    "Veuillez sélectionner un pôle."
                );

                return;

            }


            if (
                selectedNeeds.length === 0
            ) {

                alert(
                    "Veuillez sélectionner au moins une prestation."
                );

                return;

            }


            if (!requestType) {

                alert(
                    "Veuillez choisir entre un devis ou un rendez-vous."
                );

                return;

            }


            if (
                requestType === "rdv" &&
                (
                    !selectedDate ||
                    !selectedTime
                )
            ) {

                alert(
                    "Veuillez sélectionner une date et un horaire pour le rendez-vous."
                );

                return;

            }


            submitRequestBtn.disabled =
                true;

            submitRequestBtn.textContent =
                "Envoi en cours...";


            const service =
                services[selectedService];


            /* =================================================
               DONNÉES DE LA FICHE CLIENT
               ================================================= */

            const ficheClient = {

                nom:
                    clientName,

                prenom:
                    "",

                telephone:
                    clientPhone,

                email:
                    clientEmail,

                adresse:
                    clientAddress,

                besoins:
                    selectedNeeds.join(
                        ", "
                    ),

                pole:
                    service.title,

                dateRDV:
                    selectedDate
                        ? selectedDate.toLocaleDateString(
                            "fr-FR"
                        )
                        : "",

                heureRDV:
                    selectedTime || "",

                observations:
                    clientDescription

            };


            /* =================================================
               FORMULAIRE WEB3FORMS
               ================================================= */

            const formData =
                new FormData();


            formData.append(
                "access_key",
                WEB3FORMS_ACCESS_KEY
            );


            formData.append(
                "subject",
                "Nouvelle demande — PÔLE MS"
            );


            formData.append(
                "from_name",
                "PÔLE MS"
            );


            formData.append(
                "Nom / prénom",
                clientName
            );


            formData.append(
                "Téléphone",
                clientPhone
            );


            formData.append(
                "E-mail",
                clientEmail
            );


            formData.append(
                "Adresse d'intervention",
                clientAddress
            );


            formData.append(
                "Pôle",
                service.title
            );


            formData.append(
                "Prestations",
                selectedNeeds.join(
                    ", "
                )
            );


            formData.append(
                "Démarche",
                requestType === "rdv"
                    ? "Prendre rendez-vous"
                    : "Demander un devis"
            );


            if (selectedDate) {

                formData.append(
                    "Date du rendez-vous",
                    selectedDate.toLocaleDateString(
                        "fr-FR"
                    )
                );

            }


            if (selectedTime) {

                formData.append(
                    "Horaire du rendez-vous",
                    selectedTime
                );

            }


            formData.append(
                "Informations complémentaires",
                clientDescription
            );


            formData.append(
                "redirect",
                "false"
            );


            try {

                /* =================================================
   SYNCHRONISATION GOOGLE SHEETS  ================================================= */

try {

    const donneesSheets =
        new Blob(
            [
                JSON.stringify(ficheClient)
            ],
            {
                type:
                    "text/plain;charset=utf-8"
            }
        );

    const envoiSheets =
        navigator.sendBeacon(
            GOOGLE_SHEETS_ENDPOINT,
            donneesSheets
        );

    console.log(
        "Envoi Google Sheets :",
        envoiSheets
    );

} catch (sheetsError) {

    console.error(
        "Erreur synchronisation Google Sheets :",
        sheetsError
    );

}


                /* =================================================
                   ENVOI E-MAIL EXISTANT
                   ================================================= */

                const response =
                    await fetch(
                        WEB3FORMS_ENDPOINT,
                        {
                            method:
                                "POST",

                            body:
                                formData
                        }
                    );


                const result =
                    await response.json();


                if (
                    result.success
                ) {

                    showConfirmation();

                } else {

                    throw new Error(
                        result.message ||
                        "Erreur lors de l'envoi."
                    );

                }


            } catch (error) {

                console.error(
                    error
                );


                alert(
                    "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
                );


                submitRequestBtn.disabled =
                    false;

                submitRequestBtn.textContent =
                    "Envoyer ma demande";

            }

        }


        /* =================================================
           CONFIRMATION
           ================================================= */

        function showConfirmation() {

            const confirmationText =
                document.getElementById(
                    "confirmationText"
                );


            if (confirmationText) {

                confirmationText.textContent =
                    "Votre demande a bien été reçue. PÔLE MS revient vers vous rapidement.";

            }


            clientBox?.classList.add(
                "hidden"
            );


            needsBox?.classList.add(
                "hidden"
            );


            requestTypeBox?.classList.add(
                "hidden"
            );


            appointmentBox?.classList.add(
                "hidden"
            );


            confirmationBox?.classList.remove(
                "hidden"
            );


            confirmationBox?.scrollIntoView({
                behavior: "smooth"
            });

        }


        /* =================================================
           NOUVELLE DEMANDE
           ================================================= */

        const newRequestBtn =
            document.getElementById(
                "newRequestBtn"
            );


        if (newRequestBtn) {

            newRequestBtn.addEventListener(
                "click",
                function () {

                    window.location.reload();

                }
            );

        }


        /* =================================================
           INITIALISATION
           ================================================= */

        renderCalendar();

        updateSummary();


    }
);