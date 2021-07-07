<script lang="ts">
  import { onDestroy } from "svelte";
  import { lastTryChars, lastTryWPM, lastTryWords } from "../store/stats.store";

  let charsCount, words, wpm;
  const CharsUnsubscribe = lastTryChars.subscribe((val) => (charsCount = val));
  const WordsUnsubscribe = lastTryWords.subscribe((val) => (words = val));
  const WPMUnsubscribe = lastTryWPM.subscribe((val) => (wpm = val));

  onDestroy(() => {
    CharsUnsubscribe();
    WordsUnsubscribe();
    WPMUnsubscribe();
  });
</script>

<nav class="text-xl font-semibold flex justify-center items-center">
  <ul class="w-1/2">
    <li class="flex justify-between">
      Charachters <span>{charsCount}</span>
    </li>
    <li class="flex justify-between">
      Words <span>{words}</span>
    </li>
    <li class="flex justify-between">
      WPM <span>{wpm}</span>
    </li>
  </ul>
</nav>
