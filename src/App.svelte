<script>
import {
    Button,
    TextInput,
    TextArea,
} from "carbon-components-svelte";
import "carbon-components-svelte/css/all.css";


import { onMount } from "svelte";
import Footer from "./Footer.svelte";
import Header from "./Header.svelte";

onMount(() => {
    document.getElementById("app").focus();
});

let operands = ["/","*","-","+","*","^",]
let input = "0";

let evaluate = () => {
	console.log("eval")
}

let buttonClick = (e) => {
    console.log({e});

    if (e.target.localName == 'button') {
		console.log(e.target);
        switch (e.target.innerText) {
            case "/":
                input += " / ";
                break;
			case "^":
                input += " ^ ";
                break;
            case "AC":
                input = "0";
                break;
            case "*":
                input += " * ";
                break;
            case "-":
                input += " - ";
                break;
            case "+":
                input += " + ";
                break;
            case "/":
                input += " / ";
                break;
				case "=":
                evaluate()
                break;	
            default:
				input += e.target.innerText
                break;
        }
    }

};

let calcEl

let onKeyPress = (e) => {
	console.log("key event:", e);
    if (parseInt(e.key) >= 0) {
        console.log("number", e.key);
        input += e.key;
    } else if (operands.includes(e.key)) {
		input += " " + e.key + " ";
	} else if (e.key === "Enter") {

	} else if (e.key === "," || e.key === ".") {
		if (!input.includes(".")) {
			input += "."
		}
	} else if (e.key === "Backspace" || e.key === "Delete") {
		input = input.slice(0, -1)
        return false;
    }
};
</script>

<main on:keydown={onKeyPress} tabindex="-1" id="app">
	<Header/>
		<div class="content">
			<section class="calculator" on:click={buttonClick} bind:this={calcEl}>
				<div class="out">
					<TextInput bind:value={input}  id="display" />
				</div>
				<Button class="control ac" id="clear">AC</Button>
				<Button class="control pow">^</Button>
				<Button class="control division" id="divide">/</Button>
				<Button class="control mult" id="multiply">*</Button>
				<Button class="number n7" id="seven">7</Button>
				<Button class="number n8" id="eight">8</Button>
				<Button class="number n9" id="nine">9</Button>
				<Button class="control minus" id="subtract">-</Button>
				<Button class="number n4" id="four">6</Button>
				<Button class="number n5" id="five">5</Button>
				<Button class="number n6" id="six">4</Button>
				<Button class="control plus" id="add">+</Button>
				<Button class="number n1" id="one">1</Button>
				<Button class="number n2" id="two">2</Button>
				<Button class="number n3" id="three">3</Button>
				<Button class="number n0" id="zero">0</Button>
				<Button class="control ndot" id="decimal">.</Button>
				<Button class="control equal" id="equals">=</Button>
			</section>
			<TextArea labelText="History of results" disabled class="cursor-text"/>
		</div>
	<Footer/>
</main>

<style lang="scss">
main {
    display: grid;
    grid-template-columns: 1fr min(65ch, 100%) 1fr;
	grid-template-rows: max-content auto 1fr;
    height: 100vh;

    > :global(*) {
        grid-column: 2;
    }

    > :global(.full-bleed) {
        width: 100%;
        grid-column: 1 / 4;
    }
}

.calculator {
    padding: 4px;
    border: 2px solid var(--cds-ui-04);
    box-shadow: 0 0 10px 0px var(--cds-ui-04);
    border-radius: 3px;
    margin: 2rem auto;
    max-width: 31rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 2px 2px;
    grid-auto-flow: row;
    grid-template-areas:
        "out out out out"
        "ac pow division mult"
        "n7 n8 n9 minus"
        "n4 n5 n6 plus"
        "n1 n2 n3 equal"
        "n0 n0 ndot equal";
}

:global(.cursor-text) {
	cursor: text !important;
}

</style>
