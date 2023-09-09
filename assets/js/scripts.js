document.getElementById('languageSelector').addEventListener('click', function(event) {
    if (event.target && event.target.matches("a.dropdown-item")) {
        const selectedLang = event.target.getAttribute('data-lang');
        checkLanguageAndSetDirection(selectedLang);
        moveSidebarBasedOnLanguage(selectedLang);
    }
});

function checkLanguageAndSetDirection(lang) {
    const sidebar = document.getElementById('local-menu');
    if (['ar'].includes(lang))
    {
        sidebar.setAttribute('dir', 'rtl');
    }
    else
    {
        sidebar.setAttribute('dir', 'ltr');
    }
}

function moveSidebarBasedOnLanguage(lang) {
    const contentArea = document.querySelector('.col-12.col-md-9.mx-auto');
    const sidebar = document.getElementById('local-menu');

    if (lang === 'ar') {
        contentArea.insertAdjacentElement('afterend', sidebar);
    } else {
        contentArea.insertAdjacentElement('beforebegin', sidebar);
    }
}
