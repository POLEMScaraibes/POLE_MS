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
                    "Second œuvre",
                    "Peinture",
                    "Plomberie",
                    "Électricité",
                    "Menuiserie",
                    "Aménagement intérieur"
                ]

            },


            exterieur: {

                title:
                    "Extérieur & VRD",

                description:
                    "Aménagement, entretien et travaux extérieurs.",

                needs: [
                    "Terrassement",
                    "VRD",
                    "Paysagiste",
                    "Espaces verts",
                    "Entretien extérieur",
                    "Clôture",
                    "Aménagement extérieur"
                ]

            },


            transport: {

                title:
                    "Mobilité & Transport",

                description:
                    "Solutions de transport, livraison et mobilité.",

                needs: [
                    "Transport",
                    "Livraison",
                    "Débarras",
                    "Encombrants",
                    "Transport de personnes",
                    "Taxi"
                ]

            },


            personne: {

                title:
                    "Services à la personne",

                description:
                    "Accompagnement et services adaptés au quotidien.",

                needs: [
                    "Aide à domicile",
                    "Accompagnement",
                    "Assistance du quotidien",
                    "Petits travaux",
                    "Services de proximité"
                ]

            },


            maintenance: {

                title:
                    "Maintenance & Dépannage",

                description:
                    "Entretien, maintenance, dépannage et remise en état.",

                needs: [
                    "Entretien",
                    "Maintenance",
                    "Dépannage",
                    "Remise en état",
                    "Intervention rapide"
                ]

            }

        };


        /* =================================================
           ÉTAT
           ================================================= */

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


        /* =================================================
           ÉLÉMENTS
           ================================================= */

        const requestSection =
            document.getElementById(
                "requestSection"
            );

        const quoteBtn =
            document.getElementById(
                "quoteBtn"
            );

        const selectedPole =
            document.getElementById(
                "selectedPole"
            );

        const needsContainer =
            document.getElementById(
                "needsContainer"
            );

        const selectedNeeds =
            document.getElementById(
                "selectedNeeds"
            );

        const chooseQuoteBtn =
            document.getElementById(
                "chooseQuoteBtn"
            );

        const chooseAppointmentBtn =
            document.getElementById(
                "chooseAppointmentBtn"
            );

        const appointmentBox =
            document.getElementById(
                "appointmentBox"
            );

        const openCalendarBtn =
            document.getElementById(
                "openCalendarBtn"
            );

        const calendarContainer =
            document.getElementById(
                "calendarContainer"
            );

        const calendarMonth =
            document.getElementById(
                "calendarMonth"
            );

        const calendarDays =
            document.getElementById(
                "calendarDays"
            );

        const previousMonth =
            document.getElementById(
                "previousMonth"
            );

        const nextMonth =
            document.getElementById(
                "nextMonth"
            );

        const confirmDateBtn =
            document.getElementById(
                "confirmDateBtn"
            );

        const dateDisplay =
            document.getElementById(
                "dateDisplay"
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

        const editAppointmentBtn =
            document.getElementById(
                "editAppointmentBtn"
            );

        const deleteAppointmentBtn =
            document.getElementById(
                "deleteAppointmentBtn"
            );


        /* =================================================
           CLIENT
           ================================================= */

        const clientBox =
            document.getElementById(
                "clientBox"
            );

        const clientName =
            document.getElementById(
                "clientName"
            );

        const clientPhone =
            document.getElementById(
                "clientPhone"
            );

        const clientEmail =
            document.getElementById(
                "clientEmail"
            );

        const clientAddress =
            document.getElementById(
                "clientAddress"
            );

        const clientDescription =
            document.getElementById(
                "clientDescription"
            );

        const clientPhoto =
            document.getElementById(
                "clientPhoto"
            );

        const submitRequestBtn =
            document.getElementById(
                "submitRequestBtn"
            );


        /* =================================================
           RÉCAP
           ================================================= */

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


        /* =================================================
           CONFIRMATION
           ================================================= */

        const confirmationBox =
            document.getElementById(
                "confirmationBox"
            );

        const confirmationText =
            document.getElementById(
                "confirmationText"
            );

        const newRequestBtn =
            document.getElementById(
                "newRequestBtn"
            );


        /* =================================================
           MODAL
           ================================================= */

        const modal =
            document.getElementById(
                "serviceModal"
            );

        const closeModalBtn =
            document.getElementById(
                "closeModalBtn"
            );

        const modalSelectBtn =
            document.getElementById(
                "modalSelectBtn"
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


        let currentModalService =
            null;


        /* =================================================
           CALENDRIER
           ================================================= */

        let calendarDate =
            new Date();

        let temporaryDate =
            null;


        /* =================================================
           OUTILS
           ================================================= */

        function scrollToRequest() {

            if (!requestSection) {
                return;
            }

            requestSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        function formatDate(date) {

            if (!date) {
                return "";
            }

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


        /* =================================================
           RÉCAPITULATIF
           ================================================= */

        function updateSummary() {

            if (
                summaryPole &&
                state.pole
            ) {

                summaryPole.textContent =
                    services[
                        state.pole
                    ].title;

            } else if (summaryPole) {

                summaryPole.textContent =
                    "—";

            }


            if (summaryNeeds) {

                summaryNeeds.innerHTML =
                    "";

                if (
                    state.needs.length === 0
                ) {

                    summaryNeeds.textContent =
                        "Aucun besoin sélectionné";

                } else {

                    state.needs.forEach(
                        function (need) {

                            const item =
                                document.createElement(
                                    "span"
                                );

                            item.className =
                                "summary-need";

                            item.textContent =
                                need;

                            summaryNeeds.appendChild(
                                item
                            );

                        }
                    );

                }

            }


            if (summaryType) {

                if (
                    state.requestType ===
                    "devis"
                ) {

                    summaryType.textContent =
                        "Demande de devis";

                }

                else if (
                    state.requestType ===
                    "rdv"
                ) {

                    summaryType.textContent =
                        "Prise de rendez-vous";

                }

                else {

                    summaryType.textContent =
                        "—";

                }

            }


            if (summaryDate) {

                summaryDate.textContent =
                    state.appointment.dateLabel ||
                    "—";

            }


            if (summaryTime) {

                summaryTime.textContent =
                    state.appointment.time ||
                    "—";

            }

        }


        /* =================================================
           SÉLECTION DU PÔLE
           ================================================= */

        function selectPole(serviceName) {

            if (
                !services[serviceName]
            ) {
                return;
            }


            state.pole =
                serviceName;

            state.needs =
                [];

            state.requestType =
                null;

            resetAppointment();


            selectedPole.classList.remove(
                "empty"
            );


            selectedPole.textContent =
                services[
                    serviceName
                ].title;


            renderNeeds();

            renderSelectedNeeds();

            updateSummary();

            scrollToRequest();

        }


        /* =================================================
           BESOINS
           ================================================= */

        function renderNeeds() {

            if (!needsContainer) {
                return;
            }


            needsContainer.innerHTML =
                "";


            if (!state.pole) {

                needsContainer.innerHTML =
                    "<p>Sélectionnez d'abord un pôle.</p>";

                return;

            }


            services[
                state.pole
            ].needs.forEach(
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
                        state.needs.includes(
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

        }


        function toggleNeed(need) {

            const index =
                state.needs.indexOf(
                    need
                );


            if (
                index === -1
            ) {

                state.needs.push(
                    need
                );

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


            selectedNeeds.innerHTML =
                "";


            if (
                state.needs.length === 0
            ) {

                selectedNeeds.innerHTML =
                    "<p>Aucun besoin sélectionné.</p>";

                return;

            }


            state.needs.forEach(
                function (need, index) {

                    const row =
                        document.createElement(
                            "div"
                        );

                    row.className =
                        "selected-item";


                    const name =
                        document.createElement(
                            "span"
                        );

                    name.textContent =
                        need;


                    const actions =
                        document.createElement(
                            "div"
                        );

                    actions.className =
                        "selection-actions";


                    const edit =
                        document.createElement(
                            "button"
                        );

                    edit.type =
                        "button";

                    edit.className =
                        "edit-btn";

                    edit.textContent =
                        "Modifier";


                    edit.addEventListener(
                        "click",
                        function () {

                            editNeed(
                                index
                            );

                        }
                    );


                    const remove =
                        document.createElement(
                            "button"
                        );

                    remove.type =
                        "button";

                    remove.className =
                        "delete-btn";

                    remove.textContent =
                        "Supprimer";


                    remove.addEventListener(
                        "click",
                        function () {

                            removeNeed(
                                index
                            );

                        }
                    );


                    actions.appendChild(
                        edit
                    );

                    actions.appendChild(
                        remove
                    );

                    row.appendChild(
                        name
                    );

                    row.appendChild(
                        actions
                    );

                    selectedNeeds.appendChild(
                        row
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


        function editNeed(index) {

            if (
                !state.pole ||
                index < 0 ||
                index >= state.needs.length
            ) {
                return;
            }


            const oldNeed =
                state.needs[index];


            const available =
                services[
                    state.pole
                ].needs.filter(
                    function (need) {

                        return (
                            !state.needs.includes(
                                need
                            ) ||
                            need === oldNeed
                        );

                    }
                );


            if (
                available.length === 0
            ) {

                alert(
                    "Aucun autre besoin disponible."
                );

                return;

            }


            let message =
                "Modifier le besoin :\n\n" +
                oldNeed +
                "\n\n";


            available.forEach(
                function (
                    need,
                    indexOption
                ) {

                    message +=
                        (
                            indexOption + 1
                        ) +
                        " - " +
                        need +
                        "\n";

                }
            );


            const choice =
                prompt(
                    message +
                    "\nEntrez le numéro :"
                );


            if (
                choice === null
            ) {
                return;
            }


            const number =
                Number(
                    choice.trim()
                );


            if (
                !Number.isInteger(
                    number
                ) ||
                number < 1 ||
                number > available.length
            ) {

                alert(
                    "Choix invalide."
                );

                return;

            }


            state.needs[index] =
                available[
                    number - 1
                ];


            renderNeeds();

            renderSelectedNeeds();

            updateSummary();

        }


        /* =================================================
           TYPE DE DEMANDE
           ================================================= */

        function chooseRequestType(type) {

            if (
                state.needs.length === 0
            ) {

                alert(
                    "Veuillez sélectionner au moins un besoin."
                );

                return;

            }


            state.requestType =
                type;


            chooseQuoteBtn.classList.toggle(
                "active",
                type === "devis"
            );


            chooseAppointmentBtn.classList.toggle(
                "active",
                type === "rdv"
            );


            if (
                type === "rdv"
            ) {

                appointmentBox.classList.remove(
                    "hidden"
                );

            } else {

                appointmentBox.classList.add(
                    "hidden"
                );

                resetAppointment();

            }


            updateSummary();

        }


        chooseQuoteBtn.addEventListener(
            "click",
            function () {

                chooseRequestType(
                    "devis"
                );

            }
        );


        chooseAppointmentBtn.addEventListener(
            "click",
            function () {

                chooseRequestType(
                    "rdv"
                );

            }
        );


        /* =================================================
           CALENDRIER
           ================================================= */

        function showConfirmDateButton() {

            confirmDateBtn.classList.remove(
                "hidden"
            );

            confirmDateBtn.style.display =
                "inline-flex";

        }


        function hideConfirmDateButton() {

            confirmDateBtn.classList.add(
                "hidden"
            );

            confirmDateBtn.style.removeProperty(
                "display"
            );

        }


        function renderCalendar() {

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
                        month:
                            "long",
                        year:
                            "numeric"
                    }
                );


            calendarMonth.textContent =
                monthName
                    .charAt(0)
                    .toUpperCase() +
                monthName.slice(1);


            const firstDay =
                new Date(
                    year,
                    month,
                    1
                );


            let startDay =
                firstDay.getDay();


            if (
                startDay === 0
            ) {

                startDay =
                    7;

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

                calendarDays.appendChild(
                    document.createElement(
                        "div"
                    )
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

                        showConfirmDateButton();

                    }
                );


                calendarDays.appendChild(
                    button
                );

            }


            if (
                temporaryDate
            ) {

                showConfirmDateButton();

            }

        }


        openCalendarBtn.addEventListener(
            "click",
            function () {

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


        previousMonth.addEventListener(
            "click",
            function () {

                calendarDate.setMonth(
                    calendarDate.getMonth() - 1
                );

                renderCalendar();

            }
        );


        nextMonth.addEventListener(
            "click",
            function () {

                calendarDate.setMonth(
                    calendarDate.getMonth() + 1
                );

                renderCalendar();

            }
        );


        confirmDateBtn.addEventListener(
            "click",
            function () {

                if (
                    !temporaryDate
                ) {

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


                dateDisplay.textContent =
                    state.appointment.dateLabel;


                calendarContainer.classList.add(
                    "hidden"
                );


                hideConfirmDateButton();


                updateAppointmentSummary();

                updateSummary();

            }
        );


        /* =================================================
           HORAIRE
           ================================================= */

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


        function updateAppointmentSummary() {

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


        /* =================================================
           MODIFIER RDV
           ================================================= */

        editAppointmentBtn.addEventListener(
            "click",
            function () {

                calendarContainer.classList.remove(
                    "hidden"
                );


                if (
                    state.appointment.date
                ) {

                    const parts =
                        state.appointment.date.split(
                            "-"
                        );


                    temporaryDate =
                        new Date(
                            Number(
                                parts[0]
                            ),
                            Number(
                                parts[1]
                            ) - 1,
                            Number(
                                parts[2]
                            )
                        );


                    calendarDate =
                        new Date(
                            temporaryDate
                        );

                }


                renderCalendar();

            }
        );


        /* =================================================
           SUPPRIMER RDV
           ================================================= */

        deleteAppointmentBtn.addEventListener(
            "click",
            function () {

                state.appointment = {

                    date:
                        null,

                    dateLabel:
                        null,

                    time:
                        null

                };


                temporaryDate =
                    null;


                dateDisplay.textContent =
                    "Choisir une date";


                appointmentTime.value =
                    "";


                appointmentSummary.classList.add(
                    "hidden"
                );


                calendarContainer.classList.add(
                    "hidden"
                );


                hideConfirmDateButton();

                updateSummary();

            }
        );


        function resetAppointment() {

            state.appointment = {

                date:
                    null,

                dateLabel:
                    null,

                time:
                    null

            };


            temporaryDate =
                null;


            dateDisplay.textContent =
                "Choisir une date";


            appointmentTime.value =
                "";


            appointmentSummary.classList.add(
                "hidden"
            );


            calendarContainer.classList.add(
                "hidden"
            );


            hideConfirmDateButton();

        }


        /* =================================================
           MODAL SERVICES
           ================================================= */

        function openService(serviceName) {

            if (
                !services[serviceName]
            ) {
                return;
            }


            currentModalService =
                serviceName;


            const service =
                services[
                    serviceName
                ];


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


        document
            .querySelectorAll(
                ".service-btn"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();

                            openService(
                                button.dataset.service
                            );

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                ".service-card"
            )
            .forEach(
                function (card) {

                    card.addEventListener(
                        "click",
                        function () {

                            openService(
                                card.dataset.service
                            );

                        }
                    );

                }
            );


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


        closeModalBtn.addEventListener(
            "click",
            closeModal
        );


        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modal
                ) {

                    closeModal();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeModal();

                }

            }
        );


        /* =================================================
           BOUTON ACCUEIL
           ================================================= */

        quoteBtn.addEventListener(
            "click",
            function () {

                scrollToRequest();

            }
        );


        /* =================================================
           ENVOI
           ================================================= */

        submitRequestBtn.addEventListener(
            "click",
            async function () {


                /* VALIDATIONS */

                if (
                    !state.pole
                ) {

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
                    !clientName.value.trim()
                ) {

                    alert(
                        "Veuillez renseigner votre nom et prénom."
                    );

                    clientName.focus();

                    return;

                }


                if (
                    !clientPhone.value.trim()
                ) {

                    alert(
                        "Veuillez renseigner votre numéro de téléphone."
                    );

                    clientPhone.focus();

                    return;

                }


                if (
                    !state.requestType
                ) {

                    alert(
                        "Veuillez choisir entre une demande de devis et un rendez-vous."
                    );

                    return;

                }


                if (
                    state.requestType ===
                    "rdv"
                ) {

                    if (
                        !state.appointment.date
                    ) {

                        alert(
                            "Veuillez sélectionner une date."
                        );

                        return;

                    }


                    if (
                        !state.appointment.time
                    ) {

                        alert(
                            "Veuillez sélectionner un horaire."
                        );

                        return;

                    }

                }


                /* DONNÉES */

                const demande = {

                    client:
                        clientName.value.trim(),

                    telephone:
                        clientPhone.value.trim(),

                    email:
                        clientEmail.value.trim(),

                    adresse:
                        clientAddress.value.trim(),

                    description:
                        clientDescription.value.trim(),

                    pole:
                        services[
                            state.pole
                        ].title,

                    besoins:
                        [
                            ...state.needs
                        ],

                    type:
                        state.requestType ===
                        "rdv"
                            ? "Prise de rendez-vous"
                            : "Demande de devis",

                    date:
                        state.appointment.dateLabel ||
                        "—",

                    horaire:
                        state.appointment.time ||
                        "—"

                };


                /* BOUTON */

                const originalText =
                    submitRequestBtn.textContent;


                submitRequestBtn.disabled =
                    true;


                submitRequestBtn.textContent =
                    "Envoi en cours...";


                /* WEB3FORMS */

                const formData = {

                    access_key:
                        WEB3FORMS_ACCESS_KEY,

                    subject:
                        "Nouvelle demande PÔLE MS — " +
                        demande.type,

                    from_name:
                        "Site PÔLE MS",

                    client_name:
                        demande.client,

                    client_phone:
                        demande.telephone,

                    client_email:
                        demande.email,

                    client_address:
                        demande.adresse,

                    pole:
                        demande.pole,

                    needs:
                        demande.besoins.join(
                            " | "
                        ),

                    request_type:
                        demande.type,

                    appointment_date:
                        demande.date,

                    appointment_time:
                        demande.horaire,

                    description:
                        demande.description ||
                        "Aucune description",

                    request_details:
                        JSON.stringify(
                            demande,
                            null,
                            2
                        )

                };


                try {

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
                                        formData
                                    )

                            }
                        );


                    const result =
                        await response.json();


                    console.log(
                        "Réponse Web3Forms :",
                        result
                    );


                    if (
                        response.ok &&
                        result.success
                    ) {


                        /* =================================
                           SUCCÈS
                           ================================= */

                        confirmationText.textContent =

                            "Merci " +
                            demande.client +
                            " ! Votre demande a bien été transmise à PÔLE MS. Nous vous recontacterons au 06 90 08 34 07.";


                        clientBox.classList.add(
                            "hidden"
                        );


                        appointmentBox.classList.add(
                            "hidden"
                        );


                        confirmationBox.classList.remove(
                            "hidden"
                        );


                        confirmationBox.scrollIntoView({
                            behavior:
                                "smooth",
                            block:
                                "start"
                        });


                        /*
                         * RÉINITIALISATION DES DONNÉES
                         */

                        resetForm();

                    }

                    else {

                        console.error(
                            "Erreur Web3Forms :",
                            result
                        );


                        alert(
                            "La demande n'a pas pu être envoyée. Veuillez réessayer."
                        );

                    }

                }

                catch (error) {

                    console.error(
                        "Erreur réseau :",
                        error
                    );


                    alert(
                        "Une erreur est survenue pendant l'envoi. Vérifiez votre connexion internet."
                    );

                }

                finally {

                    submitRequestBtn.disabled =
                        false;

                    submitRequestBtn.textContent =
                        originalText;

                }

            }
        );


        /* =================================================
           RÉINITIALISATION COMPLÈTE
           ================================================= */

        function resetForm() {

            state.pole =
                null;

            state.needs =
                [];

            state.requestType =
                null;

            resetAppointment();


            selectedPole.textContent =
                "Aucun pôle sélectionné";

            selectedPole.classList.add(
                "empty"
            );


            renderNeeds();

            renderSelectedNeeds();


            chooseQuoteBtn.classList.remove(
                "active"
            );

            chooseAppointmentBtn.classList.remove(
                "active"
            );


            clientName.value =
                "";

            clientPhone.value =
                "";

            clientEmail.value =
                "";

            clientAddress.value =
                "";

            clientDescription.value =
                "";

            clientPhoto.value =
                "";


            summaryPole.textContent =
                "—";

            summaryNeeds.textContent =
                "Aucun besoin sélectionné";

            summaryType.textContent =
                "—";

            summaryDate.textContent =
                "—";

            summaryTime.textContent =
                "—";

        }


        /* =================================================
           NOUVELLE DEMANDE
           ================================================= */

        newRequestBtn.addEventListener(
            "click",
            function () {

                confirmationBox.classList.add(
                    "hidden"
                );


                clientBox.classList.remove(
                    "hidden"
                );


                resetForm();


                scrollToRequest();

            }
        );


        /* =================================================
           INITIALISATION
           ================================================= */

        renderNeeds();

        renderSelectedNeeds();

        updateSummary();


        console.log(
            "PÔLE MS — parcours client chargé."
        );

    }
);