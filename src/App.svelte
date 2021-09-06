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
    setTimeout(() => {
        document.getElementById("app").classList.remove("loading")
    }, 100)

});

let operation
let history = []
let historyString = ""
let calcEl
let operands = ["/","x","-","+","*","^",]
let input = 0;
let lastRes

let round = (num) => {
    return Math.round((num + Number.EPSILON) * 100000000000000) / 100000000000000
}

let evaluate = () => {
    while (input.includes('--')) {
        input = input.replaceAll('--', '-')
    }
    let res = round(Function('return ' + operation)())
    //console.log("eval")
    operation += `=${res}`
    history.push( `${operation}`)
    historyString = history.join("\n")
    lastRes = res
    return res
}

let handleAC = () => {
    input = "0"
    operation = ""
}

let handleFirstInput = () => {
    if (/^0$/g.test(input)) {
        //console.log("zero only");
        input = ''
    }   
}

let removeLastChar = () => {
    input = `${input}`.slice(0, -1)
}

let handleNumberInput = (e, keyEvent = false) => {
    let num = keyEvent ? e : e.target.innerText
    if (operation.includes('=')) {
        input = num
        operation = num
    } else if (operands.includes(input[0])) {
        input = num
        operation += num
    } else {
        input += num
        operation += num
    }
}

let handleAddOperand = (operand) => {
    // After showing result we want to start new computation on the last result
    let lastCharOfOperation = operation.slice(-1)
    if (operation.includes('=')) {
        operation = lastRes + operand;
    }
    // Only for minus press: if last action is operand and it is not minus add minus as a operand. Rest of the function do the rest
    if (operand === '-' && (operands.includes(lastCharOfOperation) && lastCharOfOperation !== '-')) {
        operation += "-"
    }
    let isOperandLast = operands.includes(lastCharOfOperation)
    operation = isOperandLast ? operation.slice(0,-1) + operand : operation+operand;
    input = operand
}


let handleDot = (e) => {
    //console.log({input});
    if (!`${input}`.includes('.')) {
            //console.log("dot is included");
			input += "."
            operation += e.target.innerText
	}
    if (operation.includes('=')) {
        input = "0."
        operation = "0."
    }
}

let buttonClick = (e) => {
    //console.log("inner text: ",e.target.innerText);
    if (e.target.localName == 'button') {
        switch (e.target.innerText) {
            case "/":
                handleAddOperand("/")
                break;
			case "^":
            handleAddOperand("**")
                break;
            case "AC":
                handleAC()
                break;
            case '*':
            case "x":
            handleAddOperand("*")
                break;
            case "-":
            handleAddOperand("-")
                break;
            case "+":
            handleAddOperand("+")
                break;
			case "=":
                input = evaluate()
                break; 
            case ".":
                //console.log(". event");
                handleDot(e)	
                break;
            default:
                handleFirstInput()
                handleNumberInput(e)
                break;
        }
        
    }

};

let onKeyPress = (e) => {
	//console.log("key event:", e);
    if (parseInt(e.key) >= 0) {
        handleFirstInput()
        handleNumberInput(e.key, true)
    } else if (operands.includes(e.key)) {
		handleAddOperand(e.key)
	} else if (e.key === "Enter") {
        e.preventDefault()
        input = evaluate()
	} else if (e.key === "," || e.key === ".") {
        handleDot()
	} else if (e.key === "Backspace" || e.key === "Delete") {
        handleFirstInput()
        removeLastChar()
    }
};

</script>

<main on:keydown={onKeyPress} tabindex="-1" id="app" class="loading">
  <Header />
  <div class="content">
    <section class="calculator" on:click={buttonClick} bind:this={calcEl}>
      <div class="out">
        <TextInput
          bind:value={operation}
          id="operation"
          readonly
          light
          size="sm"
        />
        <TextInput bind:value={input} id="display" readonly size="xl" />
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
    <TextArea
      labelText="History of results"
      disabled
      class="cursor-text"
      bind:value={historyString}
    />
  </div>
  <Footer />
</main>

<style lang="scss">
  main {
    transition: opacity 750ms ease-in, transform 250ms ease-in;
    opacity: 1;
    isolation: isolate;
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

  main.loading {
      overflow: hidden;
      transform: scale(0.9);
      opacity: 0;
  }

  .loading:before {
    padding-top: 2.5rem;
    text-align: center;
    content: "Loading...";
    margin: auto;
    text-shadow: 0 0 white;
    font-size: 5rem;
    z-index: 3;
    position: fixed;
    inset: 0;
    background: rgba(0 0 0 / 0.95);
  }

  .calculator {
    padding: 4px;
    border: 2px solid var(--cds-ui-04);
    box-shadow: 0 0 3px 0px var(--cds-ui-04);
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
