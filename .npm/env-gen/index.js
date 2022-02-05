/**
 * generates env files based on a given env definition
 */
const { Command } = require("commander");
const fs = require("fs");
const prompt = require("prompt");
const env = require("./env-def");
const genEnv = new Command();
/** commands */
const VERSION = "v1";

genEnv
  .version(VERSION)
  .name("genEnv")
  .description("Generate Environment Files to be used within the application");

/** Generate environment files based on a given definition */
genEnv
  .command("generate [suffix]")
  .description("generate env files based on a given environment definition")
  .action(async (suffix) => {
    const curr = {};
    if (suffix && String(suffix).length) {
      suffix = "." + suffix;
    } else {
      suffix = "";
    }
    try {
      fs.readFileSync('.env'+suffix,{
        encoding: 'utf-8'
      }).split('\n')
      .forEach(variable =>{
          curr[variable.split(' = ')[0]] = variable.split(' = ')[1]
      })
    } catch (error) {

    }
    const values = (await recursivelyPromptValues(Object.keys(env),curr)).join("\n");
    fs.writeFileSync(".env" + suffix, values);
  });

/**
 * Recursively prompts values for given environment variables from user
 * @param {string[]} varnames string[]
 */
async function recursivelyPromptValues(varnames = [],curr={}) {
  let valList = [];
  if (varnames.length === 0) {
    return valList;
  } else {
    const name = varnames.pop();
    let val = (
      await prompt.get({
        description: `value for ${name}`,
        name: "type",
        default: curr[name],
      })
    )["type"];
    // Validate type
    if(String(val).length===0){
      val = curr[name]
    }
    valList.push(`${name} = ${val}`);
    return [...valList, ...(await recursivelyPromptValues(varnames,curr))];
  }
}

genEnv.parse();
