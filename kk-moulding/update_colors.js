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
  
  // White backgrounds
  content = content.replace(/#F4F0EB/g, '#FFFFFF');
  content = content.replace(/#F9F6F0/g, '#FAFAFA');
  content = content.replace(/bg-\\[#F4F0EB\\]/g, 'bg-[#FFFFFF]');
  
  // Dark Wooden Brown for Text
  content = content.replace(/#111111/g, '#3E2723');
  content = content.replace(/#1A1A1A/g, '#3E2723');
  content = content.replace(/text-\\[#1A1A1A\\]/g, 'text-[#3E2723]');
  
  // Wooden Light Brown for Accents/Buttons
  content = content.replace(/bg-\\[#1A1A1A\\]/g, 'bg-[#A67B5B]');
  content = content.replace(/border-\\[#1A1A1A\\]/g, 'border-[#A67B5B]');
  
  // Light Wood Borders
  content = content.replace(/#D4CFC9/g, '#E6D5C3');
  content = content.replace(/#E8E0D5/g, '#E6D5C3');
  
  // Secondary text (Warm brown)
  content = content.replace(/#666666/g, '#8C6239');
  
  // Specific fixes for inline styles in globals.css and Navbar
  content = content.replace(/background-color: #1A1A1A/g, 'background-color: #A67B5B');
  content = content.replace(/color: #1A1A1A/g, 'color: #3E2723');
  content = content.replace(/border: 1px solid #1A1A1A/g, 'border: 1px solid #A67B5B');
  content = content.replace(/background-color: #333333/g, 'background-color: #8C5A35');
  
  // Mobile Nav Background fix (in Navbar.tsx)
  content = content.replace(/bg-\\[#FFFFFF\\] transition-transform/g, 'bg-[#FFFFFF] transition-transform" style={{ backgroundColor: "#FFFFFF" }}');
  
  if (original !== content) {
    fs.writeFileSync(f, content);
    changedFiles++;
  }
});
console.log('Changed ' + changedFiles + ' files.');
