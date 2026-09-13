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
    "https://script.google.com/macros/s/AKfycbxlNuKEESp4Ylz5UmjCPivfJpTEo_8vj8tTO7IDLXp51gsTVBWpCHnSP6B3c1qOYKdT/exec";


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
   SYNCHRONISATION GOOGLE SHEETS
   ================================================= */

try {

    const iframe =
        document.createElement("iframe");

    iframe.name =
        "poleMsSheetsFrame";

    iframe.style.display =
        "none";

    document.body.appendChild(
        iframe
    );


    const formSheets =
        document.createElement("form");

    formSheets.method =
        "POST";

    formSheets.action =
        GOOGLE_SHEETS_ENDPOINT;

    formSheets.target =
        "poleMsSheetsFrame";

    formSheets.style.display =
        "none";


    Object.entries(
        ficheClient
    ).forEach(
        function ([nom, valeur]) {

            const input =
                document.createElement("input");

            input.type =
                "hidden";

            input.name =
                nom;

            input.value =
                valeur || "";

            formSheets.appendChild(
                input
            );
        }
    );


    document.body.appendChild(
        formSheets
    );


    formSheets.submit();


    console.log(
        "Demande de création de fiche client envoyée à Google Sheets."
    );


    setTimeout(
        function () {

            formSheets.remove();
            iframe.remove();

        },
        5000
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

/* =========================================================
   INFORMATIONS JURIDIQUES — FENÊTRE
   ========================================================= */

const legalModal = document.getElementById("legalModal");
const legalModalTitle = document.getElementById("legalModalTitle");
const legalModalBody = document.getElementById("legalModalBody");
const legalModalClose = document.getElementById("legalModalClose");

const legalContent = {
    mentions: {
        title: "Mentions légales",
        body: `
            <h3>Éditeur du site</h3>
            <p><strong>PÔLE MS</strong> — Pôle Multi Service</p>
            <p>Forme juridique : SAS — Société en cours de constitution</p>
            <p>SIRET : en cours</p>
            <p>Siège social : à compléter</p>
            <p>E-mail : <a href="mailto:polesmscaraibes@gmail.com">polesmscaraibes@gmail.com</a></p>
            <p>Téléphone : 06 90 08 34 07</p>
            <h3>Directeur de la publication</h3>
            <p>À compléter lors de la finalisation de l'immatriculation de la société.</p>
            <h3>Hébergement</h3>
            <p>Site actuellement hébergé via GitHub Pages pour la version de test. Les coordonnées définitives de l'hébergeur et du domaine seront complétées lors de la mise en ligne définitive.</p>
        `
    },
    confidentialite: {
        title: "Politique de confidentialité",
        body: `
            <p>PÔLE MS respecte la vie privée des utilisateurs et traite les données personnelles conformément à la réglementation applicable, notamment au RGPD.</p>
            <h3>Données collectées</h3>
            <p>Lors d'une demande effectuée sur le site, PÔLE MS peut collecter notamment le nom et prénom, le numéro de téléphone, l'adresse e-mail, l'adresse ou le lieu d'intervention, les informations communiquées dans la description du projet, les informations relatives au rendez-vous et, lorsque l'utilisateur choisit d'en joindre une, une photographie.</p>
            <h3>Finalités</h3>
            <p>Ces données sont utilisées pour recevoir et traiter les demandes, contacter l'utilisateur, préparer un devis ou un rendez-vous, assurer le suivi de la demande et organiser la mise en relation avec la solution ou le professionnel adapté lorsque cela est nécessaire.</p>
            <h3>Base juridique</h3>
            <p>Le traitement est réalisé, selon le cas, pour répondre à une demande de l'utilisateur, prendre des mesures précontractuelles à sa demande, exécuter une relation contractuelle lorsqu'elle existe, respecter une obligation légale ou poursuivre un intérêt légitime de PÔLE MS dans la gestion de son activité.</p>
            <h3>Destinataires</h3>
            <p>Les données sont accessibles uniquement aux personnes et prestataires qui en ont besoin pour traiter la demande. Lorsque la prestation nécessite l'intervention ou la mise en relation avec un professionnel partenaire, seules les informations nécessaires à cette mise en relation peuvent être transmises.</p>
            <h3>Durée de conservation</h3>
            <p>Les données sont conservées pendant la durée nécessaire au traitement de la demande et, lorsqu'une relation commerciale est établie, pendant les durées nécessaires au respect des obligations légales.</p>
            <h3>Vos droits</h3>
            <p>Vous pouvez demander l'accès, la rectification, l'effacement, la limitation du traitement ou, lorsque les conditions sont réunies, vous opposer au traitement et demander la portabilité de vos données. Vous pouvez exercer vos droits à l'adresse <a href="mailto:polesmscaraibes@gmail.com">polesmscaraibes@gmail.com</a>. Vous pouvez également introduire une réclamation auprès de la CNIL.</p>
            <h3>Photos transmises</h3>
            <p>Les photographies jointes à une demande doivent être transmises uniquement lorsque l'utilisateur est autorisé à les communiquer. Il est recommandé de ne pas envoyer de document ou d'image contenant des informations sensibles ou inutiles au traitement de la demande.</p>
        `
    },
    cgu: {
        title: "Conditions Générales d'Utilisation",
        body: `
            <h3>Objet</h3>
            <p>Les présentes CGU encadrent l'accès et l'utilisation du site PÔLE MS. Le site présente les services proposés et permet à l'utilisateur de transmettre une demande de devis ou de rendez-vous.</p>
            <h3>Utilisation du service</h3>
            <p>L'utilisateur s'engage à fournir des informations exactes, à utiliser le formulaire de manière loyale et à ne pas transmettre de contenu illicite, frauduleux ou portant atteinte aux droits de tiers.</p>
            <h3>Demandes et rendez-vous</h3>
            <p>L'envoi d'une demande via le site ne constitue pas, à lui seul, l'acceptation d'un devis ni la conclusion d'un contrat. Toute prestation est susceptible de faire l'objet d'un devis, d'une confirmation de rendez-vous ou d'un contrat distinct.</p>
            <h3>Mise en relation</h3>
            <p>Lorsque PÔLE MS oriente l'utilisateur vers un professionnel ou une solution adaptée, les conditions propres à la prestation concernée peuvent être définies directement avec le professionnel intervenant.</p>
            <h3>Disponibilité</h3>
            <p>PÔLE MS s'efforce de maintenir un site accessible et fonctionnel, sans garantir une disponibilité permanente. Des opérations de maintenance ou des incidents techniques peuvent temporairement interrompre le service.</p>
            <h3>Propriété intellectuelle</h3>
            <p>Les textes, éléments graphiques, logo, structure et contenus du site sont protégés par les règles applicables à la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite.</p>
            <h3>Modification des CGU</h3>
            <p>PÔLE MS peut faire évoluer les présentes CGU lorsque cela est nécessaire. La version publiée sur le site est la version applicable.</p>
        `
    },
    cookies: {
        title: "Politique relative aux cookies",
        body: `
            <p>À ce jour, la version du site ne met pas en place de cookies publicitaires ni de dispositif de mesure d'audience propre à PÔLE MS.</p>
            <p>Le site utilise toutefois des services techniques ou contenus fournis par des tiers, notamment pour l'envoi des demandes et l'affichage de certaines images. Ces services peuvent effectuer leurs propres traitements techniques conformément à leurs politiques respectives.</p>
            <p>Si PÔLE MS ajoute ultérieurement des cookies ou traceurs nécessitant un consentement, cette politique sera mise à jour et un mécanisme de gestion des préférences sera ajouté lorsque nécessaire.</p>
        `
    }
};

document.querySelectorAll("[data-legal]").forEach(function (button) {
    button.addEventListener("click", function () {
        const content = legalContent[button.dataset.legal];
        if (!content || !legalModal) return;
        legalModalTitle.textContent = content.title;
        legalModalBody.innerHTML = content.body;
        legalModal.classList.add("active");
        legalModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

function closeLegalModal() {
    if (!legalModal) return;
    legalModal.classList.remove("active");
    legalModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

legalModalClose?.addEventListener("click", closeLegalModal);
legalModal?.querySelector("[data-legal-close]")?.addEventListener("click", closeLegalModal);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLegalModal();
});
