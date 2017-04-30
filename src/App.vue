<template>
  <div id="q-app">
    <router-view></router-view>
  </div>

</template>

<script>
export default {}
</script>

<style>
  @font-face {
    font-family: 'Alfa Slab One';
    src: url('./assets/fonts/alfaslabone/alfaslabone-regular.eot');
    src: url('./assets/fonts/alfaslabone/alfaslabone-regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/alfaslabone/alfaslabone-regular.woff') format('woff'),
    url('./assets/fonts/alfaslabone/alfaslabone-regular.ttf') format('truetype'),
    url('./assets/fonts/alfaslabone/alfaslabone-regular.svg#alfa_slab_oneregular') format('svg');
    font-weight: normal;
    font-style: normal;

  }
  body {
    background-color: #F1E7C9;
  }
  h1, h2, h3, h4, h5, h6, .toolbar-title, button, .modal-header {
    font-family:'Alfa Slab One';
    font-weight: normal !important;
    color: #4A3520;
  }
  .toolbar-logo a span {
    color: #fff !important;
  }
  .toolbar-logo a:hover, .toolbar-logo a:active, .toolbar-logo a:visited {
    text-decoration: none;
    color: #5ab946;
  }
  .list, .card {
    background-color: #fff;
  }
  .layout-footer {
    background-color: white !important;
  }
  .fs-contact-us a {
    display: block;
  }
  .fs-contact-us {
    z-index:-1
  }
</style>
