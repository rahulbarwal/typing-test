<script lang="ts">
  import RunningTimer from "./RunningTimer.svelte";
  import { timerVal } from "../store/timer.store";

  
  let selected;
  const timerVals = [5, 10, 15];
  timerVal.subscribe((val) => {
    selected = val;
  });
</script>

<footer class="flex flex-col">
  <!-- <span class="flex justify-between items-center">
    Timer:
    <select
      class="p-2 border-2 rounded border-indigo-500 shadow-lg"
      bind:value={selected}
      on:change={() => timerVal.set(selected)}
    >
      {#each timerVals as timer}
        <option value={timer}>
          {timer}
        </option>
      {/each}
    </select>
  </span> -->
  <RunningTimer minutes={selected} />
</footer>
