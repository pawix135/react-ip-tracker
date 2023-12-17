import "leaflet/dist/leaflet.css";
import { useMemo, useRef, useState } from "react";
import arrowLeft from "./assets/icon-arrow.svg";
import InfoItem from "./components/InfoItem";
import { Marker } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Map } from "leaflet";
import { MarkerIcon } from "./components/MarkerIcon";

const DEFAULT_ZOOM = 13;
const DEFALUT_CENTER: [number, number] = [37.40599, -122.078514];

interface Location {
  ip_address: string;
  location: string;
  timezone: string;
  isp: string;
}

function App() {
  const [ip, setIp] = useState<string>("");
  const [position, setPosition] = useState<[number, number]>(DEFALUT_CENTER);
  const [location, setLocation] = useState<Location>({
    ip_address: "8.8.8.8",
    isp: "Google LLC",
    location: "Mountain View, California",
    timezone: "-07:00",
  });

  let mapRef = useRef<Map>(null);

  const getLocationByIp = async () => {
    if (ip === "" || ip == location.ip_address) {
      return;
    }

    try {
      let apiUrl = new URL("https://geo.ipify.org/api/v2/country,city");
      apiUrl.searchParams.set("apiKey", "at_PRdQuAW32U4UFMy48bFi8BoMRcEBL");
      apiUrl.searchParams.set("ipAddress", ip);

      let response = await fetch(apiUrl.toString());
      let data = await response.json();

      if (response.ok) {
        setLocation({
          ip_address: data.ip,
          isp: data.isp.length > 0 ? data.isp : "Unknown",
          location:
            data.location.city && data.location.region
              ? `${data.location.city}, ${data.location.region}`
              : "Unknown",
          timezone: data.location.timezone ?? "Unknown",
        });

        setPosition([data.location.lat, data.location.lng]);
        mapRef.current?.setView(
          [data.location.lat, data.location.lng],
          DEFAULT_ZOOM
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayMap = useMemo(() => {
    return (
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} icon={MarkerIcon} />}
      </MapContainer>
    );
  }, [position, location]);

  return (
    <main className="h-screen">
      <div className="bg-pattern h-[300px] grid place-items-center">
        <div className="flex flex-col gap-5 items-center container ">
          <h1 className="text-3xl font-medium text-white">
            IP Address Tracker
          </h1>
          <div className="flex flex-row w-3/4 md:w-full justify-center">
            <input
              className="w-full md:w-2/4 rounded-l-xl pl-5"
              type="text"
              placeholder="Search for any IP address or domain"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
            <button
              className="bg-black p-5 rounded-r-xl"
              onClick={getLocationByIp}
            >
              <img src={arrowLeft} alt="arrow-left" />
            </button>
          </div>
        </div>
        <div className="grid w-3/4 md:w-full container mx-auto grid-flow-col grid-rows-4 grid-cols-1 py-5 md:grid-flow-row md:grid-cols-4 md:grid-rows-1 bg-white rounded-xl -mb-[200px] md:-mb-[100px] shadow-sm shadow-gray-500 z-[1000]">
          <InfoItem title="IP ADDRESS" value={location.ip_address} />
          <InfoItem title="LOCATION" value={location.location} />
          <InfoItem title="TIMEZONE" value={"UTC " + location.timezone} />
          <InfoItem title="ISP" value={location.isp} />
        </div>
      </div>
      <div className="h-[calc(100vh-300px)]">{displayMap}</div>
    </main>
  );
}

export default App;
