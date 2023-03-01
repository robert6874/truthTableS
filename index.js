import { Parser } from "./Parser.js";
import { TruthTableGenerator } from "./TruthTableGenerator.js";
let notDebug = () => {
    let tableDOM = document.getElementById("TruthTable");
    console.log("Tabledom", tableDOM);
    const buttonA = document.getElementById("buttonA");
    const buttonB = document.getElementById("buttonB");
    const buttonC = document.getElementById("buttonC");
    const buttonAND = document.getElementById("buttonAND");
    const buttonOR = document.getElementById("buttonOR");
    const buttonIMPLICATION = document.getElementById("buttonIMPLICATION");
    const buttonNEGATION = document.getElementById("buttonNEGATION");
    const buttonCreate = document.getElementById("buttonCreate");
    const userInput = document.getElementById("userInput");
    let USER_INPUT_STRING = "";
    buttonA.onclick = () => {
        USER_INPUT_STRING += "A ";
        userInput.value += "A ";
    };
    buttonB.onclick = () => {
        USER_INPUT_STRING += "B ";
        userInput.value += "B ";
    };
    buttonC.onclick = () => {
        USER_INPUT_STRING += "C ";
        userInput.value += "C ";
    };
    buttonAND.onclick = () => {
        USER_INPUT_STRING += "∧ ";
        userInput.value += "∧ ";
    };
    buttonOR.onclick = () => {
        USER_INPUT_STRING += "v ";
        userInput.value += "v ";
    };
    buttonIMPLICATION.onclick = () => {
        USER_INPUT_STRING += "→";
        userInput.value += "→";
    };
    buttonNEGATION.onclick = () => {
        USER_INPUT_STRING += "¬";
        userInput.value += "¬";
    };
    buttonCreate.onclick = () => {
        tableDOM.innerHTML = "";
        tableDOM.style.display = "block";
        let EXPRESSION_TO_PARSE = USER_INPUT_STRING;
        let logicExpressionParser = new Parser();
        let AST = logicExpressionParser.parse(EXPRESSION_TO_PARSE);
        let TGG = new TruthTableGenerator();
        TGG.generate(AST, logicExpressionParser.getLookUpTable(), logicExpressionParser.getSubexpressionList());
        TGG.printTableToConsole();
        TGG.renderToDomTable(tableDOM);
        USER_INPUT_STRING = "";
        userInput.value = "";
    };
};
let debug = () => {
    let EXPRESSION_TO_PARSE = "¬A → B";
    let logicExpressionParser = new Parser();
    let AST = logicExpressionParser.parse(EXPRESSION_TO_PARSE);
    let TGG = new TruthTableGenerator();
    TGG.generate(AST, logicExpressionParser.getLookUpTable(), logicExpressionParser.getSubexpressionList());
    TGG.printTableToConsole();
    // TGG.renderToDomTable(tableDOM)
};
notDebug();
//# sourceMappingURL=index.js.map