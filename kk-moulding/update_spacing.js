const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./app').concat(walkSync('./components'));
const targetFiles = files.filter(f => f.endsWith('.tsx') || f.endsWith('.css'));

let changedFiles = 0;
targetFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  // Halve the padding classes globally
  content = content.replace(/pt-40/g, 'pt-20');
  content = content.replace(/pb-40/g, 'pb-20');
  content = content.replace(/py-40/g, 'py-20');
  
  content = content.replace(/pt-32/g, 'pt-16');
  content = content.replace(/pb-32/g, 'pb-16');
  content = content.replace(/py-32/g, 'py-16');
  
  content = content.replace(/pt-24/g, 'pt-12');
  content = content.replace(/pb-24/g, 'pb-12');
  content = content.replace(/py-24/g, 'py-12');
  
  content = content.replace(/pt-20/g, 'pt-10'); // sometimes pt-20 might be too big
  
  // Also reduce gap classes if they are massive
  content = content.replace(/gap-24/g, 'gap-12');
  content = content.replace(/gap-32/g, 'gap-16');
  
  // Fix section-padding in globals.css
  if (f.endsWith('globals.css')) {
    content = content.replace(/padding-top: 6rem;/g, 'padding-top: 3rem;');
    content = content.replace(/padding-bottom: 6rem;/g, 'padding-bottom: 3rem;');
    content = content.replace(/padding-top: 8rem;/g, 'padding-top: 4rem;');
    content = content.replace(/padding-bottom: 8rem;/g, 'padding-bottom: 4rem;');
  }
  
  if (original !== content) {
    fs.writeFileSync(f, content);
    changedFiles++;
  }
});
console.log('Changed ' + changedFiles + ' files to fix spacing.');
