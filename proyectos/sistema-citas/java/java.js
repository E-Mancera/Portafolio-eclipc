function switchTab(tab) {
    const clientView = document.getElementById('view-client');
    const adminView = document.getElementById('view-admin');
    const btnClient = document.getElementById('btn-client');
    const btnAdmin = document.getElementById('btn-admin');

    const activeClasses = ['neu-outset', 'text-white'];
    const inactiveClasses = ['text-text-muted', 'hover:text-white', 'bg-transparent'];

    if (tab === 'client') {
        clientView.classList.remove('hidden');
        adminView.classList.add('hidden');
        
        btnClient.classList.add(...activeClasses);
        btnClient.classList.remove(...inactiveClasses);
        
        btnAdmin.classList.remove(...activeClasses);
        btnAdmin.classList.add(...inactiveClasses);
    } else {
        adminView.classList.remove('hidden');
        clientView.classList.add('hidden');
        
        btnAdmin.classList.add(...activeClasses);
        btnAdmin.classList.remove(...inactiveClasses);
        
        btnClient.classList.remove(...activeClasses);
        btnClient.classList.add(...inactiveClasses);
    }
}