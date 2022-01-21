<div class="selector">
  <span>Lorem.</span><span>Neque!</span><span class="active">Aliquam.</span>
  <slot></slot>
</div>

<style lang="scss">
  .selector {
    padding: .5rem;
    border-radius: 100ch;

    &:hover {
      background: lighten($background--dark, 10%);
    }

    &>* {
      padding: .25rem .5rem;
      border-radius: 100ch;
      cursor: pointer; 

      &.active {
        background: $primary;
        &:hover { background-color: $primary-hover; }
      }
      &:hover { background: lighten($background--dark, 20%); }
      & ~ * { margin-left: .5ch; }
    }

  }
  @media (prefers-color-scheme: light) {
    .selector:hover { background: darken($background--light, 10%); }
    .selector>*:hover { background: darken($background--light, 20%); }
  }
</style>