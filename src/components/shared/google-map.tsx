"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FC, useLayoutEffect, useRef } from "react";

type GoogleMapProps = {
  placeId?: string;
  position?: { lat: number; lng: number };
};

export const GoogleMap: FC<GoogleMapProps> = ({ placeId, position }) => {
  const markerRef = useRef<google.maps.Marker>(null);
  const map = useMap();
  const googleMapsPlaces = useMapsLibrary("places");

  useLayoutEffect(() => {
    if (!map) return;

    if (placeId && googleMapsPlaces) {
      const placeApi = new googleMapsPlaces.Place({
        id: placeId,
        requestedLanguage: "en",
      });

      placeApi
        .fetchFields({
          fields: ["location", "displayName"],
        })
        .then(({ place }) => {
          if (place?.location) {
            map.setCenter(place.location);
            map.setZoom(18);

            if (!markerRef.current) {
              markerRef.current = new google.maps.Marker({
                map,
                position: place.location,
                title: place.displayName || "Location",
              });
            } else {
              markerRef.current.setPosition(place.location);
              markerRef.current.setTitle(place.displayName || "Location");
            }
          }
        });
    } else if (position) {
      map.setCenter(position);
      map.setZoom(15);

      if (!markerRef.current) {
        markerRef.current = new google.maps.Marker({
          map,
          position,
          title: "Selected Location",
        });
      } else {
        markerRef.current.setPosition(position);
        markerRef.current.setTitle("Selected Location");
      }
    }
  }, [map, googleMapsPlaces, placeId, position]);

  return <></>;
};
