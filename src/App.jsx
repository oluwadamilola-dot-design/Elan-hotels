import { useState, useEffect, useRef } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import spaIcon from "./assets/spa.png";
import breakfastIcon from "./assets/breakfast.png";
import conciergeIcon from "./assets/concierge.png";
import valetIcon from "./assets/valet.png";
import poolIcon from "./assets/pool.png";
import diningIcon from "./assets/dining.png";
import fitnessIcon from "./assets/fitness.png";
import loungeIcon from "./assets/lounge.png";
import footerLogo from "./assets/Logo-footer.png";
import facebookIcon from "./assets/Facebook.png";
import instagramIcon from "./assets/Instagram.png";
import xIcon from "./assets/X.png";
import linkedinIcon from "./assets/Linkedin.png";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://elan-hotels-backend-production.up.railway.app";

const LATEST_BOOKINGS_KEY = "elan_latest_bookings_by_email";

const saveLatestBookingForEmail = (email, record) => {
  if (!email) return;
  try {
    const existing = JSON.parse(
      localStorage.getItem(LATEST_BOOKINGS_KEY) || "{}"
    );
    existing[email.trim().toLowerCase()] = record;
    localStorage.setItem(LATEST_BOOKINGS_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage quota errors
  }
};

const getLatestBookingForEmail = (email) => {
  if (!email) return null;
  try {
    const existing = JSON.parse(
      localStorage.getItem(LATEST_BOOKINGS_KEY) || "{}"
    );
    return existing[email.trim().toLowerCase()] || null;
  } catch {
    return null;
  }
};

const AMENITIES = [
  {
    title: "Spa Retreat",
    description:
      "Bespoke massages, aromatherapy, and holistic wellness treatments.",
    icon: spaIcon,
  },
  {
    title: "Breakfast Buffet",
    description:
      "Freshly baked pastries, local specialties, and artisanal coffee.",
    icon: breakfastIcon,
  },
  {
    title: "Concierge Service",
    description:
      "24/7 assistance for city tours, dining, and airport transfers.",
    icon: conciergeIcon,
  },
  {
    title: "Valet Parking",
    description: "Secure, complimentary on-site parking with attendant care.",
    icon: valetIcon,
  },
  {
    title: "Skyline Pool",
    description:
      "Temperature-controlled infinity pool with panoramic city views.",
    icon: poolIcon,
  },
  {
    title: "Signature Dining",
    description:
      "Contemporary African and international cuisine by our chefs.",
    icon: diningIcon,
  },
  {
    title: "Fitness Studio",
    description:
      "Modern cardio and strength equipment open 24 hours daily.",
    icon: fitnessIcon,
  },
  {
    title: "Rooftop Lounge",
    description:
      "Handcrafted cocktails and ambient music under the open sky.",
    icon: loungeIcon,
  },
];

const ROOMS_DATA = [
  {
    id: 1,
    title: "Premium Room",
    bedType: "King",
    view: "City View",
    priceNum: 85000,
    price: "₦85,000",
    guests: "2 Guests",
    beds: "1 King Bed",
    size: "35 m²",
    rating: "4.9",
    availableUnits: 3,
    blockedRanges: [{ from: "2026-11-26", to: "2026-11-28" }],
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80",
    about:
      "Designed for effortless relaxation, our Premium Room features floor-to-ceiling windows, bespoke furnishings, a plush king-sized bed, and a marble rain-shower bathroom.",
    amenitiesLeft: [
      "High-Speed Wi-Fi",
      "Smart 55” TV",
      "Rain Shower",
      "Work Desk",
    ],
    amenitiesRight: [
      "Air Conditioning",
      "Nespresso Machine",
      "In-Room Safe",
      "24/7 Room Service",
    ],
  },
  {
    id: 2,
    title: "Executive Suite",
    bedType: "King",
    view: "Ocean View",
    priceNum: 125000,
    price: "₦125,000",
    guests: "3 Guests",
    beds: "1 King Bed",
    size: "52 m²",
    rating: "4.9",
    availableUnits: 2,
    blockedRanges: [{ from: "2026-11-20", to: "2026-11-22" }],
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    about:
      "Featuring a separate lounge area and panoramic city views, the Executive Suite blends residential comfort with refined hospitality for extended or business stays.",
    amenitiesLeft: [
      "High-Speed Wi-Fi",
      "Private Lounge",
      "Soaking Tub",
      "Executive Desk",
    ],
    amenitiesRight: [
      "Complimentary Breakfast",
      "Mini Bar",
      "In-Room Safe",
      "Turndown Service",
    ],
  },
  {
    id: 3,
    title: "Deluxe King Room",
    bedType: "King",
    view: "Garden View",
    priceNum: 95000,
    price: "₦95,000",
    guests: "2 Guests",
    beds: "1 King Bed",
    size: "40 m²",
    rating: "4.8",
    availableUnits: 3,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    about:
      "Bright, airy, and thoughtfully appointed, the Deluxe King Room pairs warm wood accents with blackout drapery and serene garden views.",
    amenitiesLeft: [
      "High-Speed Wi-Fi",
      "Smart 55” TV",
      "Walk-in Shower",
      "Seating Nook",
    ],
    amenitiesRight: [
      "Air Conditioning",
      "Tea & Coffee Set",
      "Plush Bathrobes",
      "24/7 Room Service",
    ],
  },
  {
    id: 4,
    title: "Ambassador Loft",
    bedType: "Twin",
    view: "Ocean View",
    priceNum: 165000,
    price: "₦165,000",
    guests: "4 Guests",
    beds: "2 Queen Beds",
    size: "68 m²",
    rating: "5.0",
    availableUnits: 2,
    blockedRanges: [{ from: "2026-11-24", to: "2026-11-26" }],
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    about:
      "Our signature duplex-inspired loft offers generous living space, dual queen beds, elevated skyline views, and priority concierge privileges.",
    amenitiesLeft: [
      "Fiber Wi-Fi",
      "65” OLED TV",
      "Double Vanity",
      "Dining Table",
    ],
    amenitiesRight: [
      "Airport Pickup",
      "Espresso Bar",
      "Walk-in Closet",
      "Lounge Access",
    ],
  },
  {
    id: 5,
    title: "Premium Twin Room",
    bedType: "Twin",
    view: "City View",
    priceNum: 85000,
    price: "₦85,000",
    guests: "2 Guests",
    beds: "2 Twin Beds",
    size: "35 m²",
    rating: "4.8",
    availableUnits: 3,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    about:
      "Tailored for colleagues or friends traveling together, offering two luxury twin beds, acoustic insulation, and sleek workspace lighting.",
    amenitiesLeft: [
      "High-Speed Wi-Fi",
      "Smart TV",
      "Rain Shower",
      "Dual Reading Lights",
    ],
    amenitiesRight: [
      "Air Conditioning",
      "Coffee Maker",
      "Electronic Safe",
      "Daily Housekeeping",
    ],
  },
  {
    id: 6,
    title: "Garden Terrace Suite",
    bedType: "King",
    view: "Garden View",
    priceNum: 140000,
    price: "₦140,000",
    guests: "3 Guests",
    beds: "1 King Bed",
    size: "58 m²",
    rating: "4.9",
    availableUnits: 2,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    about:
      "Step directly onto a private landscaped terrace from this tranquil suite crafted with natural stone textures and soft ambient lighting.",
    amenitiesLeft: [
      "Private Terrace",
      "Smart 55” TV",
      "Freestanding Tub",
      "Lounge Sofa",
    ],
    amenitiesRight: [
      "Breakfast Included",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "24/7 Concierge",
    ],
  },
  {
    id: 7,
    title: "Skyline Junior Suite",
    bedType: "King",
    view: "Ocean View",
    priceNum: 115000,
    price: "₦115,000",
    guests: "2 Guests",
    beds: "1 King Bed",
    size: "46 m²",
    rating: "4.9",
    availableUnits: 2,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    about:
      "Positioned on our upper floors, the Skyline Junior Suite captures golden-hour sunsets and offers an open-concept sitting area.",
    amenitiesLeft: [
      "High-Speed Wi-Fi",
      "Panoramic Windows",
      "Rain Shower",
      "Work Desk",
    ],
    amenitiesRight: [
      "Air Conditioning",
      "Mini Fridge",
      "In-Room Safe",
      "Evening Turndown",
    ],
  },
  {
    id: 8,
    title: "Presidential Residence",
    bedType: "King",
    view: "Ocean View",
    priceNum: 250000,
    price: "₦250,000",
    guests: "4 Guests",
    beds: "1 King + 1 Queen",
    size: "95 m²",
    rating: "5.0",
    availableUnits: 1,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    about:
      "The pinnacle of Elan Hotels—featuring a private dining salon, master spa bath, dedicated butler service, and sweeping coastal views.",
    amenitiesLeft: [
      "Dedicated Butler",
      "Private Dining",
      "Jacuzzi & Rain Shower",
      "75” Smart TV",
    ],
    amenitiesRight: [
      "Chauffeur Transfer",
      "Full Bar Setup",
      "VIP Lounge Access",
      "24/7 In-Suite Dining",
    ],
  },
  {
    id: 9,
    title: "Coastal Balcony Room",
    bedType: "King",
    view: "Ocean View",
    priceNum: 110000,
    price: "₦110,000",
    guests: "2 Guests",
    beds: "1 King Bed",
    size: "42 m²",
    rating: "4.8",
    availableUnits: 3,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1000&q=80",
    about:
      "Wake up to gentle sea breezes from your private furnished balcony, paired with warm coastal interiors and a spacious walk-in rain shower.",
    amenitiesLeft: [
      "Private Balcony",
      "High-Speed Wi-Fi",
      "Smart 55” TV",
      "Rain Shower",
    ],
    amenitiesRight: [
      "Air Conditioning",
      "Nespresso Machine",
      "In-Room Safe",
      "24/7 Room Service",
    ],
  },
  {
    id: 10,
    title: "Courtyard Twin Suite",
    bedType: "Twin",
    view: "Garden View",
    priceNum: 92000,
    price: "₦92,000",
    guests: "2 Guests",
    beds: "2 Twin Beds",
    size: "38 m²",
    rating: "4.7",
    availableUnits: 3,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80",
    about:
      "Overlooking our quiet inner courtyard, this twin suite offers restful acoustic comfort, dual ergonomic desks, and organic cotton linens.",
    amenitiesLeft: [
      "Courtyard View",
      "High-Speed Wi-Fi",
      "Dual Work Desks",
      "Walk-in Shower",
    ],
    amenitiesRight: [
      "Air Conditioning",
      "Tea & Coffee Set",
      "Electronic Safe",
      "Daily Housekeeping",
    ],
  },
  {
    id: 11,
    title: "Royal Panorama Suite",
    bedType: "King",
    view: "City View",
    priceNum: 185000,
    price: "₦185,000",
    guests: "4 Guests",
    beds: "1 King + 1 Sofa Bed",
    size: "74 m²",
    rating: "5.0",
    availableUnits: 2,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80",
    about:
      "Commanding 270-degree skyline views, the Royal Panorama Suite features an expansive living salon, wet bar, and spa-inspired marble bath.",
    amenitiesLeft: [
      "270° Skyline View",
      "Fiber Wi-Fi",
      "Soaking Tub & Shower",
      "Private Bar",
    ],
    amenitiesRight: [
      "Complimentary Breakfast",
      "Executive Lounge",
      "Airport Transfer",
      "24/7 Concierge",
    ],
  },
  {
    id: 12,
    title: "Oasis Family Room",
    bedType: "Twin",
    view: "Garden View",
    priceNum: 130000,
    price: "₦130,000",
    guests: "4 Guests",
    beds: "2 Queen Beds",
    size: "55 m²",
    rating: "4.9",
    availableUnits: 2,
    blockedRanges: [],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
    about:
      "Thoughtfully configured for families and small groups, offering two plush queen beds, garden access, and generous lounge seating.",
    amenitiesLeft: [
      "Two Queen Beds",
      "High-Speed Wi-Fi",
      "Smart 60” TV",
      "Double Vanity",
    ],
    amenitiesRight: [
      "Breakfast Included",
      "Mini Fridge",
      "In-Room Safe",
      "24/7 Room Service",
    ],
  },
];

const REVIEWS = [
  {
    id: 1,
    guest: "Amaka O.",
    stay: "Stayed Oct 2026",
    text: "Spotless suites, warm hospitality, and effortless check-in. The rooftop lounge made our weekend unforgettable.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    guest: "David K.",
    stay: "Stayed Sep 2026",
    text: "Fast Wi-Fi, quiet rooms, and an incredible breakfast spread. Ideal for both business trips and weekend getaways.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    guest: "Zainab M.",
    stay: "Stayed Nov 2026",
    text: "Every detail felt thoughtfully curated. The concierge arranged our airport pickup seamlessly.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    guest: "Tunde A.",
    stay: "Stayed Aug 2026",
    text: "The Executive Suite exceeded expectations. Great lighting, plush bedding, and top-notch room service.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    guest: "Chidinma E.",
    stay: "Stayed Nov 2026",
    text: "Calm garden terrace views, super comfortable bedding, and attentive staff from arrival to check-out.",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    guest: "Femi B.",
    stay: "Stayed Oct 2026",
    text: "Loved the skyline pool and signature dining. Everything felt polished, peaceful, and well-paced.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
  },
];

const REVIEW_DOT_COUNT = 4;

const ARRIVAL_TIME_SLOTS = {
  "Early Check-in Request (11:00 AM)": { hour: 11, label: "11:00 AM" },
  "Standard Check-in (2:00 PM)": { hour: 14, label: "2:00 PM" },
  "Evening Arrival (6:00 PM – 9:00 PM)": { hour: 18, label: "6:00 PM" },
  "Late Night Arrival (After 9:00 PM)": { hour: 21, label: "9:00 PM" },
};

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const stripTimestamp = (dateValue) => {
  if (!dateValue) return "";
  const str = String(dateValue).trim();
  const isoMatch = str.match(/^\d{4}-\d{2}-\d{2}/);
  if (isoMatch) return isoMatch[0];
  return str.split("T")[0].split(" ")[0];
};

const formatDateRangeSlash = (checkIn, checkOut) => {
  const start = stripTimestamp(checkIn);
  const end = stripTimestamp(checkOut) || start;
  if (!start && !end) return "";
  return `${start}/${end}`;
};

const parseGuestNumber = (guestsLabel) => {
  const match = String(guestsLabel || "").match(/\d+/);
  return match ? Number(match[0]) : 1;
};

const normalizeApiRoom = (apiRoom, index) => {
  const fallback = ROOMS_DATA[index % ROOMS_DATA.length];
  const numericPrice = Number(
    apiRoom.priceNum ?? apiRoom.pricePerNight ?? apiRoom.price ?? fallback.priceNum
  );
  const safePriceNum =
    Number.isFinite(numericPrice) && numericPrice > 0
      ? numericPrice
      : fallback.priceNum;

  const guestsVal =
    typeof apiRoom.guests === "number"
      ? `${apiRoom.guests} Guests`
      : apiRoom.guests || apiRoom.maxGuests || fallback.guests;

  return {
    ...fallback,
    ...apiRoom,
    backendId: apiRoom.id ?? apiRoom._id ?? fallback.id,
    id: apiRoom.id ?? apiRoom._id ?? fallback.id,
    title: apiRoom.title || apiRoom.name || fallback.title,
    bedType: apiRoom.bedType || fallback.bedType,
    view: apiRoom.view || fallback.view,
    priceNum: safePriceNum,
    price:
      typeof apiRoom.price === "string" && apiRoom.price.includes("₦")
        ? apiRoom.price
        : `₦${safePriceNum.toLocaleString()}`,
    guests: guestsVal,
    beds: apiRoom.beds || apiRoom.bedConfig || fallback.beds,
    size: apiRoom.size || fallback.size,
    rating: apiRoom.rating || fallback.rating,
    availableUnits:
      apiRoom.availableUnits ?? apiRoom.unitsAvailable ?? fallback.availableUnits,
    blockedRanges: Array.isArray(apiRoom.blockedRanges)
      ? apiRoom.blockedRanges
      : fallback.blockedRanges,
    image: apiRoom.image || apiRoom.imageUrl || fallback.image,
    about: apiRoom.about || apiRoom.description || fallback.about,
    amenitiesLeft: Array.isArray(apiRoom.amenitiesLeft)
      ? apiRoom.amenitiesLeft
      : fallback.amenitiesLeft,
    amenitiesRight: Array.isArray(apiRoom.amenitiesRight)
      ? apiRoom.amenitiesRight
      : fallback.amenitiesRight,
  };
};

export default function App() {
  const earliestCheckInDate = getTodayDateString();

  const [activeScreen, setActiveScreen] = useState("home");
  const [roomsList, setRoomsList] = useState(ROOMS_DATA);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS_DATA[0]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookedToast, setBookedToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Guest reviews carousel scroll position indicator
  const [reviewSlideIndex, setReviewSlideIndex] = useState(0);
  const reviewsTrackRef = useRef(null);

  const [searchForm, setSearchForm] = useState({
    checkIn: earliestCheckInDate,
    checkOut: "2026-11-23",
    guests: "2 Adults",
    rooms: "1 Room",
  });
  const [searchShuffleSeed, setSearchShuffleSeed] = useState(0);
  const [bedFilter, setBedFilter] = useState("All");
  const [viewFilter, setViewFilter] = useState("All");
  const [maxPriceFilter, setMaxPriceFilter] = useState("All");
  const [recommendSort, setRecommendSort] = useState("Recommended");

  // Booking, validation & payment states
  const [guestInfo, setGuestInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    arrivalNote: "Evening Arrival (6:00 PM – 9:00 PM)",
  });
  const [bookingValidationFlags, setBookingValidationFlags] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingRef, setBookingRef] = useState("ID-123455");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Payment confirmation / error modal states
  const [paymentModal, setPaymentModal] = useState({
    open: false,
    status: "success", // "success" | "error"
    errorMessage: "",
  });
  const [copiedId, setCopiedId] = useState(false);

  // Email-only booking lookup modal state
  const [showLookupModal, setShowLookupModal] = useState(false);
  const [lookupForm, setLookupForm] = useState({
    guestEmail: "",
  });
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadRooms = async () => {
      setIsLoadingRooms(true);
      try {
        const res = await fetch(`${API_BASE_URL}/rooms`);
        if (!res.ok) {
          throw new Error(`Rooms request failed with status ${res.status}`);
        }
        const data = await res.json();
        const rawRooms = Array.isArray(data)
          ? data
          : data.rooms || data.data || [];

        if (isMounted && rawRooms.length > 0) {
          const normalized = rawRooms.map((item, idx) => {
            const mapped = normalizeApiRoom(item, idx);
            return {
              ...mapped,
              backendId: item.id ?? item._id ?? mapped.id,
              id: `api-${item.id ?? item._id ?? idx + 1}`,
            };
          });

          const existingTitles = new Set(
            normalized.map((r) => r.title.trim().toLowerCase())
          );

          const extraRooms = ROOMS_DATA.filter(
            (r) => !existingTitles.has(r.title.trim().toLowerCase())
          ).map((r) => ({
            ...r,
            backendId: normalized[0]?.backendId ?? r.id,
            id: `local-${r.id}`,
          }));

          const combinedRooms = [...normalized, ...extraRooms];

          setRoomsList(combinedRooms);
          setSelectedRoom((prev) => {
            const match = combinedRooms.find(
              (room) => String(room.id) === String(prev?.id)
            );
            return match || combinedRooms[0];
          });
        }
      } catch (err) {
        console.warn("Falling back to local rooms data:", err.message);
      } finally {
        if (isMounted) setIsLoadingRooms(false);
      }
    };

    loadRooms();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [menuOpen]);

  const handleNavClick = (action) => {
    setMenuOpen(false);
    action();
  };

  const openRoomDetail = (room) => {
    setSelectedRoom(room);
    setBookingValidationFlags([]);
    setActiveScreen("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (screen) => {
    setBookingValidationFlags([]);
    setReviewSlideIndex(0);
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReviewsScroll = () => {
    const track = reviewsTrackRef.current;
    if (!track) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScroll <= 0 || track.scrollLeft <= 4) {
      setReviewSlideIndex(0);
      return;
    }

    const ratio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
    const dotIdx = Math.min(
      REVIEW_DOT_COUNT - 1,
      Math.round(ratio * (REVIEW_DOT_COUNT - 1))
    );
    setReviewSlideIndex(dotIdx);
  };

  const handleCopyBookingId = async () => {
    try {
      await navigator.clipboard.writeText(bookingRef);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleConfirmPaymentSubmit = (e) => {
    if (e) e.preventDefault();

    setPaymentModal({
      open: true,
      status: "success",
      errorMessage: "",
    });
  };

  const getGuestCapacity = (guestsLabel) => {
    if (guestsLabel.includes("4")) return 4;
    if (guestsLabel.includes("3")) return 3;
    if (guestsLabel.includes("2")) return 2;
    return 1;
  };

  const getRoomGuestCapacity = (roomGuestsStr) => {
    const match = String(roomGuestsStr).match(/\d+/);
    return match ? Number(match[0]) : 1;
  };

  const getRequestedRoomsCount = (roomsLabel) => {
    const match = String(roomsLabel).match(/\d+/);
    return match ? Number(match[0]) : 1;
  };

  const parseDate = (value) => new Date(`${stripTimestamp(value)}T00:00:00`);

  const isDateRangeOverlapping = (startA, endA, startB, endB) => {
    if (!startA || !endA || !startB || !endB) return false;
    return (
      parseDate(startA) < parseDate(endB) && parseDate(endA) > parseDate(startB)
    );
  };

  const checkRoomAvailability = (room, dates, guestsLabel, roomsLabel) => {
    const issues = [];
    if (!room) {
      return { available: false, issues: ["No room selected."] };
    }

    const neededGuests = getGuestCapacity(guestsLabel);
    const roomCap = getRoomGuestCapacity(room.guests);
    if (roomCap < neededGuests) {
      issues.push(
        `${room.title} accommodates up to ${room.guests}, which does not match "${guestsLabel}".`
      );
    }

    const neededRooms = getRequestedRoomsCount(roomsLabel);
    const availableUnits = room.availableUnits ?? 2;
    if (neededRooms > availableUnits) {
      issues.push(
        `Only ${availableUnits} ${availableUnits === 1 ? "unit" : "units"} of ${
          room.title
        } available; you selected ${roomsLabel}.`
      );
    }

    const blockedRanges = room.blockedRanges || [];
    const hasBlockedDates = blockedRanges.some((range) =>
      isDateRangeOverlapping(
        dates.checkIn,
        dates.checkOut,
        range.from,
        range.to
      )
    );
    if (hasBlockedDates) {
      issues.push(
        `${room.title} is not available between ${stripTimestamp(
          dates.checkIn
        )} and ${stripTimestamp(
          dates.checkOut
        )}. Please select different dates or choose another room.`
      );
    }

    return {
      available: issues.length === 0,
      issues,
    };
  };

  const validateCheckInDateAndTime = (checkInStr, checkOutStr, arrivalNote) => {
    const flags = [];
    const todayStr = getTodayDateString();
    const cleanCheckIn = stripTimestamp(checkInStr);
    const cleanCheckOut = stripTimestamp(checkOutStr);

    if (!cleanCheckIn || cleanCheckIn < todayStr) {
      flags.push(
        `Check-in date cannot be earlier than ${todayStr}. Please select today or a future date.`
      );
    }

    if (!cleanCheckOut || parseDate(cleanCheckOut) <= parseDate(cleanCheckIn)) {
      flags.push(
        "Check-out date must be later than the check-in date (at least 1 night)."
      );
    }

    const slot = ARRIVAL_TIME_SLOTS[arrivalNote];
    if (cleanCheckIn === todayStr && slot) {
      const now = new Date();
      const currentHour = now.getHours() + now.getMinutes() / 60;
      if (currentHour > slot.hour + 0.5) {
        flags.push(
          `The selected check-in time (${slot.label}) has already passed for today (${todayStr}). Please choose a later arrival time or a future check-in date.`
        );
      }
    }

    return flags;
  };

  const handleCheckoutRequestSubmit = async (e) => {
    e.preventDefault();

    const dateTimeFlags = validateCheckInDateAndTime(
      searchForm.checkIn,
      searchForm.checkOut,
      guestInfo.arrivalNote
    );
    const availability = checkRoomAvailability(
      selectedRoom,
      searchForm,
      searchForm.guests,
      searchForm.rooms
    );

    const combinedFlags = [...dateTimeFlags, ...availability.issues];
    if (combinedFlags.length > 0) {
      setBookingValidationFlags(combinedFlags);
      return;
    }

    setBookingValidationFlags([]);
    setIsSubmittingBooking(true);

    const cleanCheckIn = stripTimestamp(searchForm.checkIn);
    const cleanCheckOut = stripTimestamp(searchForm.checkOut);

    const requestBody = {
      roomId: selectedRoom.backendId ?? selectedRoom.id,
      guestName: guestInfo.fullName.trim(),
      guestEmail: guestInfo.email.trim(),
      guestPhone: guestInfo.phone.trim(),
      checkIn: cleanCheckIn,
      checkOut: cleanCheckOut,
      numberOfGuests: parseGuestNumber(searchForm.guests),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          data.message ||
          data.error ||
          "Could not complete reservation request. Please try again.";
        setBookingValidationFlags([message]);
        return;
      }

      const bookingObj = data.booking || data.data || data;
      const serverRef =
        bookingObj.bookingReference ||
        bookingObj.reference ||
        bookingObj.id ||
        `ID-${Math.floor(100000 + Math.random() * 900000)}`;

      const latestRecord = {
        bookingReference: String(serverRef),
        guestName: requestBody.guestName,
        guestEmail: requestBody.guestEmail,
        checkIn: stripTimestamp(bookingObj.checkIn || cleanCheckIn),
        checkOut: stripTimestamp(bookingObj.checkOut || cleanCheckOut),
        checkInTime: guestInfo.arrivalNote,
        roomTitle: selectedRoom.title,
      };

      saveLatestBookingForEmail(requestBody.guestEmail, latestRecord);
      setBookingRef(String(serverRef));
      setLookupForm({ guestEmail: requestBody.guestEmail });
      setCopiedId(false);
      setShowBookingModal(true);
    } catch (err) {
      setBookingValidationFlags([
        `Network error while creating booking: ${err.message}`,
      ]);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleBookingLookupSubmit = async (e) => {
    e.preventDefault();
    setLookupError("");
    setLookupResult(null);
    setIsLookingUp(true);

    const email = lookupForm.guestEmail.trim();
    const cachedBooking = getLatestBookingForEmail(email);
    const resolvedRef =
      cachedBooking?.bookingReference ||
      (guestInfo.email.trim().toLowerCase() === email.toLowerCase()
        ? bookingRef
        : "");

    try {
      const res = await fetch(`${API_BASE_URL}/bookings/lookup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingReference: resolvedRef,
          guestEmail: email,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (cachedBooking) {
          setLookupResult({
            ...cachedBooking,
            checkIn: stripTimestamp(cachedBooking.checkIn),
            checkOut: stripTimestamp(cachedBooking.checkOut),
          });
          return;
        }
        setLookupError(
          data.message ||
            data.error ||
            "No recent reservation found for that email address."
        );
        return;
      }

      const apiBooking = data.booking || data.data || data;
      setLookupResult({
        bookingReference:
          apiBooking.bookingReference ||
          apiBooking.reference ||
          apiBooking.id ||
          resolvedRef,
        guestName:
          apiBooking.guestName ||
          apiBooking.guest_name ||
          cachedBooking?.guestName ||
          guestInfo.fullName ||
          "Guest",
        checkIn: stripTimestamp(
          apiBooking.checkIn ||
            apiBooking.check_in ||
            cachedBooking?.checkIn ||
            searchForm.checkIn
        ),
        checkOut: stripTimestamp(
          apiBooking.checkOut ||
            apiBooking.check_out ||
            cachedBooking?.checkOut ||
            searchForm.checkOut
        ),
        checkInTime:
          apiBooking.checkInTime ||
          apiBooking.arrivalTime ||
          cachedBooking?.checkInTime ||
          guestInfo.arrivalNote,
      });
    } catch (err) {
      if (cachedBooking) {
        setLookupResult({
          ...cachedBooking,
          checkIn: stripTimestamp(cachedBooking.checkIn),
          checkOut: stripTimestamp(cachedBooking.checkOut),
        });
      } else {
        setLookupError(`Network error during lookup: ${err.message}`);
      }
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleUpdateSearch = () => {
    setSearchShuffleSeed((prev) => prev + 1);
    setBookedToast(
      `Updated rooms for ${searchForm.guests} (${formatDateRangeSlash(
        searchForm.checkIn,
        searchForm.checkOut
      )})`
    );
    setTimeout(() => setBookedToast(""), 4000);
  };

  const nightsCount = Math.max(
    1,
    Math.round(
      (parseDate(searchForm.checkOut) - parseDate(searchForm.checkIn)) /
        86400000
    )
  );
  const subtotalAmount = (selectedRoom?.priceNum || 0) * nightsCount;
  const serviceTax = Math.round(subtotalAmount * 0.075);
  const grandTotal = subtotalAmount + serviceTax;
  const formatNaira = (amount) => `₦${Math.round(amount).toLocaleString()}`;

  const handleDownloadReceipt = () => {
    const cached = getLatestBookingForEmail(guestInfo.email);
    const receiptText = [
      "==========================================",
      "          ELAN HOTELS - BOOKING RECEIPT",
      "==========================================",
      `Booking ID:      ${bookingRef}`,
      `Status:          CONFIRMED`,
      `Guest Name:      ${guestInfo.fullName || cached?.guestName || "Guest"}`,
      `Guest Email:     ${guestInfo.email || cached?.guestEmail || "N/A"}`,
      `Guest Phone:     ${guestInfo.phone || "N/A"}`,
      `Room / Suite:    ${selectedRoom?.title || cached?.roomTitle || "Suite"}`,
      `Check In Date:   ${formatDateRangeSlash(
        searchForm.checkIn,
        searchForm.checkOut
      )}`,
      `Duration:        ${nightsCount} ${nightsCount === 1 ? "Night" : "Nights"}`,
      `Check-In Time:   ${guestInfo.arrivalNote}`,
      `Payment Method:  ${
        paymentMethod === "card" ? "Debit / Credit Card" : "Bank Transfer"
      }`,
      `Room Subtotal:   ${formatNaira(subtotalAmount)}`,
      `Taxes & Fees:    ${formatNaira(serviceTax)}`,
      `Total Paid:      ${formatNaira(grandTotal)}`,
      "==========================================",
      "Thank you for staying with Elan Hotels.",
      "Support: reservations@elanhotels.com",
    ].join("\n");

    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `elan-hotels-receipt-${bookingRef}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setPaymentModal({
      open: false,
      status: "success",
      errorMessage: "",
    });
    setBookedToast(
      `Receipt downloaded (${bookingRef}) • ${selectedRoom.title}`
    );
    setTimeout(() => setBookedToast(""), 6000);
    navigateTo("home");
  };

  const requestedGuests = getGuestCapacity(searchForm.guests);

  const filteredRooms = (() => {
    const baseList = roomsList.filter((room) => {
      if (bedFilter !== "All" && room.bedType !== bedFilter) return false;
      if (viewFilter !== "All" && room.view !== viewFilter) return false;
      if (maxPriceFilter === "Under100k" && room.priceNum >= 100000) return false;
      if (maxPriceFilter === "Under150k" && room.priceNum >= 150000) return false;
      return true;
    });

    let items = [...baseList];

    if (searchShuffleSeed !== 0) {
      items.sort((a, b) => {
        const numericA = Number(String(a.id).replace(/\D/g, "")) || 1;
        const numericB = Number(String(b.id).replace(/\D/g, "")) || 1;
        const hashA = (numericA * 37 + searchShuffleSeed * 17) % 100;
        const hashB = (numericB * 37 + searchShuffleSeed * 17) % 100;
        return hashA / 100 - hashB / 100;
      });

      items.sort((a, b) => {
        const aFits = getRoomGuestCapacity(a.guests) >= requestedGuests ? 0 : 1;
        const bFits = getRoomGuestCapacity(b.guests) >= requestedGuests ? 0 : 1;
        return aFits - bFits;
      });
    }

    if (recommendSort === "PriceLowToHigh") {
      items.sort((a, b) => a.priceNum - b.priceNum);
    } else if (recommendSort === "PriceHighToLow") {
      items.sort((a, b) => b.priceNum - a.priceNum);
    } else if (recommendSort === "TopRated") {
      items.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    return items;
  })();

  const selectedRoomAvailability = checkRoomAvailability(
    selectedRoom,
    searchForm,
    searchForm.guests,
    searchForm.rooms
  );

  const isCheckoutFlow =
    activeScreen === "checkout" || activeScreen === "payment";

  return (
    <div className="page-wrapper">
      {bookedToast && <div className="booking-toast">✓ {bookedToast}</div>}

      {/* Top Navigation */}
      <header
        ref={navRef}
        className={`navbar ${activeScreen !== "home" ? "navbar-teal" : ""}`}
      >
        <div className="container nav-inner">
          <button
            type="button"
            className="brand-logo btn-reset"
            onClick={() => handleNavClick(() => navigateTo("home"))}
          >
            <img
              src={activeScreen === "home" ? logo : footerLogo}
              alt="Elan Hotels"
              className={`logo-img ${
                activeScreen !== "home" ? "logo-img-alt" : ""
              }`}
            />
          </button>

          {isCheckoutFlow ? (
            <div className="nav-links open">
              <button
                type="button"
                className="nav-item"
                onClick={() => {
                  setLookupError("");
                  setLookupResult(null);
                  setShowLookupModal(true);
                }}
              >
                Find Booking
              </button>
              <button
                type="button"
                className="nav-item"
                onClick={() => {
                  setBookedToast(
                    "Need help? Contact reservations@elanhotels.com or call +234 800 123 4567"
                  );
                  setTimeout(() => setBookedToast(""), 6000);
                }}
              >
                Need Help?
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="hamburger-btn"
                aria-label={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? "✕" : "☰"}
              </button>

              <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className={`nav-item ${
                    activeScreen === "rooms" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(() => navigateTo("rooms"))}
                >
                  Our Rooms
                </button>
                <button
                  type="button"
                  className="nav-item"
                  onClick={() =>
                    handleNavClick(() => {
                      navigateTo("home");
                      setTimeout(() => {
                        document
                          .getElementById("amenities")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    })
                  }
                >
                  Amenities &amp; Spa
                </button>
                <button
                  type="button"
                  className="nav-item"
                  onClick={() =>
                    handleNavClick(() => {
                      setLookupError("");
                      setLookupResult(null);
                      setShowLookupModal(true);
                    })
                  }
                >
                  Find Booking
                </button>

                <button
                  type="button"
                  className={activeScreen === "home" ? "btn-teal" : "btn-gold"}
                  onClick={() => handleNavClick(() => navigateTo("rooms"))}
                >
                  Book a Stay
                </button>
              </nav>
            </>
          )}
        </div>
      </header>

      {/* SCREEN 1: HOME */}
      {activeScreen === "home" && (
        <>
          <section className="hero">
            <div className="hero-overlay" />
            <div className="container hero-content">
              <h1>Effortless style, unforgettable stays</h1>
              <p>
                Experience contemporary luxury, curated comfort, and personalized
                hospitality tailored to every moment of your visit.
              </p>

              <form
                className="booking-bar"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigateTo("rooms");
                }}
              >
                <div className="booking-field">
                  <label>Check In</label>
                  <input
                    type="date"
                    min={earliestCheckInDate}
                    value={searchForm.checkIn}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, checkIn: e.target.value })
                    }
                  />
                </div>
                <div className="booking-field">
                  <label>Check Out</label>
                  <input
                    type="date"
                    min={searchForm.checkIn || earliestCheckInDate}
                    value={searchForm.checkOut}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, checkOut: e.target.value })
                    }
                  />
                </div>
                <div className="booking-field">
                  <label>Number of Guests</label>
                  <select
                    value={searchForm.guests}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, guests: e.target.value })
                    }
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                    <option>4 Guests</option>
                  </select>
                </div>
                <div className="booking-field">
                  <label>Number of Rooms</label>
                  <select
                    value={searchForm.rooms}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, rooms: e.target.value })
                    }
                  >
                    <option>1 Room</option>
                    <option>2 Rooms</option>
                    <option>3 Rooms</option>
                  </select>
                </div>
                <button type="submit" className="btn-gold">
                  Check Availability
                </button>
              </form>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2>Discover Your Stay</h2>
                <p>
                  {isLoadingRooms
                    ? "Loading available rooms..."
                    : "Thoughtfully designed rooms and suites blending modern elegance with restful comfort."}
                </p>
              </div>

              <div className="rooms-grid">
                {roomsList.slice(0, 4).map((room) => (
                  <article
                    key={room.id}
                    className="room-card clickable"
                    onClick={() => openRoomDetail(room)}
                  >
                    <div className="room-image-wrap">
                      <img src={room.image} alt={room.title} />
                    </div>
                    <div className="room-info">
                      <h3>{room.title}</h3>
                      <p className="room-specs">
                        {room.guests} • {room.beds} • {room.size}
                      </p>
                      <div className="room-meta">
                        <span className="stars">★★★★★</span>
                        <span className="room-price">{room.price} / night</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="section-cta">
                <button
                  type="button"
                  className="btn-teal"
                  onClick={() => navigateTo("rooms")}
                >
                  View All
                </button>
              </div>
            </div>
          </section>

          <section className="section amenities-section" id="amenities">
            <div className="container">
              <div className="section-header">
                <h2>Our Hotel Highlights &amp; Amenities</h2>
                <p>
                  Everything you need for a seamless, restorative, and memorable
                  stay.
                </p>
              </div>

              <div className="amenities-grid">
                {AMENITIES.map((item) => (
                  <div key={item.title} className="amenity-card">
                    <div className="amenity-icon">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="amenity-icon-img"
                      />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2>Guest Reviews &amp; Testimonials</h2>
              </div>

              <div
                ref={reviewsTrackRef}
                className="reviews-grid reviews-carousel"
                role="region"
                aria-label="Guest reviews carousel"
                onScroll={handleReviewsScroll}
              >
                {REVIEWS.map((review) => (
                  <article key={review.id} className="review-card">
                    <div className="review-image-wrap">
                      <img src={review.image} alt={`Stay by ${review.guest}`} />
                    </div>
                    <div className="stars">★★★★★</div>
                    <p className="review-text">“{review.text}”</p>
                    <span className="review-author">{review.guest}</span>
                  </article>
                ))}
              </div>

              <div className="carousel-dots" aria-hidden="true">
                {Array.from({ length: REVIEW_DOT_COUNT }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${reviewSlideIndex === idx ? "active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* SCREEN 2: OUR ROOMS CATALOG */}
      {activeScreen === "rooms" && (
        <section className="catalog-page">
          <div className="sticky-search-strip">
            <div className="container strip-inner">
              <span className="strip-title">Select Your Stay</span>
              <div className="strip-controls">
                <input
                  type="date"
                  min={earliestCheckInDate}
                  value={searchForm.checkIn}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, checkIn: e.target.value })
                  }
                />
                <input
                  type="date"
                  min={searchForm.checkIn || earliestCheckInDate}
                  value={searchForm.checkOut}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, checkOut: e.target.value })
                  }
                />
                <select
                  value={searchForm.guests}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, guests: e.target.value })
                  }
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>2 Adults, 1 Child</option>
                  <option>4 Guests</option>
                </select>
                <button
                  type="button"
                  className="btn-teal btn-sm"
                  onClick={handleUpdateSearch}
                >
                  Update Search
                </button>
              </div>
            </div>
          </div>

          <div className="container catalog-body">
            <div className="filter-bar">
              <select
                value={bedFilter}
                onChange={(e) => setBedFilter(e.target.value)}
              >
                <option value="All">Bed Type: All</option>
                <option value="King">King Bed</option>
                <option value="Twin">Twin / Queen</option>
              </select>

              <select
                value={viewFilter}
                onChange={(e) => setViewFilter(e.target.value)}
              >
                <option value="All">View: All</option>
                <option value="City View">City View</option>
                <option value="Ocean View">Ocean View</option>
                <option value="Garden View">Garden View</option>
              </select>

              <select
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(e.target.value)}
              >
                <option value="All">Price Range: All</option>
                <option value="Under100k">Under ₦100,000 / night</option>
                <option value="Under150k">Under ₦150,000 / night</option>
              </select>

              {(bedFilter !== "All" ||
                viewFilter !== "All" ||
                maxPriceFilter !== "All") && (
                <button
                  type="button"
                  className="clear-filters"
                  onClick={() => {
                    setBedFilter("All");
                    setViewFilter("All");
                    setMaxPriceFilter("All");
                  }}
                >
                  Clear filters
                </button>
              )}

              <div className="recommend-box">
                <select
                  id="recommend-select"
                  aria-label="Sort rooms"
                  value={recommendSort}
                  onChange={(e) => setRecommendSort(e.target.value)}
                >
                  <option value="Recommended">Recommended</option>
                  <option value="PriceLowToHigh">Price: Low to High</option>
                  <option value="PriceHighToLow">Price: High to Low</option>
                  <option value="TopRated">Top Rated</option>
                </select>
              </div>
            </div>

            <div className="rooms-grid catalog-grid">
              {filteredRooms.map((room) => (
                <article key={room.id} className="room-card catalog-card">
                  <div
                    className="room-image-wrap clickable"
                    onClick={() => openRoomDetail(room)}
                  >
                    <img src={room.image} alt={room.title} />
                  </div>
                  <div className="room-info">
                    <h3
                      className="clickable"
                      onClick={() => openRoomDetail(room)}
                    >
                      {room.title}
                    </h3>
                    <p className="room-specs">
                      {room.guests} • {room.beds} • {room.view}
                    </p>
                    <div className="room-price-row">{room.price} / night</div>
                    <div className="catalog-card-footer">
                      <span className="stars">★★★★★</span>
                      <button
                        type="button"
                        className="btn-teal btn-xs"
                        onClick={() => openRoomDetail(room)}
                      >
                        View Detail
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCREEN 3: ROOM DETAIL */}
      {activeScreen === "detail" && selectedRoom && (
        <section className="detail-page">
          <div className="container">
            <button
              type="button"
              className="back-link"
              onClick={() => navigateTo("rooms")}
            >
              ‹ Room Details
            </button>

            <div className="detail-card">
              <div className="detail-hero-image">
                <img src={selectedRoom.image} alt={selectedRoom.title} />
              </div>

              <div className="detail-content">
                <div className="detail-header">
                  <h2>{selectedRoom.title}</h2>
                  <p className="detail-specs">
                    <span>Guests: {selectedRoom.guests}</span>
                    <span>•</span>
                    <span>Bed: {selectedRoom.beds}</span>
                    <span>•</span>
                    <span>Size: {selectedRoom.size}</span>
                    <span>•</span>
                    <span>View: {selectedRoom.view}</span>
                  </p>
                </div>

                {!selectedRoomAvailability.available && (
                  <div className="validation-flag-box" role="alert">
                    <strong>Room Availability Notice:</strong>
                    <ul>
                      {selectedRoomAvailability.issues.map((issue) => (
                        <li key={issue}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="detail-block">
                  <h3>About</h3>
                  <p>{selectedRoom.about}</p>
                </div>

                <div className="detail-block">
                  <h3>Amenities</h3>
                  <div className="detail-amenities-cols">
                    <ul>
                      {selectedRoom.amenitiesLeft.map((item) => (
                        <li key={item}>✓ {item}</li>
                      ))}
                    </ul>
                    <ul>
                      {selectedRoom.amenitiesRight.map((item) => (
                        <li key={item}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="detail-booking-footer">
                  <div className="detail-price">
                    <span className="price-amount">{selectedRoom.price}</span>
                    <span className="price-unit"> / Per Night</span>
                  </div>
                  <button
                    type="button"
                    className="btn-teal"
                    onClick={() => navigateTo("checkout")}
                  >
                    Select Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SCREEN 4: GUEST DETAILS / PERSONAL INFORMATION */}
      {activeScreen === "checkout" && selectedRoom && (
        <section className="checkout-page">
          <div className="container">
            <button
              type="button"
              className="back-link"
              onClick={() => navigateTo("detail")}
            >
              ‹ Guest Details
            </button>

            <div className="checkout-grid">
              <form
                className="checkout-card"
                onSubmit={handleCheckoutRequestSubmit}
              >
                <div className="checkout-card-header">
                  <h2>Personal Information</h2>
                  <p>Please enter your details to reserve your selected suite.</p>
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yetunde Adeyemo"
                    value={guestInfo.fullName}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={guestInfo.email}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={guestInfo.phone}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, phone: e.target.value })
                    }
                  />
                </div>

                <div className="checkout-sub-heading">
                  <h3>Check-In Date, Time &amp; Arrival Preferences</h3>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Check-In Date (Earliest: {earliestCheckInDate})</label>
                    <input
                      type="date"
                      required
                      min={earliestCheckInDate}
                      value={stripTimestamp(searchForm.checkIn)}
                      onChange={(e) => {
                        setBookingValidationFlags([]);
                        setSearchForm({
                          ...searchForm,
                          checkIn: stripTimestamp(e.target.value),
                        });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Check-Out Date</label>
                    <input
                      type="date"
                      required
                      min={
                        stripTimestamp(searchForm.checkIn) ||
                        earliestCheckInDate
                      }
                      value={stripTimestamp(searchForm.checkOut)}
                      onChange={(e) => {
                        setBookingValidationFlags([]);
                        setSearchForm({
                          ...searchForm,
                          checkOut: stripTimestamp(e.target.value),
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Estimated Check-in Time</label>
                  <select
                    value={guestInfo.arrivalNote}
                    onChange={(e) => {
                      setBookingValidationFlags([]);
                      setGuestInfo({
                        ...guestInfo,
                        arrivalNote: e.target.value,
                      });
                    }}
                  >
                    <option>Early Check-in Request (11:00 AM)</option>
                    <option>Standard Check-in (2:00 PM)</option>
                    <option>Evening Arrival (6:00 PM – 9:00 PM)</option>
                    <option>Late Night Arrival (After 9:00 PM)</option>
                  </select>
                </div>

                {bookingValidationFlags.length > 0 && (
                  <div className="validation-flag-box" role="alert">
                    <strong>Please resolve the following flags:</strong>
                    <ul>
                      {bookingValidationFlags.map((flag) => (
                        <li key={flag}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-teal"
                  disabled={isSubmittingBooking}
                >
                  {isSubmittingBooking
                    ? "Submitting Request..."
                    : "Confirm Request"}
                </button>
              </form>

              <aside className="booking-summary-card">
                <h3>Booking Summary</h3>
                <p className="summary-subtitle">{selectedRoom.title}</p>

                <div className="summary-room-thumb">
                  <img src={selectedRoom.image} alt={selectedRoom.title} />
                </div>

                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Check-In</span>
                    <strong>{stripTimestamp(searchForm.checkIn)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Check-Out</span>
                    <strong>{stripTimestamp(searchForm.checkOut)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Guests</span>
                    <strong>{searchForm.guests}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Room Rate</span>
                    <strong>
                      {selectedRoom.price} × {nightsCount}{" "}
                      {nightsCount === 1 ? "night" : "nights"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    <span>Taxes &amp; Fees (7.5%)</span>
                    <strong>{formatNaira(serviceTax)}</strong>
                  </div>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <strong>{formatNaira(grandTotal)}</strong>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* EMAIL-ONLY BOOKING LOOKUP MODAL */}
      {showLookupModal && (
        <div
          className="booking-modal-backdrop"
          onClick={() => setShowLookupModal(false)}
        >
          <div
            className="booking-modal-card lookup-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Find Your Reservation</h3>
            <p className="modal-desc">
              Enter your email address to retrieve your latest booking details.
            </p>

            <form onSubmit={handleBookingLookupSubmit} className="lookup-form">
              <div className="form-group lookup-email-field">
                <label htmlFor="lookup-guest-email">Guest Email</label>
                <input
                  id="lookup-guest-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={lookupForm.guestEmail}
                  onChange={(e) =>
                    setLookupForm({ guestEmail: e.target.value })
                  }
                />
              </div>

              {lookupError && (
                <div className="validation-flag-box" role="alert">
                  {lookupError}
                </div>
              )}

              <button
                type="submit"
                className="btn-teal btn-full"
                disabled={isLookingUp}
              >
                {isLookingUp ? "Searching..." : "Find Latest Booking"}
              </button>
            </form>

            {lookupResult && (
              <div className="lookup-details-box">
                <div className="lookup-ref-header">
                  <span>Reference ID</span>
                  <strong>{lookupResult.bookingReference}</strong>
                </div>

                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Guest Name</span>
                    <strong>{lookupResult.guestName}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Check In Date</span>
                    <strong>
                      {formatDateRangeSlash(
                        lookupResult.checkIn,
                        lookupResult.checkOut
                      )}
                    </strong>
                  </div>
                  <div className="summary-row">
                    <span>Check-In Time</span>
                    <strong>{lookupResult.checkInTime}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOOKING REQUEST CONFIRMATION MODAL */}
      {showBookingModal && (
        <div
          className="booking-modal-backdrop"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="booking-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-check-circle">✓</div>
            <h3>Booking Request Confirmed</h3>
            <p className="modal-desc">
              Your reservation request for <strong>{selectedRoom.title}</strong>{" "}
              has been received. Keep your reference ID handy.
            </p>

            <div className="modal-ref-box">
              <span>Booking Reference</span>
              <strong>{bookingRef}</strong>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-outline-danger"
                onClick={() => {
                  setShowBookingModal(false);
                  navigateTo("home");
                }}
              >
                Cancel Booking
              </button>
              <button
                type="button"
                className="btn-teal"
                onClick={() => {
                  setShowBookingModal(false);
                  navigateTo("payment");
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT CONFIRMATION / ERROR MODAL */}
      {paymentModal.open && (
        <div
          className="booking-modal-backdrop"
          onClick={() => {
            if (paymentModal.status === "error") {
              setPaymentModal((prev) => ({ ...prev, open: false }));
            }
          }}
        >
          <div
            className="booking-modal-card payment-result-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {paymentModal.status === "success" ? (
              <>
                <div className="payment-status-icon success">✓</div>
                <h3 className="payment-modal-title">Booking confirmed!</h3>
                <p className="payment-modal-subtext">
                  Your payment was successful and your reservation has been
                  confirmed.
                </p>

                <div className="payment-id-block">
                  <span className="payment-id-label">Booking ID</span>
                  <strong className="payment-id-value">{bookingRef}</strong>
                  <button
                    type="button"
                    className="copy-id-btn"
                    onClick={handleCopyBookingId}
                  >
                    <span aria-hidden="true">❐</span>
                    <span>{copiedId ? "Copied!" : "Copy ID"}</span>
                  </button>
                </div>

                <p className="payment-email-note">
                  A booking confirmation has been sent to your email address.
                </p>

                <button
                  type="button"
                  className="btn-teal payment-done-btn"
                  onClick={handleDownloadReceipt}
                >
                  Download Receipt
                </button>
              </>
            ) : (
              <>
                <div className="payment-status-icon error">✕</div>
                <h3 className="payment-modal-title error-title">
                  Payment failed
                </h3>
                <p className="payment-modal-subtext">
                  {paymentModal.errorMessage}
                </p>

                <div className="payment-id-block error-box">
                  <span className="payment-id-label">Booking ID</span>
                  <strong className="payment-id-value">{bookingRef}</strong>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-outline-danger"
                    onClick={() => {
                      setPaymentModal({
                        open: false,
                        status: "success",
                        errorMessage: "",
                      });
                      navigateTo("home");
                    }}
                  >
                    Cancel Booking
                  </button>
                  <button
                    type="button"
                    className="btn-teal"
                    onClick={() =>
                      setPaymentModal((prev) => ({ ...prev, open: false }))
                    }
                  >
                    Try Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* SCREEN 5: COMPLETE PAYMENT */}
      {activeScreen === "payment" && selectedRoom && (
        <section className="checkout-page">
          <div className="container">
            <button
              type="button"
              className="back-link"
              onClick={() => navigateTo("checkout")}
            >
              ‹ Complete Payment
            </button>

            <div className="checkout-grid">
              <div className="payment-left-col">
                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <h2>Select Payment Method</h2>
                    <p>
                      Choose your preferred way to complete your reservation.
                    </p>
                  </div>

                  <div className="payment-ref-pill">
                    <span>Booking ID:</span>
                    <strong>{bookingRef}</strong>
                  </div>

                  <div className="payment-methods-list">
                    <label
                      className={`payment-option ${
                        paymentMethod === "card" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <span>Pay with Debit / Credit Card</span>
                    </label>

                    <label
                      className={`payment-option ${
                        paymentMethod === "transfer" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={paymentMethod === "transfer"}
                        onChange={() => setPaymentMethod("transfer")}
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === "card" ? (
                  <form
                    id="payment-form"
                    className="checkout-card"
                    onSubmit={handleConfirmPaymentSubmit}
                  >
                    <div className="checkout-card-header">
                      <h3>Card Details</h3>
                      <p>Transactions are encrypted and processed securely.</p>
                    </div>

                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Name on card"
                        value={cardDetails.holderName}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            holderName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength="19"
                        placeholder="0000 0000 0000 0000"
                        value={cardDetails.cardNumber}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cardNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-row-two">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          required
                          maxLength="5"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiry: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="password"
                          required
                          maxLength="4"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="checkout-card">
                    <div className="checkout-card-header">
                      <h3>Bank Transfer Details</h3>
                      <p>
                        Transfer the exact total below and click Confirm Payment.
                      </p>
                    </div>

                    <div className="summary-rows">
                      <div className="summary-row">
                        <span>Bank Name</span>
                        <strong>Elan Hospitality Trust Bank</strong>
                      </div>
                      <div className="summary-row">
                        <span>Account Name</span>
                        <strong>Elan Hotels Nigeria Ltd</strong>
                      </div>
                      <div className="summary-row">
                        <span>Account Number</span>
                        <strong>0123456789</strong>
                      </div>
                      <div className="summary-row">
                        <span>Payment Reference</span>
                        <strong>{bookingRef}</strong>
                      </div>
                      <div className="summary-row">
                        <span>Amount Due</span>
                        <strong>{formatNaira(grandTotal)}</strong>
                      </div>
                    </div>

                    <p className="transfer-note">
                      Please use your booking reference as the transfer
                      description. Your booking will be confirmed once we
                      receive payment.
                    </p>
                  </div>
                )}
              </div>

              <aside className="booking-summary-card">
                <h3>Booking Summary</h3>
                <p className="summary-subtitle">{selectedRoom.title}</p>

                <div className="summary-room-thumb">
                  <img src={selectedRoom.image} alt={selectedRoom.title} />
                </div>

                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Check-In</span>
                    <strong>{stripTimestamp(searchForm.checkIn)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Check-Out</span>
                    <strong>{stripTimestamp(searchForm.checkOut)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Duration</span>
                    <strong>
                      {nightsCount} {nightsCount === 1 ? "Night" : "Nights"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    <span>Room Subtotal</span>
                    <strong>{formatNaira(subtotalAmount)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Taxes &amp; Fees</span>
                    <strong>{formatNaira(serviceTax)}</strong>
                  </div>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <strong>{formatNaira(grandTotal)}</strong>
                </div>

                {paymentMethod === "card" ? (
                  <button
                    type="submit"
                    form="payment-form"
                    className="btn-teal btn-full"
                  >
                    Confirm Payment
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-teal btn-full"
                    onClick={handleConfirmPaymentSubmit}
                  >
                    Confirm Payment
                  </button>
                )}

                <p className="summary-footnote">
                  By confirming payment, you agree to Elan Hotels&apos; booking
                  and cancellation terms.
                </p>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* GLOBAL FOOTER (Hidden on Guest Details & Payment Screens) */}
      {!isCheckoutFlow && (
        <footer className="footer" id="footer">
          <div className="container footer-grid">
            <div>
              <div className="footer-logo">
                <img
                  src={footerLogo}
                  alt="Elan Hotels Emblem"
                  className="footer-emblem"
                />
              </div>
              <p className="footer-desc">
                Refined urban hospitality offering serene suites, elevated
                dining, and thoughtful service in the heart of the city.
              </p>
              <div className="social-row">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="social-img"
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="social-img"
                  />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                >
                  <img src={xIcon} alt="X" className="social-img" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    src={linkedinIcon}
                    alt="LinkedIn"
                    className="social-img"
                  />
                </a>
              </div>
              <ul className="contact-list">
                <li>✉ reservations@elanhotels.com</li>
                <li>☎ +234 800 123 4567</li>
                <li>📍 Victoria Island, Lagos, Nigeria</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <button type="button" onClick={() => navigateTo("home")}>
                    About Us
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("rooms")}>
                    Rooms &amp; Suites
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("home")}>
                    Amenities
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("home")}>
                    Guest Reviews
                  </button>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#footer">Help Center</a>
                </li>
                <li>
                  <a href="#footer">Cancellation Policy</a>
                </li>
                <li>
                  <a href="#footer">Privacy Policy</a>
                </li>
                <li>
                  <a href="#footer">FAQs</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Elan Hotels. All Rights Reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}