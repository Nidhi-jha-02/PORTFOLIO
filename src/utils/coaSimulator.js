/**
 * COA Instruction Format & Architecture Simulator Utility
 * Compiles arithmetic expressions into 0-Address, 1-Address, 2-Address, and 3-Address instruction sets.
 */

export function tokenize(expr) {
  if (!expr || typeof expr !== 'string') return [];
  return expr.replace(/\s+/g, '').match(/([A-Za-z0-9]+|[-+*/()])/g) || [];
}

export function parseExpression(tokens) {
  let pos = 0;

  function parsePrimary() {
    if (pos >= tokens.length) return { type: 'var', name: '0' };
    const token = tokens[pos++];
    if (token === '(') {
      const expr = parseAddSub();
      if (pos < tokens.length && tokens[pos] === ')') pos++;
      return expr;
    }
    return { type: 'var', name: token };
  }

  function parseMulDiv() {
    let node = parsePrimary();
    while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
      const op = tokens[pos++];
      const right = parsePrimary();
      node = { type: 'op', op, left: node, right };
    }
    return node;
  }

  function parseAddSub() {
    let node = parseMulDiv();
    while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
      const op = tokens[pos++];
      const right = parseMulDiv();
      node = { type: 'op', op, left: node, right };
    }
    return node;
  }

  try {
    return parseAddSub();
  } catch {
    return { type: 'var', name: 'A' };
  }
}

export function infixToPostfix(tokens) {
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const out = [];
  const stack = [];

  for (const token of tokens) {
    if (/^[A-Za-z0-9]+$/.test(token)) {
      out.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        out.push(stack.pop());
      }
      if (stack.length) stack.pop();
    } else if (prec[token]) {
      while (stack.length && prec[stack[stack.length - 1]] >= prec[token]) {
        out.push(stack.pop());
      }
      stack.push(token);
    }
  }
  while (stack.length) out.push(stack.pop());
  return out;
}

// 0-Address (Stack CPU Architecture)
export function generate0Address(postfix, resultVar = 'X') {
  const steps = [];
  const stackState = [];

  for (const token of postfix) {
    if (/^[A-Za-z0-9]+$/.test(token)) {
      stackState.push(token);
      steps.push({
        step: steps.length + 1,
        mnemonic: 'PUSH',
        operand: token,
        action: `TOS ← M[${token}]`,
        stackSnap: [...stackState],
        activeHw: `Pushed '${token}' onto Top of Stack`,
        explanation: `Fetches operand '${token}' from main memory and pushes it onto the Top of Stack (TOS). Stack grows downward.`
      });
    } else {
      const op2 = stackState.length ? stackState.pop() : 'B';
      const op1 = stackState.length ? stackState.pop() : 'A';
      const res = `(${op1} ${token} ${op2})`;
      stackState.push(res);
      const mnem = token === '+' ? 'ADD' : token === '-' ? 'SUB' : token === '*' ? 'MUL' : 'DIV';
      steps.push({
        step: steps.length + 1,
        mnemonic: mnem,
        operand: '',
        action: `TOS ← ${op1} ${token} ${op2}`,
        stackSnap: [...stackState],
        activeHw: `ALU popped [${op2}, ${op1}] → pushed result`,
        explanation: `Zero-address operation. Pops the two topmost stack operands, ALU computes '${op1} ${token} ${op2}', and pushes the result back onto TOS.`
      });
    }
  }

  const finalRes = stackState.length ? stackState.pop() : 'Result';
  steps.push({
    step: steps.length + 1,
    mnemonic: 'POP',
    operand: resultVar,
    action: `M[${resultVar}] ← TOS`,
    stackSnap: [],
    activeHw: `Popped TOS → M[${resultVar}]`,
    explanation: `Pops the final evaluated expression '${finalRes}' from TOS and stores it into target memory variable '${resultVar}'. Stack is now empty.`
  });

  return steps;
}

// 1-Address (Accumulator Architecture)
export function generate1Address(ast, resultVar = 'X') {
  const steps = [];
  let tempCount = 1;

  function helper(node, isRoot = false) {
    if (!node) return 'A';
    if (node.type === 'var') return node.name;

    const leftIsSimple = node.left && node.left.type === 'var';
    const rightIsSimple = node.right && node.right.type === 'var';
    const mnem = node.op === '+' ? 'ADD' : node.op === '-' ? 'SUB' : node.op === '*' ? 'MUL' : 'DIV';

    if (leftIsSimple && rightIsSimple) {
      steps.push({
        step: steps.length + 1,
        mnemonic: 'LOAD',
        operand: node.left.name,
        action: `AC ← M[${node.left.name}]`,
        acSnap: node.left.name,
        activeHw: `Accumulator (AC) = ${node.left.name}`,
        explanation: `Loads memory operand '${node.left.name}' into the Accumulator (AC) register. AC becomes the implicit first operand.`
      });
      steps.push({
        step: steps.length + 1,
        mnemonic: mnem,
        operand: node.right.name,
        action: `AC ← AC ${node.op} M[${node.right.name}]`,
        acSnap: `(${node.left.name} ${node.op} ${node.right.name})`,
        activeHw: `ALU: AC = AC ${node.op} M[${node.right.name}]`,
        explanation: `Single-address operation. ALU combines the implicit AC operand with memory operand '${node.right.name}', storing the result back in AC.`
      });
      if (!isRoot) {
        const temp = `T${tempCount++}`;
        steps.push({
          step: steps.length + 1,
          mnemonic: 'STORE',
          operand: temp,
          action: `M[${temp}] ← AC`,
          acSnap: `(${node.left.name} ${node.op} ${node.right.name})`,
          activeHw: `Saved AC → Memory[${temp}]`,
          explanation: `Saves intermediate evaluation from AC into temporary memory cell '${temp}' to free up AC for subsequent operations.`
        });
        return temp;
      }
      return 'AC';
    }

    const leftRes = helper(node.left);
    const rightRes = helper(node.right);

    if (node.op === '+' || node.op === '*') {
      steps.push({
        step: steps.length + 1,
        mnemonic: mnem,
        operand: leftRes,
        action: `AC ← AC ${node.op} M[${leftRes}]`,
        acSnap: `(${leftRes} ${node.op} ${rightRes})`,
        activeHw: `ALU: AC = AC ${node.op} M[${leftRes}]`,
        explanation: `Commutative operation. Combines current AC content with previously saved intermediate value '${leftRes}'.`
      });
    } else {
      const tempRight = `T${tempCount++}`;
      steps.push({
        step: steps.length + 1,
        mnemonic: 'STORE',
        operand: tempRight,
        action: `M[${tempRight}] ← AC`,
        acSnap: rightRes,
        activeHw: `Saved AC → Memory[${tempRight}]`,
        explanation: `Saves right-hand sub-expression into temporary memory '${tempRight}'.`
      });
      steps.push({
        step: steps.length + 1,
        mnemonic: 'LOAD',
        operand: leftRes,
        action: `AC ← M[${leftRes}]`,
        acSnap: leftRes,
        activeHw: `Accumulator (AC) = ${leftRes}`,
        explanation: `Loads left-hand intermediate term '${leftRes}' into AC for non-commutative ordering.`
      });
      steps.push({
        step: steps.length + 1,
        mnemonic: mnem,
        operand: tempRight,
        action: `AC ← AC ${node.op} M[${tempRight}]`,
        acSnap: `(${leftRes} ${node.op} ${rightRes})`,
        activeHw: `ALU: AC = AC ${node.op} M[${tempRight}]`,
        explanation: `Computes '${leftRes} ${node.op} ${tempRight}' in AC using ALU.`
      });
    }

    if (!isRoot) {
      const temp = `T${tempCount++}`;
      steps.push({
        step: steps.length + 1,
        mnemonic: 'STORE',
        operand: temp,
        action: `M[${temp}] ← AC`,
        acSnap: `(${leftRes} ${node.op} ${rightRes})`,
        activeHw: `Saved AC → Memory[${temp}]`,
        explanation: `Stores intermediate result from AC into '${temp}'.`
      });
      return temp;
    }
    return 'AC';
  }

  helper(ast, true);

  steps.push({
    step: steps.length + 1,
    mnemonic: 'STORE',
    operand: resultVar,
    action: `M[${resultVar}] ← AC`,
    acSnap: 'Final Result',
    activeHw: `Wrote AC → Destination M[${resultVar}]`,
    explanation: `Transfers final expression value from the Accumulator into destination memory address '${resultVar}'.`
  });

  return steps;
}

// 2-Address (General Register Architecture)
export function generate2Address(ast, resultVar = 'X') {
  const steps = [];
  let regCount = 1;

  function helper(node) {
    if (!node) return 'A';
    if (node.type === 'var') return node.name;

    const left = helper(node.left);
    const right = helper(node.right);
    const reg = `R${regCount++}`;
    const mnem = node.op === '+' ? 'ADD' : node.op === '-' ? 'SUB' : node.op === '*' ? 'MUL' : 'DIV';

    steps.push({
      step: steps.length + 1,
      mnemonic: 'MOV',
      operand: `${reg}, ${left}`,
      action: `${reg} ← ${left}`,
      activeHw: `Loaded ${left} → Register ${reg}`,
      explanation: `Loads first operand '${left}' into processor register '${reg}'.`
    });

    steps.push({
      step: steps.length + 1,
      mnemonic: mnem,
      operand: `${reg}, ${right}`,
      action: `${reg} ← ${reg} ${node.op} ${right}`,
      activeHw: `ALU: ${reg} = ${reg} ${node.op} ${right}`,
      explanation: `Two-address operation: '${reg}' acts as both source and destination. It performs '${reg} ${node.op} ${right}' and overwrites '${reg}'.`
    });

    return reg;
  }

  const finalReg = helper(ast);
  if (finalReg !== resultVar) {
    steps.push({
      step: steps.length + 1,
      mnemonic: 'MOV',
      operand: `${resultVar}, ${finalReg}`,
      action: `M[${resultVar}] ← ${finalReg}`,
      activeHw: `Stored Register ${finalReg} → Memory M[${resultVar}]`,
      explanation: `Transfers the final computed result from general register '${finalReg}' into memory variable '${resultVar}'.`
    });
  }

  return steps;
}

// 3-Address (Modern 3-Register / RISC Architecture)
export function generate3Address(ast, resultVar = 'X') {
  const steps = [];
  let regCount = 1;

  function helper(node, isRoot = false) {
    if (!node) return 'A';
    if (node.type === 'var') return node.name;

    const left = helper(node.left);
    const right = helper(node.right);
    const dest = isRoot ? resultVar : `R${regCount++}`;
    const mnem = node.op === '+' ? 'ADD' : node.op === '-' ? 'SUB' : node.op === '*' ? 'MUL' : 'DIV';

    steps.push({
      step: steps.length + 1,
      mnemonic: mnem,
      operand: `${dest}, ${left}, ${right}`,
      action: `${dest} ← ${left} ${node.op} ${right}`,
      activeHw: `ALU: ${dest} = ${left} ${node.op} ${right}`,
      explanation: `Three-address instruction: specifies Destination ('${dest}') and two independent Sources ('${left}', '${right}'). Preserves both source values intact.`
    });

    return dest;
  }

  helper(ast, true);
  return steps;
}

export function compileAllFormats(expression, resultVar = 'X') {
  const tokens = tokenize(expression);
  const ast = parseExpression(tokens);
  const postfix = infixToPostfix(tokens);

  return {
    tokens,
    postfix,
    zeroAddress: generate0Address(postfix, resultVar),
    oneAddress: generate1Address(ast, resultVar),
    twoAddress: generate2Address(ast, resultVar),
    threeAddress: generate3Address(ast, resultVar)
  };
}
