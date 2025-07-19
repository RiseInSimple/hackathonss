document.addEventListener('DOMContentLoaded', () => {
    // --------- Smoke + Shiva Logic ---------
    const smoke = document.querySelector(".smoke");
    const shiva = document.querySelector(".shiva");
    const button = document.querySelector(".button");
  
    if (smoke && shiva) {
      smoke.currentTime = 0;
  
      gsap.from(".smoke", {
        opacity: 0,
        duration: 1,
      });
  
      shiva.addEventListener("load", () => {
        smoke.addEventListener("timeupdate", () => {
          if (smoke.currentTime >= 3) {
            smoke.pause();
            gsap.to(".smoke", {
              opacity: 0,
              duration: 1,
              onComplete: () => {
                smoke.style.display = "none";
                gsap.to(".shiva", { opacity: 1, duration: 1 });
              },
            });
          }
        });
      });
    }
  
    if (button) {
      button.addEventListener("click", () => {
        window.location.href = "cont.html";
      });
    }
  
    // --------- Carousel Logic ---------
    let currentRotation = 0;
    let isRotating = false;
  
    const carousel = document.getElementById('carousel');
    const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
 
  

  // Rotate the carousel to a specific angle
  function rotateTo(angle) {
      currentRotation = angle;
      carousel.style.transform = `rotateY(${angle}deg)`;
  }

  // Auto-rotate every 5 seconds
  setInterval(() => {
      currentRotation -= 60;
      rotateTo(currentRotation);
  }, 5000);

  // Button controls (without stopping auto-rotate)
  prevBtn?.addEventListener('click', () => {
      currentRotation += 60;
      rotateTo(currentRotation);
  });

  nextBtn?.addEventListener('click', () => {
      currentRotation -= 60;
      rotateTo(currentRotation);
  });
  
    function rotateTo(targetRotation) {
        if (isRotating) return;
        isRotating = true;
        currentRotation = targetRotation;
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
        updateThumbnails();
      
        // Calculate index of painting in front
        const activeIndex = ((Math.abs(currentRotation / 60) % 6) + 6) % 6;
        updateDetails(activeIndex); // ✅ Add this line
      
        setTimeout(() => {
          isRotating = false;
        }, 400);
      }
  
    function updateThumbnails() {
      const activeIndex = ((Math.abs(currentRotation / 60) % 6) + 6) % 6;
      thumbnailBtns.forEach((btn, index) => {
        btn.classList.toggle('border-primary', index === activeIndex);
        btn.classList.toggle('border-transparent', index !== activeIndex);
      });
    }
  
    prevBtn?.addEventListener('click', () => {
        rotateTo(currentRotation + 60);
    });
    
    nextBtn?.addEventListener('click', () => {
        rotateTo(currentRotation - 60);
    });

    thumbnailBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        rotateTo(-index * 60);
        updateDetails(index);
        detailsPanel?.classList.add('active');
      });
    });
  
    updateThumbnails();
  
    // --------- Painting Details Logic ---------
    const paintingData = [
        {
          title: "Divine Shiva",
          category: "Spiritual Collection",
          price: "$2,850",
          description: "A mesmerizing portrayal of Lord Shiva...",
          image: "img7.jpeg"
        },
        {
          title: "Sacred Ganesha",
          category: "Traditional Collection",
          price: "$3,200",
          description: "The beloved elephant-headed deity Ganesha...",
          image: "img8.jpg"
        },
        {
          title: "Emerald Goddess",
          category: "Divine Feminine",
          price: "$4,100",
          description: "A mystical representation of divine feminine...",
          image: "img9.jpg"
        },
        {
          title: "Warrior Durga",
          category: "Power Collection",
          price: "$3,750",
          description: "The fierce goddess Durga in her warrior form...",
          image: "img 1.jpeg"
        },
        {
          title: "Divine Krishna",
          category: "Love & Music",
          price: "$3,900",
          description: "Lord Krishna, the divine lover and musician...",
          image: "img2.jpg"
        },
        {
          title: "Mighty Hanuman",
          category: "Devotion Collection",
          price: "$2,950",
          description: "The devoted monkey deity Hanuman...",
          image: "img6.jpeg"
        },
        
          {
            title: "PremSwarup",
            category: "Love Collection",
            price: "$12,850",
            description: "Radha rani with lord kanhaiya",
            image: "img4.jpg"
          },
          {
            title: "Divine Ganesha",
            category: "Spiritual Collection",
            price: "$6,850",
            description: "Cute ganesh ji...",
            image: "img2.jpeg"
          },
          {
            title: "Lord Kanha",
            category: "Love Collection",
            price: "$9,850",
            description: "Madhav manmohan with flute..",
            image: "img3.jpeg"
          },
      ];
      
  
    const paintingCards = document.querySelectorAll('.painting-card');
    const detailsPanel = document.getElementById('detailsPanel');
    const closeDetails = document.getElementById('closeDetails');
  
    function updateDetails(index) {
      const data = paintingData[index];
      document.getElementById('detailImage').src = data.image;
      document.getElementById('detailTitle').textContent = data.title;
      document.getElementById('detailCategory').textContent = data.category;
      document.getElementById('detailPrice').textContent = data.price;
      document.getElementById('detailDescription').textContent = data.description;
    }
  
    paintingCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        updateDetails(index);
        detailsPanel?.classList.add('active');
      });
    });
  
    closeDetails?.addEventListener('click', () => {
      detailsPanel?.classList.remove('active');
    });
  
    detailsPanel?.addEventListener('click', (e) => {
      if (e.target === detailsPanel) {
        detailsPanel.classList.remove('active');
      }
    });
  
    // --------- Cursor & Hover Effects ---------
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-dot-outline");
    const buttons = document.querySelectorAll("button, a");
    const fadeElements = document.querySelectorAll(".collection-card, .artwork-card, h2, p");
  
    window.addEventListener("mousemove", (e) => {
      if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
      }
    });
  
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        cursorDot?.classList.add("cursor-dot-hover");
        cursorOutline?.classList.add("cursor-hover");
      });
      button.addEventListener("mouseleave", () => {
        cursorDot?.classList.remove("cursor-dot-hover");
        cursorOutline?.classList.remove("cursor-hover");
      });
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });
  
    fadeElements.forEach(element => {
      element.classList.add("fade-in");
      observer.observe(element);
    });
  
    if (carousel) {
      paintingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          carousel.style.animationPlayState = 'paused';
          card.classList.add('active');
        });
        card.addEventListener('mouseleave', () => {
          carousel.style.animationPlayState = 'running';
          card.classList.remove('active');
        });
      });
    }
  });
  