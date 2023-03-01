import { Lexer, TOKEN_KIND } from "./Lexer.js";
var OPERATOR_KIND;
(function (OPERATOR_KIND) {
    OPERATOR_KIND["CONJUNCTION"] = "CONJUNCTION";
    OPERATOR_KIND["DISJUNCTION"] = "DISJUNCTION";
    OPERATOR_KIND["IMPLICATION"] = "IMPLICATION";
})(OPERATOR_KIND || (OPERATOR_KIND = {}));
class DISJUNCTION_NODE {
    evaluate() {
        return this.leftSubtree.evaluate() || this.rightSubtree.evaluate();
    }
    toString() {
        return `${this.leftSubtree.toString()} ∨ ${this.rightSubtree.toString()}`;
    }
    constructor(ls, rs) {
        this.leftSubtree = ls;
        this.rightSubtree = rs;
        this.operator_kind = OPERATOR_KIND.DISJUNCTION;
    }
}
class CONJUNCTION_NODE {
    evaluate() {
        return this.leftSubtree.evaluate() && this.rightSubtree.evaluate();
    }
    toString() {
        return `${this.leftSubtree.toString()} ∧ ${this.rightSubtree.toString()}`;
    }
    constructor(ls, rs) {
        this.leftSubtree = ls;
        this.rightSubtree = rs;
        this.operator_kind = OPERATOR_KIND.CONJUNCTION;
    }
}
class IMPLICATION_NODE {
    evaluate() {
        return !this.leftSubtree.evaluate() || this.rightSubtree.evaluate();
    }
    toString() {
        return `${this.leftSubtree.toString()} → ${this.rightSubtree.toString()}`;
    }
    constructor(ls, rs) {
        this.leftSubtree = ls;
        this.rightSubtree = rs;
        this.operator_kind = OPERATOR_KIND.IMPLICATION;
    }
}
export class NEGATION_NODE {
    evaluate() {
        return !this.currentValue;
    }
    toString() {
        return `¬${this.label}`;
    }
    constructor(cv, label) {
        this.currentValue = cv;
        this.label = label;
    }
}
export class LEAF_NODE {
    evaluate() {
        return this.currentValue;
    }
    toString() {
        return this.label;
    }
    constructor(cv, label) {
        this.currentValue = cv;
        this.label = label;
    }
}
//type AST_Node = Operator_NODE | Leaf_Node;
export class Parser {
    constructor() {
        this.parse_implication = () => {
            let disJunction = this.parse_disjunction();
            while (this.currenToken.kind == TOKEN_KIND.IMPLICATION) {
                this.currenToken = this.lexer.nextToken();
                let right_identifier = this.parse_conjunction();
                let newImplication = new IMPLICATION_NODE(disJunction, right_identifier);
                disJunction = newImplication;
                this.list_subexpression.push(disJunction);
            }
            return disJunction;
        };
        this.parse_disjunction = () => {
            let conjunction = this.parse_conjunction();
            while (this.currenToken.kind == TOKEN_KIND.DISJUNCTION) {
                this.currenToken = this.lexer.nextToken();
                let right_identifier = this.parse_conjunction();
                let newDisjunction = new DISJUNCTION_NODE(conjunction, right_identifier);
                conjunction = newDisjunction;
                this.list_subexpression.push(conjunction);
            }
            return conjunction;
        };
        this.parse_conjunction = () => {
            let left_identifier = this.parse_identifier();
            while (this.currenToken.kind == TOKEN_KIND.CONJUNCTION) {
                this.currenToken = this.lexer.nextToken();
                let right_identifier = this.parse_identifier();
                let newConjunction = new CONJUNCTION_NODE(left_identifier, right_identifier);
                left_identifier = newConjunction;
                this.list_subexpression.push(newConjunction);
            }
            return left_identifier;
        };
        this.parse_identifier = () => {
            let token = this.currenToken;
            if (token.kind == TOKEN_KIND.NEGATION) {
                let identifierToken = this.lexer.nextToken();
                if (identifierToken.kind == TOKEN_KIND.IDENTIFIER) {
                    this.currenToken = this.lexer.nextToken();
                    this.lookUpTable[identifierToken.value] = false;
                    let newNegation = new NEGATION_NODE(false, identifierToken.value);
                    this.list_subexpression.push(newNegation);
                    return newNegation;
                }
                else {
                    console.error("[ERROR] Expected Identifier");
                }
            }
            else if (token.kind == TOKEN_KIND.IDENTIFIER) {
                this.currenToken = this.lexer.nextToken();
                this.lookUpTable[token.value] = false;
                return new LEAF_NODE(false, token.value);
            }
            else {
                console.error("[ERROR], expected Identifier or Negation");
            }
        };
        this.list_subexpression = Array();
        this.lookUpTable = {};
    }
    getLookUpTable() {
        return this.lookUpTable;
    }
    getSubexpressionList() {
        return this.list_subexpression;
    }
    parse(EXPRESSION_TO_PARSE) {
        this.lexer = new Lexer(EXPRESSION_TO_PARSE);
        this.currenToken = this.lexer.nextToken();
        return this.parse_implication();
    }
}
//# sourceMappingURL=Parser.js.map