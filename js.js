/* =========================================================
   PÔLE MS — JAVASCRIPT
   Parcours client complet
   Réception des demandes par e-mail
   VERSION AVEC MODIFICATION / SUPPRESSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CONFIGURATION WEB3FORMS
       ===================================================== */

    const WEB3FORMS_ACCESS_KEY =
        "3ff300db-3383-4a44-90a2-238b643d49cb";

    const WEB3FORMS_ENDPOINT =
        "https://api.web3forms.com/submit";


    /* =====================================================
       ÉTAT DU PARCOURS
       ===================================================== */

    const state = {

        pole: null,

        needs: [],

        requestType: null,

        appointment: {
            date: null,
            dateLabel: null,
            time: null
        }

    };


    /* =====================================================
       DONNÉES DES PÔLES
       ===================================================== */

    const services = {

        renovation: {

            title: "Rénovation",

            description:
                "Travaux de rénovation, amélioration, transformation et remise en état.",

            needs: [
                "Peinture",
                "Revêtement de sol",
                "Rénovation intérieure",
                "Rénovation extérieure",
                "Remise en état",
                "Aménagement"
            ]

        },


        paysagiste: {

            title: "Paysagiste",

            description:
                "Création, entretien et aménagement de vos espaces extérieurs.",

            needs: [
                "Entretien espace vert",
                "Création d'espace vert",
                "Plantation",
                "Taille",
                "Aménagement extérieur",
                "Embellissement"
            ]

        },


        vrd: {

            title: "VRD",

            description:
                "Voirie, réseaux divers, terrassement et aménagements extérieurs.",

            needs: [
                "Terrassement",
                "Voirie",
                "Chemin d'accès",
                "Réseau d'eau",
                "Réseau électrique",
                "Assainissement",
                "Aménagement extérieur"
            ]

        },


        menuiserie: {

            title: "Menuiserie",

            description:
                "Pose, remplacement et aménagement de menuiseries.",

            needs: [
                "Porte",
                "Fenêtre",
                "Volet",
                "Menuiserie intérieure",
                "Menuiserie extérieure",
                "Remplacement"
            ]

        },


        sap: {

            title: "Service à la personne",

            description:
                "Services et accompagnement adaptés aux besoins du quotidien.",

            needs: [
                "Accompagnement",
                "Aide administrative",
                "Courses",
                "Aide à domicile",
                "Petit jardinage",
                "Petit bricolage",
                "Autre besoin"
            ]

        }

    };


    /* =====================================================
       ÉLÉMENTS
       ===================================================== */

    const quoteBtn =
        document.getElementById("quoteBtn");

    const selectedPole =
        document.getElementById("selectedPole");

    const needsContainer =
        document.getElementById("needsContainer");

    const selectedNeeds =
        document.getElementById("selectedNeeds");

    const chooseQuoteBtn =
        document.getElementById("chooseQuoteBtn");

    const chooseAppointmentBtn =
        document.getElementById("chooseAppointmentBtn");

    const appointmentBox =
        document.getElementById("appointmentBox");

    const openCalendarBtn =
        document.getElementById("openCalendarBtn");

    const calendarContainer =
        document.getElementById("calendarContainer");

    const calendarMonth =
        document.getElementById("calendarMonth");

    const calendarDays =
        document.getElementById("calendarDays");

    const confirmDateBtn =
        document.getElementById("confirmDateBtn");

    const previousMonth =
        document.getElementById("previousMonth");

    const nextMonth =
        document.getElementById("nextMonth");

    const dateDisplay =
        document.getElementById("dateDisplay");

    const appointmentTime =
        document.getElementById("appointmentTime");

    const appointmentSummary =
        document.getElementById("appointmentSummary");

    const appointmentSummaryText =
        document.getElementById("appointmentSummaryText");

    const editAppointmentBtn =
        document.getElementById("editAppointmentBtn");

    const deleteAppointmentBtn =
        document.getElementById("deleteAppointmentBtn");

    const submitRequestBtn =
        document.getElementById("submitRequestBtn");


    /* =====================================================
       FICHE CLIENT
       ===================================================== */

    const clientName =
        document.getElementById("clientName");

    const clientPhone =
        document.getElementById("clientPhone");

    const clientEmail =
        document.getElementById("clientEmail");

    const clientAddress =
        document.getElementById("clientAddress");

    const clientDescription =
        document.getElementById("clientDescription");


    /* =====================================================
       RÉCAPITULATIF
       ===================================================== */

    const summaryPole =
        document.getElementById("summaryPole");

    const summaryNeeds =
        document.getElementById("summaryNeeds");

    const summaryType =
        document.getElementById("summaryType");

    const summaryDate =
        document.getElementById("summaryDate");

    const summaryTime =
        document.getElementById("summaryTime");


    /* =====================================================
       MODAL
       ===================================================== */

    const modal =
        document.getElementById("serviceModal");

    const closeModalBtn =
        document.getElementById("closeModalBtn");

    const modalSelectBtn =
        document.getElementById("modalSelectBtn");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalList =
        document.getElementById("modalList");


    let currentModalService = null;


    /* =====================================================
       OUTILS
       ===================================================== */

    function scrollToRequest() {

        const requestSection =
            document.getElementById("requestSection");

        if (requestSection) {

            requestSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    /* =====================================================
       RÉCAPITULATIF GLOBAL
       ===================================================== */

    function updateSummary() {

        if (
            summaryPole &&
            state.pole &&
            services[state.pole]
        ) {

            summaryPole.textContent =
                services[state.pole].title;

        } else if (summaryPole) {

            summaryPole.textContent =
                "—";

        }


        if (summaryNeeds) {

            summaryNeeds.innerHTML = "";

            if (state.needs.length === 0) {

                summaryNeeds.textContent =
                    "Aucun besoin sélectionné";

            } else {

                state.needs.forEach(function (need) {

                    const item =
                        document.createElement("div");

                    item.className =
                        "summary-need";

                    item.textContent =
                        need;

                    summaryNeeds.appendChild(item);

                });

            }

        }


        if (summaryType) {

            if (state.requestType === "devis") {

                summaryType.textContent =
                    "Demande de devis";

            } else if (
                state.requestType === "rdv"
            ) {

                summaryType.textContent =
                    "Prise de rendez-vous";

            } else {

                summaryType.textContent =
                    "—";

            }

        }


        if (summaryDate) {

            summaryDate.textContent =
                state.appointment.dateLabel || "—";

        }


        if (summaryTime) {

            summaryTime.textContent =
                state.appointment.time || "—";

        }


        updateRequestTypeActions();

    }


    /* =====================================================
       ACTIONS SUR LE TYPE DE DEMANDE
       ===================================================== */

    function createRequestTypeActions() {

        if (!summaryType) {
            return;
        }


        let container =
            document.getElementById(
                "requestTypeActions"
            );


        if (!container) {

            container =
                document.createElement("div");

            container.id =
                "requestTypeActions";

            container.className =
                "selection-actions";

            summaryType.parentNode.appendChild(
                container
            );

        }


        container.innerHTML = "";


        const editButton =
            document.createElement("button");

        editButton.type =
            "button";

        editButton.className =
            "edit-btn";

        editButton.textContent =
            "Modifier";


        editButton.addEventListener(
            "click",
            function () {

                editRequestType();

            }
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.type =
            "button";

        deleteButton.className =
            "delete-btn";

        deleteButton.textContent =
            "Supprimer";


        deleteButton.addEventListener(
            "click",
            function () {

                deleteRequestType();

            }
        );


        container.appendChild(
            editButton
        );

        container.appendChild(
            deleteButton
        );

    }


    function updateRequestTypeActions() {

        if (!summaryType) {
            return;
        }


        if (!state.requestType) {

            const oldContainer =
                document.getElementById(
                    "requestTypeActions"
                );

            if (oldContainer) {
                oldContainer.remove();
            }

            return;

        }


        createRequestTypeActions();

    }


    function editRequestType() {

        if (state.requestType === "devis") {

            chooseRequestType("rdv");

        } else if (
            state.requestType === "rdv"
        ) {

            chooseRequestType("devis");

        } else {

            chooseRequestType("devis");

        }

        updateSummary();

    }


    function deleteRequestType() {

        state.requestType =
            null;


        chooseQuoteBtn?.classList.remove(
            "active"
        );

        chooseAppointmentBtn?.classList.remove(
            "active"
        );


        if (appointmentBox) {

            appointmentBox.classList.add(
                "hidden"
            );

        }


        resetAppointment();


        updateSummary();

    }


    /* =====================================================
       SÉLECTION DU PÔLE
       ===================================================== */

    function selectPole(serviceName) {

        if (!services[serviceName]) {
            return;
        }


        state.pole =
            serviceName;

        state.needs = [];

        state.requestType =
            null;

        state.appointment = {
            date: null,
            dateLabel: null,
            time: null
        };


        if (selectedPole) {

            selectedPole.classList.remove(
                "empty"
            );

            selectedPole.textContent =
                services[serviceName].title;

        }


        renderNeeds();

        renderSelectedNeeds();

        resetAppointment();

        updateSummary();

        scrollToRequest();

    }


    /* =====================================================
       BESOINS
       ===================================================== */

    function renderNeeds() {

        if (!needsContainer) {
            return;
        }


        needsContainer.innerHTML = "";


        if (!state.pole) {

            needsContainer.innerHTML =
                "<p>Sélectionnez d'abord un pôle.</p>";

            return;

        }


        const service =
            services[state.pole];


        service.needs.forEach(function (need) {

            const button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "need-btn";

            button.textContent =
                need;


            if (state.needs.includes(need)) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    toggleNeed(need);

                }
            );


            needsContainer.appendChild(
                button
            );

        });

    }


    function toggleNeed(need) {

        const index =
            state.needs.indexOf(need);


        if (index === -1) {

            state.needs.push(need);

        } else {

            state.needs.splice(
                index,
                1
            );

        }


        renderNeeds();

        renderSelectedNeeds();

        updateSummary();

    }


    function renderSelectedNeeds() {

        if (!selectedNeeds) {
            return;
        }


        selectedNeeds.innerHTML = "";


        if (state.needs.length === 0) {

            selectedNeeds.innerHTML =
                "<p class='small-text'>Aucun besoin sélectionné.</p>";

            return;

        }


        state.needs.forEach(
            function (need, index) {

                const item =
                    document.createElement("div");

                item.className =
                    "selected-item";


                const name =
                    document.createElement("span");

                name.textContent =
                    need;


                const actions =
                    document.createElement("div");

                actions.className =
                    "selection-actions";


                const edit =
                    document.createElement("button");

                edit.type =
                    "button";

                edit.className =
                    "edit-btn";

                edit.textContent =
                    "Modifier";


                edit.addEventListener(
                    "click",
                    function () {

                        editNeed(index);

                    }
                );


                const remove =
                    document.createElement("button");

                remove.type =
                    "button";

                remove.className =
                    "delete-btn";

                remove.textContent =
                    "Supprimer";


                remove.addEventListener(
                    "click",
                    function () {

                        removeNeed(index);

                    }
                );


                actions.appendChild(
                    edit
                );

                actions.appendChild(
                    remove
                );

                item.appendChild(
                    name
                );

                item.appendChild(
                    actions
                );

                selectedNeeds.appendChild(
                    item
                );

            }
        );

    }


    function removeNeed(index) {

        if (
            index < 0 ||
            index >= state.needs.length
        ) {

            return;

        }


        state.needs.splice(
            index,
            1
        );


        renderNeeds();

        renderSelectedNeeds();

        updateSummary();

    }


    /* =====================================================
       MODIFIER UN BESOIN
       ===================================================== */

    function editNeed(index) {

        if (
            index < 0 ||
            index >= state.needs.length
        ) {

            return;

        }


        if (!state.pole) {
            return;
        }


        const oldNeed =
            state.needs[index];


        const available =
            services[state.pole].needs
                .filter(function (need) {

                    return (
                        !state.needs.includes(need) ||
                        need === oldNeed
                    );

                });


        if (available.length === 0) {

            alert(
                "Aucun autre besoin disponible pour remplacer celui-ci."
            );

            return;

        }


        let message =
            "Modifier le besoin actuel :\n\n" +
            oldNeed +
            "\n\n" +
            "Choisissez le nouveau besoin :\n\n";


        available.forEach(
            function (need, optionIndex) {

                message +=
                    (optionIndex + 1) +
                    " - " +
                    need +
                    "\n";

            }
        );


        message +=
            "\nEntrez le numéro correspondant au nouveau besoin.";


        const choice =
            prompt(
                message,
                ""
            );


        if (choice === null) {

            return;

        }


        const number =
            Number(
                choice.trim()
            );


        if (
            !Number.isInteger(number) ||
            number < 1 ||
            number > available.length
        ) {

            alert(
                "Choix invalide.\n\nVeuillez entrer le numéro correspondant à un besoin proposé."
            );

            return;

        }


        const newNeed =
            available[number - 1];


        const confirmed =
            confirm(
                "Confirmer la modification ?\n\n" +
                oldNeed +
                "  →  " +
                newNeed
            );


        if (!confirmed) {

            return;

        }


        state.needs[index] =
            newNeed;


        renderNeeds();

        renderSelectedNeeds();

        updateSummary();


        alert(
            "Le besoin a été modifié.\n\n" +
            oldNeed +
            " → " +
            newNeed
        );

    }


    /* =====================================================
       TYPE DE DEMANDE
       ===================================================== */

    function chooseRequestType(type) {

        if (state.needs.length === 0) {

            alert(
                "Veuillez sélectionner au moins un besoin."
            );

            return;

        }


        if (
            type !== "devis" &&
            type !== "rdv"
        ) {

            return;

        }


        state.requestType =
            type;


        if (chooseQuoteBtn) {

            chooseQuoteBtn.classList.toggle(
                "active",
                type === "devis"
            );

        }


        if (chooseAppointmentBtn) {

            chooseAppointmentBtn.classList.toggle(
                "active",
                type === "rdv"
            );

        }


        if (type === "rdv") {

            if (appointmentBox) {

                appointmentBox.classList.remove(
                    "hidden"
                );

            }

        } else {

            if (appointmentBox) {

                appointmentBox.classList.add(
                    "hidden"
                );

            }


            resetAppointment();

        }


        updateSummary();

    }


    if (chooseQuoteBtn) {

        chooseQuoteBtn.addEventListener(
            "click",
            function () {

                chooseRequestType(
                    "devis"
                );

            }
        );

    }


    if (chooseAppointmentBtn) {

        chooseAppointmentBtn.addEventListener(
            "click",
            function () {

                chooseRequestType(
                    "rdv"
                );

            }
        );

    }


    /* =====================================================
       CALENDRIER
       ===================================================== */

    let calendarDate =
        new Date();

    let temporaryDate =
        null;


    function formatDate(date) {

        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const year =
            date.getFullYear();


        return (
            day +
            "/" +
            month +
            "/" +
            year
        );

    }


    function dateKey(date) {

        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        return (
            year +
            "-" +
            month +
            "-" +
            day
        );

    }


    /* =====================================================
       NOUVELLE FONCTION :
       AFFICHAGE FORCÉ DU BOUTON CONFIRMER
       ===================================================== */

    function showConfirmDateButton() {

        if (!confirmDateBtn) {
            return;
        }


        confirmDateBtn.classList.remove(
            "hidden"
        );


        /*
         * On force l'affichage même si une règle
         * CSS empêche actuellement le bouton
         * d'apparaître.
         */

        confirmDateBtn.style.setProperty(
            "display",
            "inline-flex",
            "important"
        );


        confirmDateBtn.style.setProperty(
            "visibility",
            "visible",
            "important"
        );


        confirmDateBtn.style.setProperty(
            "opacity",
            "1",
            "important"
        );


        confirmDateBtn.style.setProperty(
            "pointer-events",
            "auto",
            "important"
        );


        confirmDateBtn.disabled =
            false;

    }


    /* =====================================================
       MASQUER LE BOUTON CONFIRMER
       ===================================================== */

    function hideConfirmDateButton() {

        if (!confirmDateBtn) {
            return;
        }


        confirmDateBtn.classList.add(
            "hidden"
        );


        confirmDateBtn.style.removeProperty(
            "display"
        );


        confirmDateBtn.style.removeProperty(
            "visibility"
        );


        confirmDateBtn.style.removeProperty(
            "opacity"
        );


        confirmDateBtn.style.removeProperty(
            "pointer-events"
        );

    }


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
            calendarDate.getFullYear();


        const month =
            calendarDate.getMonth();


        const monthName =
            calendarDate.toLocaleDateString(
                "fr-FR",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        calendarMonth.textContent =
            monthName.charAt(0).toUpperCase() +
            monthName.slice(1);


        const firstDay =
            new Date(
                year,
                month,
                1
            );


        let startDay =
            firstDay.getDay();


        if (startDay === 0) {

            startDay = 7;

        }


        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        for (
            let i = 1;
            i < startDay;
            i++
        ) {

            const empty =
                document.createElement(
                    "div"
                );

            calendarDays.appendChild(
                empty
            );

        }


        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const date =
                new Date(
                    year,
                    month,
                    day
                );


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


            if (date < today) {

                button.classList.add(
                    "disabled"
                );


                button.disabled =
                    true;

            }


            if (
                temporaryDate &&
                dateKey(date) ===
                dateKey(temporaryDate)
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    temporaryDate =
                        date;


                    renderCalendar();


                    /*
                     * CORRECTION :
                     * Le bouton de confirmation
                     * devient immédiatement visible.
                     */

                    showConfirmDateButton();

                }
            );


            calendarDays.appendChild(
                button
            );

        }


        /*
         * Si une date temporaire existe déjà
         * pendant une modification de rendez-vous,
         * le bouton reste visible.
         */

        if (temporaryDate) {

            showConfirmDateButton();

        } else {

            hideConfirmDateButton();

        }

    }


    if (openCalendarBtn) {

        openCalendarBtn.addEventListener(
            "click",
            function () {

                if (!calendarContainer) {
                    return;
                }


                calendarContainer.classList.toggle(
                    "hidden"
                );


                if (
                    !calendarContainer.classList.contains(
                        "hidden"
                    )
                ) {

                    renderCalendar();

                }

            }
        );

    }


    if (previousMonth) {

        previousMonth.addEventListener(
            "click",
            function () {

                calendarDate.setMonth(
                    calendarDate.getMonth() - 1
                );


                renderCalendar();

            }
        );

    }


    if (nextMonth) {

        nextMonth.addEventListener(
            "click",
            function () {

                calendarDate.setMonth(
                    calendarDate.getMonth() + 1
                );


                renderCalendar();

            }
        );

    }


    /* =====================================================
       CONFIRMATION DATE
       ===================================================== */

    if (confirmDateBtn) {

        confirmDateBtn.addEventListener(
            "click",
            function () {

                if (!temporaryDate) {

                    alert(
                        "Veuillez sélectionner une date."
                    );

                    return;

                }


                state.appointment.date =
                    dateKey(
                        temporaryDate
                    );


                state.appointment.dateLabel =
                    formatDate(
                        temporaryDate
                    );


                if (calendarContainer) {

                    calendarContainer.classList.add(
                        "hidden"
                    );

                }


                hideConfirmDateButton();


                if (dateDisplay) {

                    dateDisplay.textContent =
                        state.appointment.dateLabel;

                }


                updateAppointmentSummary();

                updateSummary();

            }
        );

    }


    /* =====================================================
       HORAIRE
       ===================================================== */

    if (appointmentTime) {

        appointmentTime.addEventListener(
            "change",
            function () {

                state.appointment.time =
                    appointmentTime.value ||
                    null;


                updateAppointmentSummary();

                updateSummary();

            }
        );

    }


    /* =====================================================
       RÉCAPITULATIF RDV
       ===================================================== */

    function updateAppointmentSummary() {

        if (
            !appointmentSummary ||
            !appointmentSummaryText
        ) {

            return;

        }


        if (
            state.appointment.dateLabel &&
            state.appointment.time
        ) {

            appointmentSummary.classList.remove(
                "hidden"
            );


            appointmentSummaryText.textContent =
                state.appointment.dateLabel +
                " à " +
                state.appointment.time;

        } else {

            appointmentSummary.classList.add(
                "hidden"
            );


            appointmentSummaryText.textContent =
                "";

        }

    }


    /* =====================================================
       MODIFIER RDV
       ===================================================== */

    if (editAppointmentBtn) {

        editAppointmentBtn.addEventListener(
            "click",
            function () {

                if (!calendarContainer) {
                    return;
                }


                calendarContainer.classList.remove(
                    "hidden"
                );


                if (
                    state.appointment.date
                ) {

                    const parts =
                        state.appointment.date
                            .split("-");


                    temporaryDate =
                        new Date(
                            Number(parts[0]),
                            Number(parts[1]) - 1,
                            Number(parts[2])
                        );


                    calendarDate =
                        new Date(
                            temporaryDate
                        );

                }


                renderCalendar();


                /*
                 * Le bouton est explicitement rendu
                 * visible lorsqu'on modifie un RDV.
                 */

                if (temporaryDate) {

                    showConfirmDateButton();

                }

            }
        );

    }


    /* =====================================================
       SUPPRIMER RDV
       ===================================================== */

    if (deleteAppointmentBtn) {

        deleteAppointmentBtn.addEventListener(
            "click",
            function () {

                state.appointment = {

                    date: null,

                    dateLabel: null,

                    time: null

                };


                temporaryDate =
                    null;


                if (dateDisplay) {

                    dateDisplay.textContent =
                        "Choisir une date";

                }


                if (appointmentTime) {

                    appointmentTime.value =
                        "";

                }


                if (appointmentSummary) {

                    appointmentSummary.classList.add(
                        "hidden"
                    );

                }


                if (calendarContainer) {

                    calendarContainer.classList.add(
                        "hidden"
                    );

                }


                hideConfirmDateButton();


                updateSummary();

            }
        );

    }


    /* =====================================================
       RESET RDV
       ===================================================== */

    function resetAppointment() {

        state.appointment = {

            date: null,

            dateLabel: null,

            time: null

        };


        temporaryDate =
            null;


        if (dateDisplay) {

            dateDisplay.textContent =
                "Choisir une date";

        }


        if (appointmentTime) {

            appointmentTime.value =
                "";

        }


        if (calendarContainer) {

            calendarContainer.classList.add(
                "hidden"
            );

        }


        if (appointmentSummary) {

            appointmentSummary.classList.add(
                "hidden"
            );

        }


        if (appointmentSummaryText) {

            appointmentSummaryText.textContent =
                "";

        }


        hideConfirmDateButton();

    }


    /* =====================================================
       MODAL SERVICES
       ===================================================== */

    function openService(serviceName) {

        if (
            !services[serviceName] ||
            !modal
        ) {

            return;

        }


        currentModalService =
            serviceName;


        const service =
            services[serviceName];


        if (modalTitle) {

            modalTitle.textContent =
                service.title;

        }


        if (modalDescription) {

            modalDescription.textContent =
                service.description;

        }


        if (modalList) {

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

        }


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    document.querySelectorAll(
        ".service-btn"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const service =
                        button.getAttribute(
                            "data-service"
                        );


                    openService(
                        service
                    );

                }
            );

        }
    );


    if (modalSelectBtn) {

        modalSelectBtn.addEventListener(
            "click",
            function () {

                if (
                    currentModalService
                ) {

                    selectPole(
                        currentModalService
                    );

                }


                closeModal();

            }
        );

    }


    if (closeModalBtn) {

        closeModalBtn.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       BOUTON ACCUEIL
       ===================================================== */

    if (quoteBtn) {

        quoteBtn.addEventListener(
            "click",
            function () {

                scrollToRequest();

            }
        );

    }


    /* =====================================================
       ENVOI RÉEL DE LA DEMANDE
       ===================================================== */

    if (submitRequestBtn) {

        submitRequestBtn.addEventListener(
            "click",
            async function () {

                /* -----------------------------------------
                   VALIDATIONS
                   ----------------------------------------- */

                if (!state.pole) {

                    alert(
                        "Veuillez sélectionner un pôle."
                    );

                    return;

                }


                if (
                    state.needs.length === 0
                ) {

                    alert(
                        "Veuillez sélectionner au moins un besoin."
                    );

                    return;

                }


                if (
                    !clientName ||
                    !clientName.value.trim()
                ) {

                    alert(
                        "Veuillez renseigner votre nom et prénom."
                    );


                    if (clientName) {
                        clientName.focus();
                    }


                    return;

                }


                if (
                    !clientPhone ||
                    !clientPhone.value.trim()
                ) {

                    alert(
                        "Veuillez renseigner votre numéro de téléphone."
                    );


                    if (clientPhone) {
                        clientPhone.focus();
                    }


                    return;

                }


                if (!state.requestType) {

                    alert(
                        "Veuillez choisir entre une demande de devis et un rendez-vous."
                    );

                    return;

                }


                if (
                    state.requestType === "rdv"
                ) {

                    if (
                        !state.appointment.date
                    ) {

                        alert(
                            "Veuillez sélectionner et confirmer une date de rendez-vous."
                        );

                        return;

                    }


                    if (
                        !state.appointment.time
                    ) {

                        alert(
                            "Veuillez sélectionner un horaire de rendez-vous."
                        );

                        return;

                    }

                }


                /* -----------------------------------------
                   CONSTRUCTION DE LA DEMANDE
                   ----------------------------------------- */

                const requestData = {

                    client: {

                        name:
                            clientName.value.trim(),

                        phone:
                            clientPhone.value.trim(),

                        email:
                            clientEmail
                                ? clientEmail.value.trim()
                                : "",

                        address:
                            clientAddress
                                ? clientAddress.value.trim()
                                : "",

                        description:
                            clientDescription
                                ? clientDescription.value.trim()
                                : ""

                    },


                    pole:
                        state.pole
                            ? services[
                                state.pole
                            ].title
                            : null,


                    needs:
                        [
                            ...state.needs
                        ],


                    requestType:
                        state.requestType,


                    appointment: {

                        date:
                            state.appointment.date,

                        dateLabel:
                            state.appointment.dateLabel,

                        time:
                            state.appointment.time

                    }

                };


                /* -----------------------------------------
                   DONNÉES WEB3FORMS
                   ----------------------------------------- */

                const web3FormsData = {

                    access_key:
                        WEB3FORMS_ACCESS_KEY,


                    subject:
                        "Nouvelle demande PÔLE MS — " +
                        (
                            state.requestType === "rdv"
                                ? "Rendez-vous"
                                : "Demande de devis"
                        ),


                    from_name:
                        "Site PÔLE MS",


                    email:
                        requestData.client.email,


                    client_name:
                        requestData.client.name,


                    client_phone:
                        requestData.client.phone,


                    client_email:
                        requestData.client.email,


                    client_address:
                        requestData.client.address,


                    pole:
                        requestData.pole,


                    needs:
                        requestData.needs.join(
                            " | "
                        ),


                    request_type:
                        requestData.requestType === "rdv"
                            ? "Prise de rendez-vous"
                            : "Demande de devis",


                    appointment_date:
                        requestData.appointment.dateLabel ||
                        "—",


                    appointment_time:
                        requestData.appointment.time ||
                        "—",


                    description:
                        requestData.client.description ||
                        "Aucune description",


                    request_details:
                        JSON.stringify(
                            requestData,
                            null,
                            2
                        )

                };


                /* -----------------------------------------
                   PROTECTION DOUBLE ENVOI
                   ----------------------------------------- */

                const originalButtonText =
                    submitRequestBtn.textContent;


                submitRequestBtn.disabled =
                    true;


                submitRequestBtn.textContent =
                    "Envoi en cours...";


                try {

                    /* -------------------------------------
                       ENVOI WEB3FORMS
                       ------------------------------------- */

                    const response =
                        await fetch(
                            WEB3FORMS_ENDPOINT,
                            {

                                method:
                                    "POST",


                                headers: {

                                    "Content-Type":
                                        "application/json",


                                    "Accept":
                                        "application/json"

                                },


                                body:
                                    JSON.stringify(
                                        web3FormsData
                                    )

                            }
                        );


                    const result =
                        await response.json();


                    console.log(
                        "RÉPONSE WEB3FORMS",
                        result
                    );


                    /* -------------------------------------
                       SUCCÈS
                       ------------------------------------- */

                    if (
                        response.ok &&
                        result.success
                    ) {

                        console.log(
                            "DEMANDE PÔLE MS ENVOYÉE",
                            requestData
                        );


                        alert(
                            "Merci " +
                            requestData.client.name +
                            " !\n\n" +
                            "Votre demande a bien été envoyée à Pôle MS.\n\n" +
                            "Nous vous recontacterons au 0690 08 34 07."
                        );


                    } else {

                        console.error(
                            "ERREUR WEB3FORMS",
                            result
                        );


                        alert(
                            "La demande n'a pas pu être envoyée.\n\n" +
                            "Veuillez vérifier votre connexion internet " +
                            "et réessayer."
                        );

                    }

                } catch (error) {

                    console.error(
                        "ERREUR RÉSEAU WEB3FORMS",
                        error
                    );


                    alert(
                        "Une erreur est survenue pendant l'envoi.\n\n" +
                        "Veuillez vérifier votre connexion internet " +
                        "et réessayer."
                    );

                } finally {

                    /* -------------------------------------
                       RÉACTIVATION DU BOUTON
                       ------------------------------------- */

                    submitRequestBtn.disabled =
                        false;


                    submitRequestBtn.textContent =
                        originalButtonText;

                }

            }
        );

    }


    /* =====================================================
       INITIALISATION
       ===================================================== */

    renderNeeds();

    renderSelectedNeeds();

    updateSummary();


    console.log(
        "Pôle MS — parcours client chargé."
    );

});