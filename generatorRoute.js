const fs = require('fs');
const path = require('path');

const routes = [];
const pagesDir = path.resolve(__dirname, './app/pages');
const routesDir = path.resolve(__dirname, './app/routes/api.js')

function getRoutes(filePath) {
  const dirArr = fs.readdirSync(filePath);

  dirArr.forEach(fileName => {
    const fileDir = path.join(filePath, fileName);
    const stat = fs.statSync(fileDir)

    const isFile = stat.isFile();//是文件
    const isDir = stat.isDirectory();//是文件夹

    if (isFile) {
      const src = fileDir
        .replace(path.join(__dirname, './app'), 'app')
        .replace(/.js$/, '')
        .replace(/\/index/,'');

      let fileName = path.basename(src, '.js');

      if (fileName === "index") {
        const srcArr = src.split(path.sep);
        fileName = srcArr[srcArr.length - 2];
      }

      const pageInfo = {
        fileName: firstWordsUp(fileName),
        src
      }

      routes.push(pageInfo)
    }

    if (isDir) {
      getRoutes(fileDir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
}

getRoutes(pagesDir);

let imports = '';
let page = '';
let template = '';

routes.forEach(item => {
  imports += `import ${item.fileName} from '${item.src}';\n`
  page += `{
    name: "${item.fileName}",
    component: ${item.fileName}
  },`
})

template = `${imports}
const routes = [
  ${page}
];

export default routes;
`

writeFile(routesDir,template)

function writeFile(path, result) {
  fs.writeFile(path, result, function (err) {
    if (err) {
      console.log("写入失败", err);
    } else {
      console.log("写入成功");
    }
  });
}


function firstWordsUp(word) {
  if (typeof word !== 'string') {
    return word
  }
  return word.replace(/^[A-Za-z]?/, (v) => v.toLocaleUpperCase())
}

