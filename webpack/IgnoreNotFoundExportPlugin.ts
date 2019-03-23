import { compilation, Compiler } from "webpack";

/**
 * This plugin removes all warnings about missing exports.
 * It's happening because typescript removes type imports after transpiling.
 * It is save to remove this warnings as typescript by this time already checked all the exports/imports.
 */
class IgnoreNotFoundExportPlugin {
  public apply(compiler: Compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
    function emitHook(comp: compilation.Compilation) {
      comp.warnings = comp.warnings.filter(warn => {
        if (messageRegExp.test(warn.message)) {
          return false;
        }
        return true;
      });
    }

    compiler.hooks.emit.tap("IgnoreNotFoundExportPlugin", emitHook);
  }
}

export default IgnoreNotFoundExportPlugin;
