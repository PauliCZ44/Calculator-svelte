<script>
  let showTests = async () => { 
    const script = document.createElement('script')
    script.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'
    document.head.append(script)
  };
</script>

<footer>
  <div class="footerContent py-3">
    <p>
      This app is made with <a class="svelte-link" href="https://svelte.dev/"
        >SVELTE.</a
      >
    </p>
    <p>
      Theme:
      <a href="https://carbon-svelte.vercel.app/">Carbon Components Svelte</a>
    </p>
    <!-- <p>Credits for dark mode switch:<a href="https://codepen.io/RefractedColor/pen/mdWZRPQ">here</a>  </p> -->
    <p class="d-flex justify-content-between flex-wrap">
      Made by Pavel Stastny.
      <span class="d-inline-block">
        <a href="https://github.com/PauliCZ44/"> My github.</a>
      </span>
      <span on:click|once={showTests} class="show-test">Show FCC test cases.</span>
    </p>
  </div>
</footer>

<style>
  .show-test {
    display: inline-block;
    opacity: 0.5;
  }
  a {
    color: var(--primary3);
    text-decoration: none;
  }

  a:hover {
    color: var(--primary2);
  }

  footer {
    align-self: end;
    color: var(--cds-text-05);
  }

  p {
    font-size: 0.75rem;
  }

  .svelte-link {
    color: #ff3e00;
  }

  .svelte-link:hover {
    color: rgb(160, 50, 14);
    }
</style>
