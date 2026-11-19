import { useState } from "react";
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
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [selectedRoom, setSelectedRoom] = useState(ROOMS_DATA[0]);
  const [bookedToast, setBookedToast] = useState("");

  const [searchForm, setSearchForm] = useState({
    checkIn: "2026-11-20",
    checkOut: "2026-11-23",
    guests: "2 Adults",
    rooms: "1 Room",
  });
  const [bedFilter, setBedFilter] = useState("All");
  const [viewFilter, setViewFilter] = useState("All");
  const [maxPriceFilter, setMaxPriceFilter] = useState("All");

  const openRoomDetail = (room) => {
    setSelectedRoom(room);
    setActiveScreen("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (screen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectRoomBooking = (room) => {
    setBookedToast(
      `Reserved "${room.title}" (${room.price}/night) for ${searchForm.guests} • ${searchForm.checkIn} to ${searchForm.checkOut}`
    );
    setTimeout(() => setBookedToast(""), 5000);
  };

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (bedFilter !== "All" && room.bedType !== bedFilter) return false;
    if (viewFilter !== "All" && room.view !== viewFilter) return false;
    if (maxPriceFilter === "Under100k" && room.priceNum >= 100000) return false;
    if (maxPriceFilter === "Under150k" && room.priceNum >= 150000) return false;
    return true;
  });

  return (
    <div className="page-wrapper">
      {bookedToast && <div className="booking-toast">✓ {bookedToast}</div>}

      {/* Top Navigation */}
      <header
        className={`navbar ${activeScreen !== "home" ? "navbar-teal" : ""}`}
      >
        <div className="container nav-inner">
          <button
            type="button"
            className="brand-logo btn-reset"
            onClick={() => navigateTo("home")}
          >
            <img src={logo} alt="Elan Hotels" className="logo-img" />
          </button>

          <nav className="nav-links">
            <button
              type="button"
              className={`nav-item ${activeScreen === "rooms" ? "active" : ""}`}
              onClick={() => navigateTo("rooms")}
            >
              Our Rooms
            </button>
            <button
              type="button"
              className="nav-item"
              onClick={() => {
                navigateTo("home");
                setTimeout(() => {
                  document
                    .getElementById("amenities")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              Amenities &amp; Spa
            </button>
            <button
              type="button"
              className="nav-item"
              onClick={() => {
                document
                  .getElementById("footer")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Us
            </button>

            <button
              type="button"
              className={activeScreen === "home" ? "btn-teal" : "btn-gold"}
              onClick={() => navigateTo("rooms")}
            >
              Book a Stay
            </button>
          </nav>
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
                  Thoughtfully designed rooms and suites blending modern elegance
                  with restful comfort.
                </p>
              </div>

              <div className="rooms-grid">
                {ROOMS_DATA.slice(0, 4).map((room) => (
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

              <div className="reviews-grid">
                {REVIEWS.map((review) => (
                  <article key={review.id} className="review-card">
                    <div className="review-image-wrap">
                      <img src={review.image} alt={`Stay by ${review.guest}`} />
                    </div>
                    <div className="stars">★★★★★</div>
                    <p className="review-text">“{review.text}”</p>
                    <span className="review-author">
                      {review.guest}
                    </span>
                  </article>
                ))}
              </div>

              <div className="carousel-dots">
                <span className="dot active" />
                <span className="dot" />
                <span className="dot" />
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
                  value={searchForm.checkIn}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, checkIn: e.target.value })
                  }
                />
                <input
                  type="date"
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
                <button type="button" className="btn-teal btn-sm">
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
              ‹ Our Rooms
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
                    onClick={() => handleSelectRoomBooking(selectedRoom)}
                  >
                    Select Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GLOBAL FOOTER */}
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
              Refined urban hospitality offering serene suites, elevated dining,
              and thoughtful service in the heart of the city.
            </p>
            <div className="social-row">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <img src={facebookIcon} alt="Facebook" className="social-img" />
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
                <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
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
    </div>
  );
}