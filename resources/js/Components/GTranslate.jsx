import React, { useEffect, useState } from 'react';
import Select from './Form/Select';
import useScreenSize from '@/Hooks/useScreenSize';

const GTranslate = ({onChange=null}) => {
  const { width, height } = useScreenSize();
  const smallScreen = width < 1024;
  
  useEffect(() => {
    // Load the Google Translate script
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2";
    document.body.appendChild(script);

    // Function to initialize Google Translate
    window.googleTranslateElementInit2 = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'nl', autoDisplay: false },
        'google_translate_element2'
      );
    };

    // GTranslate fire event function
    window.GTranslateFireEvent = function (element, eventType) {
      if (!element) {
        console.error("Element not found");
        return;
      }
      // alert('Event triggered');
      if (document.createEvent) {
        const event = document.createEvent('HTMLEvents');
        event.initEvent(eventType, true, true);
        element.dispatchEvent(event);
      } else {
        const event = document.createEventObject();
        element.fireEvent('on' + eventType, event);
      }
    };

    // Do GTranslate function
    window.doGTranslate = function (languageCode) {
      // alert('Language change function triggered');
      if (!languageCode) return;
      
      const lang = languageCode.split('|')[1];
      const selectElement = document.getElementById('google_translate_element2')?.getElementsByTagName('select')[0];

      if (!selectElement) {
        console.error("Select element not found. Retrying...");
        setTimeout(() => window.doGTranslate(languageCode), 500);
        return;
      }

      console.log('Language selected:', lang);
      selectElement.value = lang;
      window.GTranslateFireEvent(selectElement, 'change');
    };
    
  }, []);

  const handleLangChange = (e)=>{
    window.doGTranslate(e.v)
    if(onChange){
      onChange(e.v.split('|')[1])
    }
  }

  // const langs = [
  //   {'v':'nl|en','t':<div className='flex items-center gap-1'><img src="https://flagcdn.com/w320/us.png" className='w-4 h-4' alt="English"/>{smallScreen?'EN':'English'}</div>},
  //   {'v':'nl|fr','t':<div className='flex items-center gap-1'><img src="https://flagcdn.com/w320/fr.png" className='w-4 h-4' alt="Français"/>{smallScreen?'FR':'Français'}</div>},
  // ]

  const langs = [
    {'v':'nl|en','t':<div className='flex items-center gap-1'><img src="https://flagcdn.com/w320/us.png" className='w-6 h-4' alt="English"/></div>},
    {'v':'nl|fr','t':<div className='flex items-center gap-1'><img src="https://flagcdn.com/w320/fr.png" className='w-6 h-4' alt="Français"/></div>},
  ]

  return (
    <div  id="gtranslate_wrapper">
      {/* Add more language options as needed */}
      <Select 
        items={langs}
        textField={'t'}
        valueField={'v'}
        value={langs[0]}
        onChange={handleLangChange}
      />
      <div id="google_translate_element2" className='hidden'></div>
    </div>
  );
};

export default GTranslate;
