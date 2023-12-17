import markerIcon from "../assets/icon-location.svg";
import Leaflet from "leaflet";
const MarkerIcon = new Leaflet.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new Leaflet.Point(30, 37.5),
  className: "mix-blend-multiply",
});

export { MarkerIcon };
