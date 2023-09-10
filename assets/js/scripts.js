document.addEventListener('DOMContentLoaded', () => {
    const menuToggleBtn = document.createElement('button');
    menuToggleBtn.id = 'menu-toggle-btn';
    menuToggleBtn.innerHTML = '→';
    document.body.appendChild(menuToggleBtn);

    menuToggleBtn.addEventListener('click', function() {
        const sidebar = document.getElementById('local-menu');
        if (sidebar.style.left === '0px') {
            sidebar.style.left = '-300px';
            menuToggleBtn.style.left = '0px';
            menuToggleBtn.innerHTML = '→';
        } else {
            sidebar.style.left = '0px';
            menuToggleBtn.style.left = '158px';
            menuToggleBtn.innerHTML = '←';
        }
    });

    const table = document.querySelector('table');
    let isAscending = true;

    table.querySelector('thead').addEventListener('click', (e) => {
        // Überprüfen Sie, ob das angeklickte Element das data-sortable Attribut hat
        if (!e.target.hasAttribute('data-sortable')) return;

        const colIndex = Array.from(e.target.parentElement.children).indexOf(e.target);
        const rows = Array.from(table.querySelectorAll('tbody tr'));

        const compareFunction = isNaN(parseFloat(rows[0].cells[colIndex].textContent.trim()))
            ? (a, b) => a.cells[colIndex].textContent.trim().localeCompare(b.cells[colIndex].textContent.trim())
            : (a, b) => parseFloat(a.cells[colIndex].textContent.trim()) - parseFloat(b.cells[colIndex].textContent.trim());

        const sortedRows = rows.sort(compareFunction);

        if (!isAscending) {
            sortedRows.reverse();
        }

        table.querySelector('tbody').append(...sortedRows);
        isAscending = !isAscending;
    });
});

document.getElementById('filterEmitter').addEventListener('keyup', function() {
    const filterValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('table tbody tr');

    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(filterValue) ? "" : "none";
    });
});

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

let scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    })
}