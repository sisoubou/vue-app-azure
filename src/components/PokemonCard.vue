<template>
  <div
    class="pokemon-card"
    :class="typeClass"
    @click="sendSelectedPokemon(pokemon)"
  >
    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    <h2 class="pokemon-name">{{ pokemon.name }}</h2>

    <h3 class="pokemon-type">
      {{ displayTypes }}
    </h3>

    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['pokemonSelected'])

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const sendSelectedPokemon = (pokemon) => {
  emit('pokemonSelected', pokemon)
}

const primaryType = computed(() => {
  const t = props.pokemon.type
  if (Array.isArray(t)) return t[0] || 'normal'
  return (t || 'normal').toLowerCase()
})

const typeClass = computed(() => `type-${primaryType.value}`)

const displayTypes = computed(() => {
  const t = props.pokemon.type
  return Array.isArray(t) ? t.join(' / ') : t
})
</script>


<style scoped>
.pokemon-card {
  position: relative;
  overflow: hidden;

  width: 240px;
  min-height: 320px;
  padding: 18px 16px 16px;

  border-radius: 18px;
  text-align: center;
  font-weight: 700;

  background: linear-gradient(
    180deg,
    rgba(28, 28, 32, 0.95),
    rgba(18, 18, 22, 0.95)
  );

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  cursor: pointer;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.pokemon-card::before {
  content: "";
  position: absolute;
  inset: -40% -40% auto -40%;
  height: 220px;

  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0) 65%
  );

  opacity: 0.6;
  pointer-events: none;
}

.pokemon-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 26px 60px rgba(0, 0, 0, 0.75),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.pokemon-image {
  width: 140px;
  height: 140px;
  margin: 6px auto 8px;

  object-fit: contain;
  filter:
    drop-shadow(0 12px 22px rgba(0, 0, 0, 0.85));

  transition: transform 160ms ease;
}

.pokemon-card:hover .pokemon-image {
  transform: translateY(-2px) scale(1.05);
}

.pokemon-name {
  margin: 6px 0 10px;
  font-size: 1.35rem;
  letter-spacing: 0.4px;
  text-transform: capitalize;
  color: #ffffff;
}

.pokemon-type {
  display: inline-flex;
  gap: 6px;
  align-items: center;

  padding: 6px 14px;
  border-radius: 999px;

  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.3px;

  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;

  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);

  text-transform: lowercase;
}

.pokemon-card :slotted(button) {
  margin-top: 14px;
}

.favorite-button,
.capture-button {
  padding: 9px 14px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 800;

  border: none;
  color: #fff;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
  transition:
    transform 140ms ease,
    box-shadow 140ms ease,
    filter 140ms ease;
}

.favorite-button:hover,
.capture-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}

.favorite-button:disabled,
.capture-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.type-electric {
  --glow: rgba(255, 214, 0, 0.45);
}
.type-electric::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-electric .pokemon-type {
  background: rgba(255, 214, 0, 0.18);
  border-color: rgba(255, 214, 0, 0.35);
}

.type-grass {
  --glow: rgba(76, 201, 94, 0.45);
}
.type-grass::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-grass .pokemon-type {
  background: rgba(76, 201, 94, 0.18);
  border-color: rgba(76, 201, 94, 0.35);
}

.type-fire {
  --glow: rgba(255, 92, 92, 0.45);
}
.type-fire::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-fire .pokemon-type {
  background: rgba(255, 92, 92, 0.18);
  border-color: rgba(255, 92, 92, 0.35);
}

.type-water {
  --glow: rgba(82, 153, 255, 0.45);
}
.type-water::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-water .pokemon-type {
  background: rgba(82, 153, 255, 0.18);
  border-color: rgba(82, 153, 255, 0.35);
}

.type-normal {
  --glow: rgba(190, 180, 135, 0.45);
}
.type-normal::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-normal .pokemon-type {
  background: rgba(190, 180, 135, 0.18);
  border-color: rgba(190, 180, 135, 0.35);
}

.type-bug {
  --glow: rgba(160, 210, 70, 0.45);
}
.type-bug::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-bug .pokemon-type {
  background: rgba(160, 210, 70, 0.18);
  border-color: rgba(160, 210, 70, 0.35);
}

.type-poison {
  --glow: rgba(180, 80, 255, 0.45);
}
.type-poison::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-poison .pokemon-type {
  background: rgba(180, 80, 255, 0.18);
  border-color: rgba(180, 80, 255, 0.35);
}

.type-ground {
  --glow: rgba(199, 120, 40, 0.45);
}
.type-ground::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-ground .pokemon-type {
  background: rgba(199, 120, 40, 0.18);
  border-color: rgba(199, 120, 40, 0.35);
}

.type-fairy {
  --glow: rgba(255, 120, 210, 0.45);
}
.type-fairy::before {
  background: radial-gradient(circle at 30% 30%, var(--glow), transparent 65%);
}
.type-fairy .pokemon-type {
  background: rgba(255, 120, 210, 0.18);
  border-color: rgba(255, 120, 210, 0.35);
}

</style>