// Nekolculator calculator engine
// A safe, dependency-free tokenizer + shunting-yard parser + RPN evaluator.
// No eval() or Function() is ever used.

export type AngleMode = "DEG" | "RAD";

export class CalculatorError extends Error {
  code: "DIV_ZERO" | "DOMAIN" | "SYNTAX" | "OVERFLOW";
  constructor(code: "DIV_ZERO" | "DOMAIN" | "SYNTAX" | "OVERFLOW", message: string) {
    super(message);
    this.code = code;
    this.name = "CalculatorError";
  }
}

type TokenType =
  | "number"
  | "op"
  | "func"
  | "lparen"
  | "rparen"
  | "postfix"
  | "const";

interface Token {
  type: TokenType;
  value: string;
}

const FUNCTIONS = new Set(["sin", "cos", "tan", "log", "ln", "sqrt"]);
const CONSTANTS: Record<string, number> = {
  "\u03c0": Math.PI, // π
  pi: Math.PI,
  e: Math.E,
};

const PRECEDENCE: Record<string, number> = {
  "+": 2,
  "-": 2,
  "*": 3,
  "/": 3,
  "u-": 5,
  "^": 6,
};
const RIGHT_ASSOC = new Set(["^", "u-"]);

/** Turn a raw display string into tokens. Supports: digits, . , + - * / ^ ( ) % ! π e
 *  and function names sin cos tan log ln sqrt (as literal prefixes, e.g. "sin(").
 */
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = input.replace(/\s+/g, "");

  const prevIsValueLike = (): boolean => {
    const prev = tokens[tokens.length - 1];
    if (!prev) return false;
    return prev.type === "number" || prev.type === "rparen" || prev.type === "postfix" || prev.type === "const";
  };

  while (i < s.length) {
    const c = s[i];

    if (/[0-9.]/.test(c)) {
      let num = c;
      i++;
      while (i < s.length && /[0-9.]/.test(s[i])) {
        num += s[i];
        i++;
      }
      if ((num.match(/\./g) || []).length > 1) {
        throw new CalculatorError("SYNTAX", "Meow?! That number has too many dots.");
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    if (c === "\u03c0" || c === "e") {
      // constant, but "e" could theoretically clash with function names - not an issue here
      tokens.push({ type: "const", value: c });
      i++;
      continue;
    }

    let matchedFn = "";
    for (const fn of FUNCTIONS) {
      if (s.startsWith(fn, i)) {
        matchedFn = fn;
        break;
      }
    }
    if (matchedFn) {
      tokens.push({ type: "func", value: matchedFn });
      i += matchedFn.length;
      continue;
    }

    if (c === "(") {
      tokens.push({ type: "lparen", value: c });
      i++;
      continue;
    }
    if (c === ")") {
      tokens.push({ type: "rparen", value: c });
      i++;
      continue;
    }
    if (c === "!") {
      tokens.push({ type: "postfix", value: "!" });
      i++;
      continue;
    }
    if (c === "%") {
      tokens.push({ type: "postfix", value: "%" });
      i++;
      continue;
    }
    if (c === "+" || c === "-" || c === "*" || c === "/" || c === "^") {
      if (c === "-" && !prevIsValueLike()) {
        tokens.push({ type: "op", value: "u-" });
      } else {
        tokens.push({ type: "op", value: c });
      }
      i++;
      continue;
    }

    throw new CalculatorError("SYNTAX", `Hiss! Unknown symbol "${c}".`);
  }

  return tokens;
}

/** Shunting-yard: convert infix tokens to RPN (postfix) token list. */
export function toRPN(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const stack: Token[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "number":
      case "const":
        output.push(token);
        break;
      case "func":
        stack.push(token);
        break;
      case "postfix":
        // Applies immediately to whatever is already computed (highest precedence)
        output.push(token);
        break;
      case "op": {
        while (
          stack.length &&
          stack[stack.length - 1].type === "op" &&
          (PRECEDENCE[stack[stack.length - 1].value] > PRECEDENCE[token.value] ||
            (PRECEDENCE[stack[stack.length - 1].value] === PRECEDENCE[token.value] &&
              !RIGHT_ASSOC.has(token.value)))
        ) {
          output.push(stack.pop()!);
        }
        stack.push(token);
        break;
      }
      case "lparen":
        stack.push(token);
        break;
      case "rparen": {
        let foundLParen = false;
        while (stack.length) {
          const top = stack.pop()!;
          if (top.type === "lparen") {
            foundLParen = true;
            break;
          }
          output.push(top);
        }
        if (!foundLParen) {
          throw new CalculatorError("SYNTAX", "Purrplexing... mismatched parentheses.");
        }
        if (stack.length && stack[stack.length - 1].type === "func") {
          output.push(stack.pop()!);
        }
        break;
      }
    }
  }

  while (stack.length) {
    const top = stack.pop()!;
    if (top.type === "lparen" || top.type === "rparen") {
      throw new CalculatorError("SYNTAX", "Purrplexing... mismatched parentheses.");
    }
    output.push(top);
  }

  return output;
}

function factorial(n: number): number {
  if (n < 0 || !Number.isFinite(n) || Math.floor(n) !== n) {
    throw new CalculatorError("DOMAIN", "Cats can't count non-whole or negative factorials!");
  }
  if (n > 170) throw new CalculatorError("OVERFLOW", "That number is too big, even for nine lives.");
  let result = 1;
  for (let k = 2; k <= n; k++) result *= k;
  return result;
}

export function evalRPN(rpn: Token[], angleMode: AngleMode): number {
  const stack: number[] = [];

  const toRad = (v: number) => (angleMode === "DEG" ? (v * Math.PI) / 180 : v);

  for (const token of rpn) {
    if (token.type === "number") {
      stack.push(parseFloat(token.value));
    } else if (token.type === "const") {
      const v = CONSTANTS[token.value];
      if (v === undefined) throw new CalculatorError("SYNTAX", "Unknown constant.");
      stack.push(v);
    } else if (token.type === "postfix") {
      const a = stack.pop();
      if (a === undefined) throw new CalculatorError("SYNTAX", "Nothing to apply that to.");
      if (token.value === "!") stack.push(factorial(a));
      else if (token.value === "%") stack.push(a / 100);
    } else if (token.type === "func") {
      const a = stack.pop();
      if (a === undefined) throw new CalculatorError("SYNTAX", "Missing value for function.");
      switch (token.value) {
        case "sin":
          stack.push(Math.sin(toRad(a)));
          break;
        case "cos":
          stack.push(Math.cos(toRad(a)));
          break;
        case "tan": {
          const rad = toRad(a);
          const cos = Math.cos(rad);
          if (Math.abs(cos) < 1e-12) {
            throw new CalculatorError("DOMAIN", "Tangent goes to infinity there — too far to pounce.");
          }
          stack.push(Math.tan(rad));
          break;
        }
        case "log":
          if (a <= 0) throw new CalculatorError("DOMAIN", "Can't log a number that isn't positive.");
          stack.push(Math.log10(a));
          break;
        case "ln":
          if (a <= 0) throw new CalculatorError("DOMAIN", "Can't take ln of a number that isn't positive.");
          stack.push(Math.log(a));
          break;
        case "sqrt":
          if (a < 0) throw new CalculatorError("DOMAIN", "No square roots of negative numbers here!");
          stack.push(Math.sqrt(a));
          break;
      }
    } else if (token.type === "op") {
      if (token.value === "u-") {
        const a = stack.pop();
        if (a === undefined) throw new CalculatorError("SYNTAX", "Missing value.");
        stack.push(-a);
        continue;
      }
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) {
        throw new CalculatorError("SYNTAX", "That expression trails off into silence.");
      }
      switch (token.value) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          if (b === 0) throw new CalculatorError("DIV_ZERO", "Cannot divide by zero — the cat hisses.");
          stack.push(a / b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
      }
    }
  }

  if (stack.length !== 1) {
    throw new CalculatorError("SYNTAX", "That expression doesn't quite add up.");
  }
  const result = stack[0];
  if (!Number.isFinite(result)) {
    if (Number.isNaN(result)) throw new CalculatorError("DOMAIN", "That's not a number the cat recognizes.");
    throw new CalculatorError("OVERFLOW", "The result ran off further than a cat can chase a laser.");
  }
  return result;
}

/** Evaluate a raw calculator display string end-to-end. Throws CalculatorError on problems. */
export function evaluate(expression: string, angleMode: AngleMode = "DEG"): number {
  if (!expression.trim()) return 0;
  const tokens = tokenize(expression);
  const rpn = toRPN(tokens);
  return evalRPN(rpn, angleMode);
}

/** Format a number for display: trims floating point noise, uses reasonable precision. */
export function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "Error";
  if (Object.is(value, -0)) value = 0;
  if (Math.abs(value) > 0 && (Math.abs(value) >= 1e15 || Math.abs(value) < 1e-9)) {
    return value.toExponential(6).replace(/\.?0+e/, "e");
  }
  const rounded = Math.round(value * 1e10) / 1e10;
  let str = rounded.toString();
  if (str.length > 15) {
    str = rounded.toPrecision(12).replace(/\.?0+$/, "");
  }
  return str;
}
