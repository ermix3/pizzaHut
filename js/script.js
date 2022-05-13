const clientInfos = document.querySelectorAll('.client-info'),
    // total = document.querySelector('input[disabled]'),
    quatites = document.querySelectorAll('table input'),
    prices = document.querySelectorAll('tbody td:nth-child(2)'),
    paiments = document.querySelectorAll('.paiment'),
    numCarte = document.querySelector('#num-carte'),
    envoyer = document.querySelector('#envoyer');

document.body.addEventListener('click', e => {
    if (e.target.classList.contains('paiment'))
        if (e.target.id === 'carte') {
            numCarte.style.display = 'block';
            numCarte.firstElementChild.focus();
        } else {
            numCarte.style.display = 'none';
            numCarte.firstElementChild.value = '';
        }
});

envoyer.addEventListener('click', () => {
    // pour checker si le client a payé avec carte bancaire
    if (paiments[0].checked && numCarte.firstElementChild.value === '') {
        numCarte.firstElementChild.classList.add('error');
        // alert script
        Swal.fire({
            title: `Veuillez remplir le champ numero de carte`,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    } else {
        numCarte.firstElementChild.classList.remove('error');
    }

    // Calcul la total de la commande
    let somme = 0;
    for (let i = 0; i < quatites.length; i++)
        if (quatites[i].value !== '')
            somme += parseInt(quatites[i].value) * parseInt(prices[i].textContent);

        // pour checker si le client ne cammande pas un nombre de produit superieur
    if (somme === 0) {
        // alert script
        Swal.fire({
            title: `Veuillez remplir au moins un produit`,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }

    // pour checker si le client a entrer votre nom et adresse
    clientInfos.forEach(clientInfo => {
        if (clientInfo.value === '') {
            clientInfo.classList.add('error');
            // alert script
            Swal.fire({
                title: `Veuillez remplir le champ ${clientInfo.id}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else {
            clientInfo.classList.remove('error');
        }
    });

    // tous est ok
    if (
        clientInfos[0].value !== '' &&
        clientInfos[1].value !== '' &&
        somme !== 0 &&
        ((paiments[0].checked && numCarte.firstElementChild.value !== '') ||
            paiments[1].checked)
    ) {
        // alert script
        Swal.fire({
            title: `MERCI DE VOTRE COMMANDE`,
            text: `Votre somme: ${somme} DH`,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    }
});

let footer = document.querySelector('footer');
// ajouter la txt a la footer
footer.appendChild(
    document.createTextNode(
        'Designed BY ER.Reda________________________|Copyright © 2022|________________________Tous droits réservés'
    )
);
footer.classList.add(
    'mt-0',
    'fs-6',
    'text-white',
    'py-2',
    'mt-3',
    'bg-primary',
    'bg-opacity-25',
    'text-center'
);