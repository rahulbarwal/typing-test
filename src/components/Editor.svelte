<script>
  import { onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { lastTryChars, lastTryWPM, lastTryWords } from "../store/stats.store";
  import { timerVal } from "../store/timer.store";

  const dispatch = createEventDispatcher();
  let editingdisabled = false;
  let infoSent = false;
  let textAreaVal = "";
  let unsub;

  function dispatchTypingInfo() {
    if (!infoSent) {
      infoSent = true;
      dispatch("typingStartedEvent");
    }
  }

  export function disableTyping() {
    editingdisabled = true;
    unsub = timerVal.subscribe((val) => {
      lastTryChars.set(textAreaVal.length);
      const wordsCount = textAreaVal.length / 5;
      lastTryWords.set(wordsCount);
      lastTryWPM.set(wordsCount / val);
    });
  }

  onDestroy(() => unsub());
</script>

<main class="h-full w-full relative ">
  <textarea
    bind:value={textAreaVal}
    disabled={editingdisabled}
    on:keydown={dispatchTypingInfo}
    class="h-full w-full p-4 border-indigo-700 border-2 rounded {editingdisabled
      ? 'bg-gray-300'
      : ''}"
    placeholder="// Start typing "
  />
  {#if editingdisabled}
    <button
      class="absolute top-1/2 left-1/2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-600 hover:border-blue-400 rounded"
      on:click={() => {
        textAreaVal = "";
        editingdisabled = false;
        infoSent = false;
        dispatch("resetEditor");
      }}
    >
      Reset
    </button>
  {/if}
  >
</main>
