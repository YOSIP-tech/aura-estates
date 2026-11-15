
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("is-open");

    const isOpen = navigation.classList.contains("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}



/* AURA ESTATES — PROPERTY CATALOG */

const catalogProperties = [
  {
    id: "villa-aurora",
    name: "Villa Aurora",
    location: "Marbella",
    type: "villa",
    price: 2450000,
    beds: 4,
    baths: 3,
    area: 320,
    image: "assets/villa-aurora.jpg"
  },
  {
    id: "sea-view-penthouse",
    name: "Sea View Penthouse",
    location: "Málaga",
    type: "penthouse",
    price: 1250000,
    beds: 3,
    baths: 2,
    area: 210,
    image: "assets/sea-view-penthouse.jpg"
  },
  {
    id: "modern-residence",
    name: "Modern Residence",
    location: "Estepona",
    type: "residence",
    price: 1890000,
    beds: 4,
    baths: 3,
    area: 285,
    image: "assets/modern-residence.jpg"
  },
  {
    id: "coastal-villa",
    name: "Coastal Villa",
    location: "Marbella",
    type: "villa",
    price: 3100000,
    beds: 5,
    baths: 4,
    area: 380,
    image: "assets/coastal-villa.jpg"
  },
  {
    id: "marina-penthouse",
    name: "Marina Penthouse",
    location: "Benalmádena",
    type: "penthouse",
    price: 980000,
    beds: 2,
    baths: 2,
    area: 165,
    image: "assets/marina-penthouse.jpg"
  },
  {
    id: "hillside-residence",
    name: "Hillside Residence",
    location: "Mijas",
    type: "residence",
    price: 1650000,
    beds: 3,
    baths: 3,
    area: 270,
    image: "assets/hillside-residence.jpg"
  }
];

const catalogForm = document.querySelector("#catalog-filters");

if (catalogForm) {
  const catalogGrid = document.querySelector("#catalog-grid");
  const resultsCount = document.querySelector("#results-count");

  const euro = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  });

  function renderCatalog() {
    const location = document.querySelector("#location-filter").value;
    const type = document.querySelector("#type-filter").value;
    const price = document.querySelector("#price-filter").value;
    const sort = document.querySelector("#sort-filter").value;

    let filtered = catalogProperties.filter((property) => {
      const matchesLocation =
        location === "all" || property.location === location;

      const matchesType =
        type === "all" || property.type === type;

      let matchesPrice = true;

      if (price === "under-1m") {
        matchesPrice = property.price < 1000000;
      } else if (price === "1m-2m") {
        matchesPrice =
          property.price >= 1000000 &&
          property.price <= 2000000;
      } else if (price === "over-2m") {
        matchesPrice = property.price > 2000000;
      }

      return matchesLocation && matchesType && matchesPrice;
    });

    if (sort === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    resultsCount.textContent =
      `${filtered.length} ${filtered.length === 1 ? "Property" : "Properties"} Found`;

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <p class="empty-results">
          No properties match your filters.
          Try changing your search.
        </p>
      `;
      return;
    }

    catalogGrid.innerHTML = filtered.map((property) => `
      <article class="property-card">
        <a class="property-link"
           href="property.html?id=${property.id}">

          <img src="${property.image}"
               alt="${property.name}"
               loading="lazy">

          <div class="property-info">
            <span>${property.location.toUpperCase()}, SPAIN</span>

            <h3>${property.name}</h3>

            <p class="price">${euro.format(property.price)}</p>

            <div class="property-features">
              <span>${property.beds} Beds</span>
              <span>${property.baths} Baths</span>
              <span>${property.area} m²</span>
            </div>
          </div>

        </a>
      </article>
    `).join("");
  }

  catalogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderCatalog();
  });

  renderCatalog();
}



/* PROPERTY DETAILS */

const detailRoot = document.querySelector("#property-detail");

if (detailRoot) {
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("id") || "villa-aurora";

  const property = catalogProperties.find(
    (item) => item.id === propertyId
  );

  if (!property) {
    detailRoot.innerHTML = `
      <div class="detail-not-found">
        <h1>Property Not Found</h1>
        <p>This property is not available in our demo catalog.</p>
        <a href="properties.html" class="primary-btn">
          Back to Properties
        </a>
      </div>
    `;
  } else {
    const euro = new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    });

    document.title = `${property.name} | AURA ESTATES`;

    detailRoot.innerHTML = `
      <a href="properties.html" class="back-link">
        ← Back to Properties
      </a>

      <div class="detail-heading">
        <div>
          <span class="eyebrow">
            ${property.location.toUpperCase()}, SPAIN
          </span>
          <h1>${property.name}</h1>
        </div>

        <strong class="detail-price">
          ${euro.format(property.price)}
        </strong>
      </div>

      <div class="detail-cover">
        <img src="${property.image}"
             alt="${property.name} exterior"
             fetchpriority="high">
      </div>

      <div class="detail-layout">
        <section class="detail-information">
          <h2>Property Overview</h2>

          <div class="detail-stats">
            <div class="stat-card">
              <span>Bedrooms</span>
              <strong>${property.beds}</strong>
            </div>

            <div class="stat-card">
              <span>Bathrooms</span>
              <strong>${property.baths}</strong>
            </div>

            <div class="stat-card">
              <span>Living Area</span>
              <strong>${property.area} m²</strong>
            </div>
          </div>

          <h2>About This Property</h2>

          <p>
            Discover ${property.name}, an exclusive
            ${property.type} in ${property.location},
            presented as part of the AURA ESTATES
            portfolio collection.
          </p>

          <p>
            This illustrative residence features
            ${property.beds} bedrooms,
            ${property.baths} bathrooms and
            ${property.area} m² of living space,
            combining refined design with
            Mediterranean-inspired living.
          </p>
        </section>

        <aside class="detail-contact">
          <span class="eyebrow">EXCLUSIVE PROPERTY</span>
          <h2>Interested in ${property.name}?</h2>

          <p>
            Get in touch to explore this
            portfolio demonstration.
          </p>

          <a href="contact.html?property=${property.id}"
             class="detail-contact-btn">
            Request Information
          </a>

          <p class="detail-small">
            Fictional listing · Portfolio concept
          </p>
        </aside>
      </div>
    `;
  }
}



/* CONTACT CONFIGURATION */

const CONTACT_EMAIL = "";
const CONTACT_WHATSAPP = "";

/*
  CONTACT_EMAIL: your public studio email
  CONTACT_WHATSAPP: number in international format,
  digits only, without + or spaces
*/

const enquiryForm = document.querySelector("#enquiry-form");

if (enquiryForm) {
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const selectedProperty = catalogProperties.find(
    (item) => item.id === propertyId
  );

  const propertyLabel = document.querySelector("#enquiry-property");
  const feedback = document.querySelector("#enquiry-feedback");
  const whatsappHolder = document.querySelector("#whatsapp-holder");

  if (selectedProperty) {
    propertyLabel.hidden = false;
    propertyLabel.textContent =
      `Enquiry about: ${selectedProperty.name}`;
  }

  if (CONTACT_WHATSAPP) {
    const whatsappLink = document.createElement("a");
    whatsappLink.href =
      `https://wa.me/${CONTACT_WHATSAPP}`;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.textContent = "Chat on WhatsApp";
    whatsappHolder.replaceChildren(whatsappLink);
  }

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!CONTACT_EMAIL) {
      feedback.textContent =
        "This is a portfolio demo. Message sending is not configured.";
      return;
    }

    const name = document.querySelector("#enquiry-name").value;
    const email = document.querySelector("#enquiry-email").value;
    const message = document.querySelector("#enquiry-message").value;

    const subject = selectedProperty
      ? `Enquiry about ${selectedProperty.name}`
      : "AURA ESTATES Website Enquiry";

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message
    ].join("\n");

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    feedback.textContent =
      "Your email app should open with a draft. Send it from there.";

    window.location.href = mailtoUrl;
  });
}



/* SHARED PREMIUM FOOTER */

document.querySelectorAll(".footer").forEach((footer) => {
  footer.innerHTML = `
    <div class="container">
      <div class="footer-top">

        <div class="footer-brand">
          <a href="index.html" class="logo">AURA ESTATES</a>
          <p>Exclusive Homes. Exceptional Living.</p>
        </div>

        <div class="footer-column">
          <h3>Explore</h3>
          <a href="index.html">Home</a>
          <a href="properties.html">Properties</a>
          <a href="index.html#about">About Us</a>
          <a href="contact.html">Contact</a>
        </div>

        <div class="footer-column">
          <h3>Concept Locations</h3>
          <span>Marbella</span>
          <span>Málaga</span>
          <span>Estepona</span>
        </div>

      </div>

      <div class="footer-bottom">
        <span>
          © ${new Date().getFullYear()} AURA ESTATES.
          All rights reserved.
        </span>

        <span>Portfolio concept · Fictional listings</span>
      </div>
    </div>
  `;
});
