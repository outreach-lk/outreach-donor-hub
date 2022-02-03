/**
 * Nextful Script
 * @version 1.0.0
 * a simple utility to create entities and related dtos and repositories based on templates
 * @author @kulathilake shehanhere(at)gmail.com
 */
const fs = require("fs");
const { Command } = require("commander");
const prompt = require("prompt");
const path = require("path");
const nextful = new Command();

const VERSION = "v1";
const NAME_PLACEHOLDER = "%NEXTFUL_ENTITY_NAMAE%";
const PATH_PLACEHOLDER = "%NEXTFUL_ENTITY_PATH%";
const ATTRIB_PLACEHOLDER = "%ATTRIBS%";
const NAME_PLACEHOLDER_REGEX = new RegExp(NAME_PLACEHOLDER, "g");
const PATH_PLACEHOLDER_REGEX = new RegExp(PATH_PLACEHOLDER, "g");
const ATTRIB_PLACEHOLDER_REGEX= new RegExp(ATTRIB_PLACEHOLDER, "g");
const APP_BASE_DIR = "./app";
const ENTITY_BASE_DIR = APP_BASE_DIR + "/data/entities/";
const REPO_BASE_DIR = APP_BASE_DIR + "/data/repos/";
const TYPES_BASE_DIR = APP_BASE_DIR + "/types/";
const DTO_BASE_DIR = TYPES_BASE_DIR + "dtos/";
const I_BASE_DIR = TYPES_BASE_DIR + "interfaces/";

nextful
  .version("1.0.0")
  .name("Nextful.js")
  .description("NextJs REST Entity Utility");

/**
 * create entity.
 */
nextful
  .command("create")
  .description("Create REST entity class, repo and dtos")
  .argument("name", "Entity Name")
  .action(async (name) => {
    var Name = String(name)
      .charAt(0)
      .toUpperCase()
      .concat(String(name).slice(1)); // capitalize name.

    const attributesMap = await promptAttributes(Name);
    const attribs2Propertiess = printAttribs(attributesMap);

    // load templates.
    var dtos = fs.readFileSync(
      __dirname + `/templates/types/dto/dto.template.${VERSION}.txt`,
      "utf-8"
    );
    var entity = fs.readFileSync(
      __dirname + `/templates/entity/entity.template.${VERSION}.txt`,
      "utf-8"
    );
    var repo = fs.readFileSync(
      __dirname + `/templates/repo/repo.template.${VERSION}.txt`,
      "utf-8"
    );
    var i = fs.readFileSync(
      __dirname + `/templates/types/interfaces/i.template.${VERSION}.txt`,
      "utf-8"
    );

    // replace name placeholders
    dtos = dtos
      .replace(NAME_PLACEHOLDER_REGEX, Name)
      .replace(ATTRIB_PLACEHOLDER_REGEX, attribs2Propertiess)
    entity = entity
      .replace(NAME_PLACEHOLDER_REGEX, Name)
      .replace(PATH_PLACEHOLDER_REGEX, name)
      .replace(ATTRIB_PLACEHOLDER_REGEX, attribs2Propertiess)
    repo = repo
      .replace(NAME_PLACEHOLDER_REGEX, Name)
      .replace(PATH_PLACEHOLDER_REGEX, name);
    i = i
      .replace(NAME_PLACEHOLDER_REGEX, Name)
      .replace(PATH_PLACEHOLDER_REGEX, name);

    // write to standard directories.
    fs.writeFile(ENTITY_BASE_DIR + name + ".entity.ts", entity, (err) =>
      fileCreationCb(err, ENTITY_BASE_DIR + name + ".entity.ts")
    );
    fs.writeFile(DTO_BASE_DIR + name + ".dtos.ts", dtos, (err) =>
      fileCreationCb(err, DTO_BASE_DIR + name + ".dto.ts")
    );
    fs.writeFile(REPO_BASE_DIR + name + ".repo.ts", repo, (err) =>
      fileCreationCb(err, REPO_BASE_DIR + name + ".repo.ts")
    );
    fs.writeFile(I_BASE_DIR + name + ".entity.interface.ts", i, (err) =>
      fileCreationCb(err, I_BASE_DIR + name + ".interface.ts")
    );
  });

/**
 * Deletes an entity
 */
nextful
  .command("delete")
  .description("Remove all entity related files")
  .argument("name")
  .action((name) => {
    fs.unlink(ENTITY_BASE_DIR + name + ".entity.ts", (err) =>
      fileDeletionCb(err, ENTITY_BASE_DIR + name + ".entity.ts")
    );
    fs.unlink(DTO_BASE_DIR + name + ".dtos.ts", (err) =>
      fileDeletionCb(err, DTO_BASE_DIR + name + ".dto.ts")
    );
    fs.unlink(REPO_BASE_DIR + name + ".repo.ts", (err) =>
      fileDeletionCb(err, REPO_BASE_DIR + name + ".repo.ts")
    );
    fs.unlink(I_BASE_DIR + name + ".entity.interface.ts", (err) =>
      fileDeletionCb(err, I_BASE_DIR + name + ".interface.ts")
    );
  });
nextful.parse();

/**
 * Prompts entity attributes and their types
 * @param {string} name name of entity
 * @returns {{name:type}[]} array of attribute name type pairs.
 */
async function promptAttributes(name) {
  console.log("Attributes of " + name);

  let max = await prompt.get({
    description: "number of attributes",
    name: "val",
    default: 1,
    type: "number",
  });
  const attribs = await prompt.get({
    description: "Attribute",
    maxItems: max.val,
    name: "names",
    type: "array",
  });

  return await recursivelyPromptTypes(attribs["names"].reverse());
}

/**
 * Recursively prompts types for given attribute names from user
 * @param {string[]} attribnames string[]
 */
async function recursivelyPromptTypes(attribnames = []) {
  let typeMap = [];
  if (attribnames.length === 0) {
    return typeMap;
  } else {
    const name = attribnames.pop();
    let type = (
      await prompt.get({
        description: `type of ${name}`,
        name: "type",
      })
    )["type"];
    // Validate type
    if (isValidType(type)) {
      typeMap.push({ [name]: type });
    } else {
      console.error(`Invalid Type: ${type}`);
      console.log(`Valid Primitives: string, number, boolean`);
      attribnames.push(name);
    }
    return [...typeMap, ...(await recursivelyPromptTypes(attribnames))];
  }
}

/**
 * @todo validate given type against all type definitions available and enitites created.
 * @param {*} type
 * @returns
 */
function isValidType(type) {
  return true;
}

/** disk io callbacks */
function fileCreationCb(err, path) {
  if (err) {
    throw err;
  } else {
    console.log(`Created File: ${path}`);
  }
}
function fileDeletionCb(err, path) {
  if (err) {
    throw err;
  } else {
    console.log(`Deleted File: ${path}`);
  }
}

/**
 * prints the attributes into the entity & dto files.
 * @param {{name:type}[]} attribs 
 */
function printAttribs(attribs=[]){
    return attribs.map(a=>{
        const pair = Object.entries(a)[0]
        return `${pair[0]}: ${pair[1]}`
    }).join('\n');
}