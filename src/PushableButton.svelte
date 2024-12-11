<!-- button component styles credits: https://www.joshwcomeau.com/animation/3d-button/ -->

<script>
  export let Class
  export let id
</script>

<div {id} class="wrapper {Class}">
  <button class="pushable">
    <span class="shadow" />
    <span class="edge" />
    <span class="front">
      <slot></slot>
    </span>
  </button>
</div>

<style>
  .wrapper {
    margin: 2px;
    display: flex;
  }
  
  .pushable {
    --b-radius: 3px;
    flex-grow: 1;
    max-width: 20rem;
    min-height: 3rem;
    margin-top: 3px;
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
  }
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--b-radius);
    background:  hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--b-radius);
    background: linear-gradient(
      to left,
      hsl(219deg 57% 25%) 0%,
      hsl(219deg 57% 32%) 8%,
      hsl(219deg 57% 32%) 92%,
      hsl(219deg 57% 25%) 100%
    );
  }
  .front {
    height: 100%;
    font-family: 'Digital-7';
    min-height: 5rem;
    display: flex;
    align-items: center;
    position: relative;
    padding: calc(0.875rem - 3px) 33px calc(0.875rem - 3px) 15px;
    text-align: left;
    border-radius: var(--b-radius);
    font-size: 2.5rem;
    background: var(--cds-interactive-01);
    color: var(--cds-text-04, #ffffff);
    will-change: transform;
    transform: translate(0px, -4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  .pushable:hover, .pushable.is-active {
    filter: brightness(120%);
  }
  .pushable:hover .front {
    transform: translate(0px, -5px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .pushable:active .front, .pushable.is-active .front {
    transform: translate(0px, -2px);
    transition: transform 34ms;
  }
  .pushable:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .pushable:active .shadow, .pushable.is-active .shadow{
    transform: translateY(1px);
    transition: transform 34ms;
  }
  .pushable:focus:not(:focus-visible) {
    outline: none;
  }
</style>
