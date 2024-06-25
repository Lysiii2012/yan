document.addEventListener("DOMContentLoaded", function() {
    const radioItems = document.querySelectorAll('.form-calc p');

    if (radioItems.length > 0) {
        radioItems.forEach(item => {
            item.addEventListener('click', function(event) { 
                const radio = this.querySelector('input[type="radio"]'); 
                if (radio) {
                    radio.checked = true;
                }
            });
        });
    }
});
function calculateProfit() {
    const investment = document.getElementById('investment').value;
    const package = document.querySelector('input[name="package"]:checked');
    let profit = 0;

    if (investment && package) {
        const amount = parseFloat(investment);
        switch(package.value) {
            case 'starter':
                profit = amount * 0.1;
                break;
            case 'standard':
                profit = amount * 0.15;
                break;
            case 'premium':
                profit = amount * 0.2;
                break;
        }
        document.querySelector('#profit span').textContent = profit.toFixed(2) + ' ' + 'рублей в месяц';
    } else {
        alert('Пожалуйста, введите сумму инвестиций и выберите пакет.');
    }
}

const icons = document.querySelectorAll('.icon');
const navBlock = document.querySelector('.nav-block');

icons.forEach(icon => {  
  icon.addEventListener('click', (event) => {
    icon.classList.toggle("open");
    navBlock.classList.toggle("open");
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    icons.forEach(icon => {
      icon.classList.remove("open");
    });
    navBlock.classList.remove("open");
  }
});

document.addEventListener('click', (event) => {
  if (!navBlock.contains(event.target) && !Array.from(icons).some(icon => icon.contains(event.target))) {
    icons.forEach(icon => {
      icon.classList.remove("open");
    });
    navBlock.classList.remove("open");
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('nav a');
    const defaultLink = document.getElementById('menu-form');

    function removeActiveClasses() {
        menuLinks.forEach(link => {
            link.classList.remove('act');
        });
    }

    function addActiveClass(id) {
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (link) {
            link.classList.add('act');
        }
    }

    function onScroll() {
        let scrollPosition = window.scrollY;
        let isAnySectionActive = false;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 10; // 10px ниже
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                removeActiveClasses();
                addActiveClass(sectionId);
                isAnySectionActive = true;
            }
        });

        if (!isAnySectionActive) {
            removeActiveClasses();
            defaultLink.classList.add('act');
        }

        if (scrollPosition >= 300) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    }

    window.addEventListener('scroll', onScroll);
 
    defaultLink.classList.add('act');

    const sectionBox = document.querySelectorAll('section, .item-pac li, .we-have li, .reviews-item, .swiper-slide');

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);  
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
  
    sectionBox.forEach((section, index) => {
      section.style.setProperty('--animation-delay', `${index * 0.1}s`);
      observer.observe(section);
    });
});