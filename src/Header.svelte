<script>
 import {  Theme,  TooltipDefinition,} from "carbon-components-svelte";   
import ModeToggle from "./ModeToggle.svelte";
let theme = "g90";
let darkMode = true;
let toggleClick = () => {
    darkMode = !darkMode;
    document.querySelector("#themeToggle input").click();
};

</script>
<div class="full-bleed d-flex justify-content-end px-3">
    <TooltipDefinition
        tooltipText="Dark monde on/off"
        direction="bottom"
        align="end"
        >
        <ModeToggle on:click={toggleClick} {darkMode} />
    </TooltipDefinition>
    <div class="d-none" id="themeToggle">
        <Theme
            bind:theme
            render="toggle"
            toggle={{
            checked: false,
            themes: ["g90", "g10"],
            labelA: "Disable dark mode",
            labelB: "Disable dark mode",
            hideLabel: true,
            size: "sm",
            }}
            tokens={{
            "interactive-01": "#3282B8",
            "hover-primary": "#0F4C75",
            "active-primary": "#1B262C",
            focus: "#0F4C75",
            }}
            />
            </div>
</div>