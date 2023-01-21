<template>
    <div class="w-50">
      <div class="alert alert-info" style="cursor: pointer">
        <span v-if="open" @click="open = !open">&#x25B2; Hide Details</span>
        <span v-if="!open" @click="open = !open">&#x25BC; Show Details</span>
      </div>
      <!-- Injected content here -->
      <transition name="fade">
        <slot v-if="open"></slot>
      </transition>
    </div>
</template>
<script>
export default {
  name: "CollapsibleSection",
  data() {
    return {
      open: true,
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
