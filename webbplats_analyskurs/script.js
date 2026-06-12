// JavaScript för mätning, analys och formulärhantering
document.addEventListener('DOMContentLoaded', function() {
    console.log('TassarnasHotell script laddat framgångsrikt.');

    // Funktion för att hämta UTM-parametrar från URL:en
    // Användbart för studenter att se hur kampanjdata kan skickas vidare eller loggas
    function getUTMParams() {
        const params = new URLSearchParams(window.location.search);
        const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        let foundUtm = {};
        
        utmFields.forEach(field => {
            if (params.has(field)) {
                foundUtm[field] = params.get(field);
            }
        });
        
        if (Object.keys(foundUtm).length > 0) {
            console.log('Hittade UTM-taggar för analys:', foundUtm);
            // Här kan studenterna senare lägga kod för att skicka till GA4, HubSpot eller spara i sessionStorage
        }
    }

    getUTMParams();

    // Hantering av lokala formulärinsändningar före integrering av externa verktyg
    // Detta simulerar en konvertering och skickar användaren till tack-sidan
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Om formuläret har en action (t.ex. vid framtida HubSpot/Mailchimp integration), låt den köra.
            // Annars simulerar vi en lyckad insändning och styr om till thank-you.html för konverteringsmätning.
            if (!form.getAttribute('action')) {
                e.preventDefault();
                console.log('Formulär skickat lokalt. Initierar redirect till tack-sidan.');
                
                // Bevara eventuella UTM-parametrar vid redirect för att inte bryta mätningen på tack-sidan
                const currentQuery = window.location.search;
                window.location.href = 'thank-you.html' + currentQuery;
            }
        });
    });
});
