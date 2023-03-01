export var TOKEN_KIND;
(function (TOKEN_KIND) {
    TOKEN_KIND["IDENTIFIER"] = "IDENTIFIER";
    TOKEN_KIND["DISJUNCTION"] = "DISJUNCTION";
    TOKEN_KIND["CONJUNCTION"] = "CONJUNCTION";
    TOKEN_KIND["EOF"] = "EOF";
    TOKEN_KIND["IMPLICATION"] = "IMPLICATION";
    TOKEN_KIND["NEGATION"] = "NEGATION";
})(TOKEN_KIND = TOKEN_KIND || (TOKEN_KIND = {}));
export class Lexer {
    constructor(expr) {
        this.nextToken = () => {
            if (this.cursor >= this.EXPRESSION_TO_PARSE.length) {
                return {
                    kind: TOKEN_KIND.EOF
                };
            }
            switch (this.EXPRESSION_TO_PARSE.charAt(this.cursor)) {
                case 'A':
                case 'B':
                case 'C': {
                    this.cursor++;
                    return {
                        kind: TOKEN_KIND.IDENTIFIER,
                        value: this.EXPRESSION_TO_PARSE.charAt(this.cursor - 1)
                    };
                }
                case 'v':
                case '∨':
                case '|': {
                    this.cursor++;
                    return {
                        kind: TOKEN_KIND.DISJUNCTION,
                    };
                }
                case '&':
                case '∧': {
                    this.cursor++;
                    return {
                        kind: TOKEN_KIND.CONJUNCTION,
                    };
                }
                case '→': {
                    this.cursor++;
                    return {
                        kind: TOKEN_KIND.IMPLICATION
                    };
                }
                case '¬': {
                    this.cursor++;
                    return {
                        kind: TOKEN_KIND.NEGATION
                    };
                }
                case ' ':
                    {
                        this.cursor++;
                        return this.nextToken();
                    }
                default: {
                    console.log("UNSUPPORTED CHARACTER : " + this.EXPRESSION_TO_PARSE.charAt(this.cursor));
                }
            }
        };
        this.EXPRESSION_TO_PARSE = expr;
        this.cursor = 0;
    }
}
//# sourceMappingURL=Lexer.js.map