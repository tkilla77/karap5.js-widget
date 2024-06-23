import esprima = require("esprima");

/**
 * Recombines hidden and visible code artifacts.
 */
export function preparePreviewCode(hiddenCode: string, editorContent: string) {
    if (isFunctionlessToplevelCode(editorContent)) {
        editorContent = `function my_kara(kara) { ${editorContent} }`;
    }
    return editorContent + '\n\n' + hiddenCode;
}

function isFunctionlessToplevelCode(code: string) {
    let ast: ESTree.Program;

    try {
      ast = esprima.parse(code);
    } catch (e) {
      return code;
    }
  
    for (let i = 0; i < ast.body.length; i++) {
      let statement = ast.body[i];
      if (isWellknownProcessingFunction(statement, ['my_kara'])) {
        return false;
      }
    }
    return true;
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
        ast = esprima.parse(code, { range: true });
    } catch (e) {
        return { hidden: '', visible: code };
    }
    
    let hidden = "";
    let visible = "";
    let start = 0;
    for (let i = 0; i < ast.body.length; i++) {
        let statement = ast.body[i];
        if (isKaraWorldCreation(statement) || isWellknownProcessingFunction(statement)) {
            let range = statement.range;
            let visibleBlock = code.slice(start, range[0]);
            let hiddenBlock = code.slice(...range);
            start = range[1];
            visible += `${visibleBlock}\n`;
            hidden += `${hiddenBlock}\n`;
        }
    }
    visible += code.slice(start, code.length);
    return { hidden: hidden, visible: visible };
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

function isWellknownProcessingFunction(statement: ESTree.Expression, names=['draw', 'setup']) {
    if (statement.type === esprima.Syntax.FunctionDeclaration) {
        let funcDecl = statement as ESTree.FunctionDeclaration;

        if (names.includes(funcDecl.id.name)) {
            return true;
        }
    }

    if (statement.type === esprima.Syntax.VariableDeclaration) {
        let varDecl = statement as ESTree.VariableDeclaration;

        for (let j = 0; j < varDecl.declarations.length; j++) {
            // This is a bit odd because our ESTree typings indicate
            // that a VariableDeclarator.id is a Pattern, but it
            // seems to actually be an Identifier, so we'll forcibly
            // typecast it as such.
            let id = varDecl.declarations[j].id as ESTree.Identifier;

            if (names.includes(id.name)) {
                return true;
            }
        }
        return false;
    }
}
