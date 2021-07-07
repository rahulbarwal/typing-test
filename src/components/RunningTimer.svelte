<script lang="ts">
  import { onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { timerVal } from "../store/timer.store";

  export let minutes: number = 0;
  export let size: "sm" | "md" | "lg" = "md";
  const dispatch = createEventDispatcher();

  let seconds = 0;
  let isTimerRunning = false;
  let intervalRef;
  let timerDB;
  const unsub = timerVal.subscribe((v) => (timerDB = minutes = v));

  //#region Declarations
  export function resetTimer() {
    minutes = timerDB;
  }

  function getSpanClass() {
    let css = "font-semibold ";
    switch (size) {
      case "sm":
        css += " text-5xl";
        break;
      case "md":
        css += " text-7xl";
        break;
      case "lg":
        css += " text-9xl";
        break;
    }
    return css;
  }

  export function startTimer() {
    minutes -= 1;
    seconds = 59;

    isTimerRunning = true;
    intervalRef = setInterval(() => {
      dispatch("timerStarted");
      seconds -= 1;
      if (seconds === 0) {
        if (minutes === 0) {
          seconds = 0;
          clearInterval(intervalRef);
          dispatch("timerEnded");
          isTimerRunning = false;
        } else {
          minutes -= 1;
          seconds = 59;
        }
      }
    }, 1000);
  }

  function pauseTimer() {
    isTimerRunning = false;
    clearInterval(intervalRef);
    dispatch("timerPaused");
  }

  function padWithChar(
    valToModify: string | number,
    paddingChar = "0",
    maxlength = 2
  ) {
    const valLength = valToModify.toString().length;
    if (valLength === maxlength) {
      return valToModify;
    }
    let paddingStr = "";
    for (let i = 0; i < maxlength - valLength; i++) {
      paddingStr += paddingChar;
    }
    return `${paddingStr}${valToModify}`;
  }
  //#endregion Declarations

  //#region Main Execution
  const spanClass = getSpanClass();
  //#endregion Main Execution

  onDestroy(() => unsub());
</script>

<section class="flex justify-center">
  <span class={spanClass}>
    {padWithChar(minutes)} : {padWithChar(seconds)}
  </span>
</section>
