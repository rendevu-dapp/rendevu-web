"use client";

// imports
import { APIProvider } from "@vis.gl/react-google-maps";

// constants
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
if (!googleMapsApiKey) {
  throw new Error(
    "GOOGLE_MAPS_API_KEY is not defined in the environment variables.",
  );
}

export const GoogleMapApiProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <APIProvider apiKey={googleMapsApiKey} libraries={["places"]}>
      {children}
    </APIProvider>
  );
};
