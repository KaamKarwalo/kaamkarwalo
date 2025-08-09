$(document).ready(function () {
  const workers = [
    { id: 1, name: 'John Doe', type: 'labour', state: 'state1', city: 'city1', rating: 4.5, phone: '555-1234' },
    { id: 2, name: 'Jane Smith', type: 'mistri', state: 'state1', city: 'city2', rating: 4.0, phone: '555-5678' },
    { id: 3, name: 'Mike Johnson', type: 'carpenter', state: 'state2', city: 'city1', rating: 5.0, phone: '555-8765' },
    { id: 4, name: 'Emily Davis', type: 'painter', state: 'state2', city: 'city2', rating: 3.5, phone: '555-4321' },
    { id: 5, name: 'Chris Brown', type: 'plumber', state: 'state1', city: 'city1', rating: 4.8, phone: '555-3456' },
    { id: 6, name: 'Sarah Wilson', type: 'electrician', state: 'state1', city: 'city2', rating: 4.2, phone: '555-6543' }
  ];

  function displayWorkers(filteredWorkers) {
    $('#worker-container').empty();
    filteredWorkers.forEach(worker => {
      $('#worker-container').append(`
        <div class="worker-card">
          <h3>${worker.name}</h3>
          <p>Type: ${worker.type}</p>
          <p>Rating: ${worker.rating} ⭐</p>
          <button onclick="callWorker('${worker.name}', '${worker.phone}')">Call</button>
        </div>
      `);
    });
  }

  $('#filter-button').click(function () {
    const selectedType = $('#worker-type').val();
    const selectedState = $('#state').val();
    const selectedCity = $('#city').val();

    const filteredWorkers = workers.filter(worker => {
      return (!selectedType || worker.type === selectedType) &&
        (!selectedState || worker.state === selectedState) &&
        (!selectedCity || worker.city === selectedCity);
    });

    displayWorkers(filteredWorkers);
  });

  window.callWorker = function (name, phone) {
    alert(`Calling ${name} at ${phone}`);
  };

  displayWorkers(workers);

  // Modal logic
  const loginModal = $('#loginModal');
  const registerModal = $('#registerModal');

  $('#loginBtn').click(() => loginModal.show());
  $('#registerBtn').click(() => registerModal.show());
  $('.close').click(() => $('.modal').hide());
  $(window).on('click', function (event) {
    if ($(event.target).hasClass('modal')) {
      $('.modal').hide();
    }
  });
});

  const slides = document.getElementById('slides');
  const totalSlides = slides.children.length;
  const dotsContainer = document.getElementById('dots');
  const slider = document.getElementById('slider');
  let index = 0;
  let interval;

  // Generate dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.dot');

  function showSlide(i) {
    if (i >= totalSlides) index = 0;
    else if (i < 0) index = totalSlides - 1;
    else index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    index++;
    showSlide(index);
  }

  function prevSlide() {
    index--;
    showSlide(index);
  }

  function goToSlide(i) {
    index = i;
    showSlide(index);
  }

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  // Touch swipe for mobile
  let startX = 0;
  slider.addEventListener('touchstart', (e) => {
    stopAutoSlide();
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    startAutoSlide();
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  // Start
  showSlide(index);
  startAutoSlide();

    const ticker = document.getElementById('ticker');
    ticker.innerHTML += " 🚧 KaamKarwalo: Labour, Mistri, Painter, Carpenter available in Hajipur at your doorstep! 🚧";
  