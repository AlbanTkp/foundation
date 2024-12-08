import React from 'react';

const formatDateTime = (dateString, format="dd/mm/yyyy à h:i:s") => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const newStr = format.replace('dd',day)
                        .replace('mm',month)
                        .replace('yyyy',year)
                        .replace('h',hours)
                        .replace('i',minutes)
                        .replace('s',seconds)

    return newStr
}

function formatDateTime2(dateString) {
    const date = new Date(dateString);
    
    // Jours et mois en français
    const days = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
    const months = ['jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

    // Obtenir les éléments de la date et de l'heure
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const weekday = days[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Retourner le format souhaité
    return `${weekday} ${day} ${month} ${year} à ${hours}:${minutes}:${seconds}`;
}

function formatDateTimeInternational(dateString, locale = 'en-US') {
    const date = new Date(dateString);

    // Options for date and time formatting
    const optionsDate = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: locale == 'fr-FR'?false:true };

    // Get the formatted date and time
    const formattedDate = date.toLocaleDateString(locale, optionsDate);
    const formattedTime = date.toLocaleTimeString(locale, optionsTime);

    return `${formattedDate} at ${formattedTime}`;
}

function dateDiffInDays(date1, date2, abs = true) {
    // Parse the dates
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Calculate the difference in milliseconds
    const diffInMs = abs ? Math.abs(d2 - d1) : d2- d1
    
    // Convert milliseconds to days
    const msInDay = 24 * 60 * 60 * 1000;
    const diffInDays = diffInMs / msInDay;
    
    return parseInt(diffInDays);
}


export {
    formatDateTime,
    dateDiffInDays,
    formatDateTime2,
    formatDateTimeInternational
}
