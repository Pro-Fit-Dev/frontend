import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userLocationAtom } from "../../recoil/atoms/locationAtom";
import loadGoogleMapsScript from "../../utils/loadGoogleMapsScript";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const userLocation = useRecoilValue(userLocationAtom);

    useEffect(() => {
        const initializeMap = async () => {
            console.log("Initializing map...");
            if (!userLocation || !mapRef.current) return;

            if (!mapRef.current) {
                console.error("Map container is not available.");
                return;
            }

            try {
                await loadGoogleMapsScript(apiKey);
                console.log("Google Maps script loaded successfully.");

                console.log("Initializing Google Maps...");
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat: userLocation.latitude, lng: userLocation.longitude },
                    zoom: 14,
                });
                console.log("mapRef.current:", mapRef.current);
                new google.maps.Marker({
                    position: { lat: userLocation.latitude, lng: userLocation.longitude },
                    map,
                    title: "현재 위치",
                });
            } catch (error) {
                console.error("Error initializing map:", error);
            }
        };

        initializeMap();
    }, [userLocation]);

    return <div ref={mapRef} style={{ width: "100%", height: "100vh", position: "relative", }} />;
};

export default Map;
