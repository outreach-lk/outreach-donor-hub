const fs = require('fs');
const {Command} = require('commander');
const path = require('path');
const entity = new Command();

const VERSION = 'v1';
const PLACEHOLDER = '%NEXTFUL_ENTITY_NAMAE%';
const PLACEHOLDER_REGEX = new RegExp(PLACEHOLDER,'g');
const APP_BASE_DIR = './app';
const ENTITY_BASE_DIR = APP_BASE_DIR + '/data/entities/';
const REPO_BASE_DIR = APP_BASE_DIR + '/data/repos/';
const DTO_BASE_DIR = APP_BASE_DIR + '/types/dtos/';

entity
.version('1.0.0')
.name('Nextful.js')
.description('NextJs REST Entity Utility')

/**
 * create entity.
 */
entity.command('create')
.description('Create REST entity class, repo and dtos')
.argument('name', 'Entity Name') 
.action((name)=>{
    var Name = String(name).charAt(0).toUpperCase().concat(String(name).slice(1)) // capitalize name.
    // load templates.
    var dtos = fs.readFileSync(__dirname + `/templates/dto/dto.template.${VERSION}.txt`,'utf-8');
    var entity = fs.readFileSync(__dirname + `/templates/entity/entity.template.${VERSION}.txt`,'utf-8');
    var repo = fs.readFileSync(__dirname + `/templates/repo/repo.template.${VERSION}.txt`,'utf-8');
    
    // replace name placeholders
    dtos = dtos.replace(PLACEHOLDER_REGEX,Name);
    entity = entity.replace(PLACEHOLDER_REGEX,Name);
    repo = repo.replace(PLACEHOLDER_REGEX, Name);

    // write to standard directories.
    fs.writeFile(ENTITY_BASE_DIR + name +'.entity.ts',entity,(err)=>notifyFileCreation(err,ENTITY_BASE_DIR + name +'.entity.ts'));
    fs.writeFile(DTO_BASE_DIR + name +'.dto.ts',dtos,(err)=>notifyFileCreation(err,DTO_BASE_DIR + name +'.dto.ts'));
    fs.writeFile(REPO_BASE_DIR + name +'.repo.ts',repo,(err)=>notifyFileCreation(err,REPO_BASE_DIR + name +'.repo.ts'));
    
})


entity.command('delete')
.argument('name')
.action((name)=>{
    fs.unlink(ENTITY_BASE_DIR + name +'.entity.ts',(err)=>notifyFileDeletion(err,ENTITY_BASE_DIR + name +'.entity.ts'));
    fs.unlink(DTO_BASE_DIR + name +'.dto.ts',(err)=>notifyFileDeletion(err,DTO_BASE_DIR + name +'.dto.ts'));
    fs.unlink(REPO_BASE_DIR + name +'.repo.ts',(err)=>notifyFileDeletion(err,REPO_BASE_DIR + name +'.repo.ts'));
})
entity.parse();


function notifyFileCreation(err,path){
    if(err){
        throw err;
    }else{
        console.log(`Created File: ${path}`)
    }
}

function notifyFileDeletion(err,path){
    if(err){
        throw err;
    }else{
        console.log(`Deleted File: ${path}`)
    }
}
