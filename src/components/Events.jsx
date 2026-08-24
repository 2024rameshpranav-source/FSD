import { useState, useEffect } from "react";
import EventCard from "./EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading event data
    const timer = setTimeout(() => {
      setEvents([
        {
          title: "Tech Innovation Summit",
          category: "Technology",
          date: "18 September 2026",
          location: "Mumbai, India",
          description:
            "Explore emerging technologies, innovative ideas and the future of digital transformation.",
          image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Creative Design Workshop",
          category: "Workshop",
          date: "25 September 2026",
          location: "Pune, India",
          description:
            "Learn creative design techniques and collaborate with designers and creators.",
          image:
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Music & Culture Festival",
          category: "Music",
          date: "03 October 2026",
          location: "Mumbai, India",
          description:
            "Experience live performances, cultural activities and an unforgettable evening.",
          image:
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
        },
        {
          title: "Startup Networking Meet",
          category: "Business",
          date: "12 October 2026",
          location: "Mumbai, India",
          description:
            "Connect with entrepreneurs, professionals and startup enthusiasts.",
          image:
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=80",
        },
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = [
    "All",
    "Technology",
    "Workshop",
    "Music",
    "Business",
  ];

  return (
    <section
      id="events"
      className="bg-white px-6 py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a36f72]">
            Upcoming Events
          </p>

          <h2 className="mt-3 font-serif text-4xl text-[#403737] md:text-5xl">
            Find Your Next{" "}
            <span className="italic text-[#9c686b]">
              Experience.
            </span>
          </h2>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-xl">
          <input
            type="text"
            placeholder="Search for an event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-6 py-4 outline-none transition focus:border-[#70484b] focus:ring-2 focus:ring-[#eadbdd]"
          />
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-[#70484b] text-white"
                  : "bg-[#f3eeee] text-[#70484b] hover:bg-[#eadbdd]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <p className="mt-14 text-center text-lg text-gray-500">
            Loading events...
          </p>
        ) : (
          <>
            {/* Events */}
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.title}
                  event={event}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredEvents.length === 0 && (
              <p className="mt-14 text-center text-gray-500">
                No events found.
              </p>
            )}
          </>
        )}

      </div>
    </section>
  );
}

export default Events;