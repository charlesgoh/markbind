/* eslint-disable no-undef */

Vue.use(VueStrap);

function scrollToUrlAnchorHeading() {
  if (window.location.hash) {
    // remove leading hash to get element ID
    document.getElementById(window.location.hash.slice(1)).scrollIntoView();
    window.scrollBy(0, -document.body.style.paddingTop.replace('px', ''));
  }
}

function flattenModals() {
  jQuery('.modal').each((index, modal) => {
    jQuery(modal).detach().appendTo(jQuery('#app'));
  });
}

function setupAnchors() {
  jQuery('h1, h2, h3, h4, h5, h6, .header-wrapper').each((index, heading) => {
    jQuery(heading).on('mouseenter', () => jQuery(heading).find('.fa.fa-anchor').show());
    jQuery(heading).on('mouseleave', () => jQuery(heading).find('.fa.fa-anchor').hide());
  });
  jQuery('.fa-anchor').each((index, anchor) => {
    jQuery(anchor).on('click', function () {
      window.location.href = jQuery(this).attr('href');
    });
  });
}

function executeAfterMountedRoutines() {
  flattenModals();
  scrollToUrlAnchorHeading();
  setupAnchors();
}

function setupSiteNav() {
  // Add event listener for site-nav-btn to toggle itself and site navigation elements.
  const siteNavBtn = document.getElementById('site-nav-btn');
  if (siteNavBtn) {
    siteNavBtn.addEventListener('click', function () {
      this.classList.toggle('shift');
      document.getElementById('site-nav').classList.toggle('open');
      document.getElementById('site-nav-btn-wrap').classList.toggle('open');
    });
  }
  // Creates event listener for all dropdown-btns in page.
  Array.prototype.forEach.call(
    document.getElementsByClassName('dropdown-btn'),
    dropdownBtn => dropdownBtn.addEventListener('click', function () {
      this.classList.toggle('dropdown-btn-open');
      const dropdownContent = this.nextElementSibling;
      const dropdownIcon = this.lastElementChild;
      dropdownContent.classList.toggle('dropdown-container-open');
      dropdownIcon.classList.toggle('rotate-icon');
    }),
  );
}

function setup() {
  // eslint-disable-next-line no-unused-vars
  const vm = new Vue({
    el: '#app',
    mounted() {
      executeAfterMountedRoutines();
    },
  });
  setupSiteNav();
}

function setupWithSearch(siteData) {
  const { searchbar } = VueStrap.components;
  // eslint-disable-next-line no-unused-vars
  const vm = new Vue({
    el: '#app',
    components: {
      searchbar,
    },
    data() {
      return {
        searchData: siteData.pages,
      };
    },
    methods: {
      searchCallback(match) {
        const page = `${baseUrl}/${match.src.replace(/.(md|mbd)$/, '.html')}`;
        const anchor = match.heading ? `#${match.heading.id}` : '';
        window.location = `${page}${anchor}`;
      },
    },
    mounted() {
      executeAfterMountedRoutines();
    },
  });
  setupSiteNav();
}

jQuery.getJSON(`${baseUrl}/siteData.json`)
  .then(siteData => setupWithSearch(siteData))
  .catch(() => setup());
