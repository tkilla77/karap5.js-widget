import esprima = require("esprima");

/**
 * Recombines hidden and visible code artifacts.
 */
export function preparePreviewCode(hiddenCode: string, editorContent: string) {
    // TODO: add implicit my_kara function around editor content
    return hiddenCode + '\n\n' + editorContent;
}

/**
 * Splits the code into Kara setup code hidden from the user-visible editor
 * and the visible part.
 *
 * @param code the intial code
 * @returns an object with 'hidden' and 'visible' properties for each part
 */
export function splitHiddenKaraCode(code: string) {
    let ast: ESTree.Program;

    try {
      ast = esprima.parse(code, {range: true});
    } catch (e) {
      return {hidden: "", visible: code};
    }
  
    for (let i = 0; i < ast.body.length; i++) {
      let statement = ast.body[i];
      console.log(`Visiting ${statement.type}`)
      if (isKaraWorldCreation(statement)) {
        let range = statement.range;
        let visible = code.slice(0, range[0]) + code.slice(range[1], code.length);
        let hidden = code.slice(...range);
        return {hidden: hidden, visible: visible};
      }
    }
    return {hidden: "", visible: code};
}


/**
 * Detects a top-level method call to KaraWorld.create, or a top-level
 * variable assignment making such a call. This is really rudimentary and
 * no full static analysis is performed.
 * 
 * @param node the node to recursively check
 * @returns true if node represents a top-level KaraWorld.create call
 */
function isKaraWorldCreation(node: ESTree.Expression) {
    switch (node.type) {
        case esprima.Syntax.MemberExpression:
            let memberExpr = node as ESTree.MemberExpression;
            return memberExpr.object['name'] == 'KaraWorld' && memberExpr.property['name'] == 'create';
        case esprima.Syntax.CallExpression:
            return isKaraWorldCreation((node as ESTree.CallExpression).callee);
        case esprima.Syntax.VariableDeclaration:
            return isKaraWorldCreation((node as ESTree.VariableDeclaration).declarations[0]);
        case esprima.Syntax.ExpressionStatement:
            return isKaraWorldCreation((node as ESTree.ExpressionStatement).expression);
    }
    return false;
}