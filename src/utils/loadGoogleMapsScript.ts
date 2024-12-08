const loadGoogleMapsScript = (apiKey: string) => {
    return new Promise<void>((resolve, reject) => {
        if (window.google && window.google.maps) {
            console.log("Google Maps script already loaded.");
            resolve();
            return;
        }
        const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
        if (existingScript) {
            existingScript.addEventListener("load", () => resolve());
            existingScript.addEventListener("error", () => reject(new Error("Google Maps script failed to load")));
            return;
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Google Maps script failed to load"));
        document.head.appendChild(script);
    });
};

export default loadGoogleMapsScript;





















