/**
 * Writes all api paths to a config file
 * @kulathilake
 */
const fs = require('fs');
const path = require('path');
(function mapper(){
    const VERSION = "v1";
    console.log('next api mapper '+ VERSION);

    fs.readdir('./pages/api',(e,l)=>{
        if(e){

        }else{
            const paths = scan('./pages/api',l);
            fs.writeFileSync('./app/apis/api-map.json',JSON.stringify(paths,null,2),{
                encoding: 'utf-8'
            });
        }
    })
    
})()

function scan(root,paths = []){
    var results = {};
    if(paths.length === 0){
        return results;
    }else{
        const curr = paths.pop();
        if(fs.statSync(path.join(root,curr)).isDirectory()){
            // Scan Siblings and return
            if(process.argv.some(a=>a==='-v')){
                console.info(`scanning ${path.join(root,curr)}`)
            }
            try {
                const children = fs.readdirSync(path.join(root,curr));
                results = {
                    root: `${String(root).replace('pages/','')}/${curr}`,
                    ...scan(path.join(root,curr),children)
                };
            } catch (error) {
                if(error.code == 'ENOTDIR'){
                    results = null;
                }else{
                    console.log(error);
                    throw error;
                }
            }
            //Scan siblings and return
            return {[curr]: results, ...scan(root, paths)}
        }else{
            // Read file for return type and attach
            const file = fs.readFileSync(path.join(root,curr),{
                encoding: 'utf-8'
            });
            const responseTypeRegex = new RegExp("NextApiResponse<.*?>")
            const responseType = file.match(responseTypeRegex);
            const handlerDesc = {
                path: `${String(root).replace('pages/','')}/${String(curr).slice(0,-3)}`,
                responseType: responseType?`${responseType[0]}`:null,
                request: {
                    body: {}
                }
            }
            return {[String(curr).slice(0,-3)]: handlerDesc, ...scan(root,paths)};
        }
        
    }
}