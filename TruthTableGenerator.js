//generates Truth Table for certain AST
import { LEAF_NODE, NEGATION_NODE } from "./Parser.js";
export class TruthTableGenerator {
    constructor() {
        this.printTableToConsole = () => {
            console.table(this.TRUTH_TABLE);
        };
        this.updateTree = (root) => {
            if (root instanceof LEAF_NODE) {
                let leaf = root;
                leaf.currentValue = this.variableLookupTable[leaf.label];
            }
            else if (root instanceof NEGATION_NODE) {
                let leaf = root;
                leaf.currentValue = this.variableLookupTable[leaf.label];
            }
            else {
                this.updateTree(root.leftSubtree);
                this.updateTree(root.rightSubtree);
            }
        };
        this.booleanToString = (b) => b ? "T" : "F";
        this.createNewRowWithCurrentState = () => {
            let newRow = Array();
            let variableString = Object.values(this.variableLookupTable).map(this.booleanToString);
            newRow.push(...variableString);
            this.listOfSubExpressions.forEach((subExpression) => {
                newRow.push(this.booleanToString(subExpression.evaluate()));
            });
            this.TRUTH_TABLE.push(newRow);
        };
        this.generateTableHead = () => {
            let thead = this.tableDOM.createTHead();
            let row = thead.insertRow();
            this.TRUTH_TABLE[0].forEach(cellData => {
                let th = document.createElement("th");
                let text = document.createTextNode(cellData);
                th.appendChild(text);
                row.appendChild(th);
            });
        };
        this.generateTableBody = () => {
            this.TRUTH_TABLE.slice(1).forEach((cellArray) => {
                let row = this.tableDOM.insertRow();
                cellArray.forEach((cellValue) => {
                    let cell = row.insertCell();
                    let text = document.createTextNode(cellValue);
                    if (cellValue == "F") {
                        cell.style.backgroundColor = '#ffc8c8';
                    }
                    else {
                        cell.style.backgroundColor = '#b9ffd6';
                    }
                    cell.appendChild(text);
                });
            });
        };
        this.TRUTH_TABLE = Array();
        this.tableHeader = Array();
    }
    generate(fromAST, variableLookupTable, subExpressions) {
        this.AST = fromAST;
        this.variableLookupTable = variableLookupTable;
        this.listOfSubExpressions = subExpressions;
        Object.keys(variableLookupTable).forEach(truthVariable => this.tableHeader.push(truthVariable));
        this.listOfSubExpressions.forEach((subexpression) => {
            this.tableHeader.push(subexpression.toString());
        });
        this.TRUTH_TABLE.push(this.tableHeader);
        //iterates over all possibilities for truth variables
        //yields a new truth table row for each iteration
        let numberOfVariables = Object.keys(variableLookupTable).length;
        for (let i = 0; i < Math.pow(2, numberOfVariables); i++) {
            for (let j = 0; j < numberOfVariables; j++) {
                let valueForA = ((i >> j) & 0x1) == 0 ? false : true;
                variableLookupTable[String.fromCharCode(65 + j)] = valueForA;
            }
            this.updateTree(this.AST);
            this.createNewRowWithCurrentState();
        }
    }
    renderToDomTable(targetDOMTable) {
        this.tableDOM = targetDOMTable;
        this.generateTableHead();
        this.generateTableBody();
    }
}
//# sourceMappingURL=TruthTableGenerator.js.map