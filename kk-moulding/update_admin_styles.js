const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./app/admin').filter(f => f.endsWith('.tsx'));

let changedFiles = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace custom CSS vars with Tailwind Hex colors
  content = content.replace(/style=\{\{\s*color:\s*'var\(--color-ink\)'\s*\}\}/g, 'className="text-[#3E2723]"');
  content = content.replace(/style=\{\{\s*color:\s*'var\(--color-stone\)'\s*\}\}/g, 'className="text-[#8C6239]"');
  content = content.replace(/style=\{\{\s*color:\s*'var\(--color-walnut\)'\s*\}\}/g, 'className="text-[#8C6239]"');
  content = content.replace(/style=\{\{\s*backgroundColor:\s*'var\(--color-ivory\)'\s*\}\}/g, 'className="bg-[#FAFAFA]"');
  content = content.replace(/style=\{\{\s*backgroundColor:\s*'var\(--color-warm-white\)'\s*\}\}/g, 'className="bg-[#FFFFFF]"');
  
  // Custom classes -> Tailwind
  content = content.replace(/className="card-premium"/g, 'className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm"');
  content = content.replace(/className="([^"]*)card-premium([^"]*)"/g, 'className="$1bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm$2"');
  
  content = content.replace(/className="btn-primary"/g, 'className="bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50"');
  content = content.replace(/className="([^"]*)btn-primary([^"]*)"/g, 'className="$1bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50$2"');

  content = content.replace(/className="btn-secondary"/g, 'className="bg-[#FFFFFF] text-[#8C6239] border border-[#E6D5C3] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#F5EFE9] transition-colors shadow-sm"');
  content = content.replace(/className="([^"]*)btn-secondary([^"]*)"/g, 'className="$1bg-[#FFFFFF] text-[#8C6239] border border-[#E6D5C3] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#F5EFE9] transition-colors shadow-sm$2"');

  content = content.replace(/className="input-field"/g, 'className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"');
  content = content.replace(/className="([^"]*)input-field([^"]*)"/g, 'className="$1w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all$2"');

  content = content.replace(/className="section-label"/g, 'className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium"');
  content = content.replace(/className="([^"]*)section-label([^"]*)"/g, 'className="$1font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium$2"');

  // Fix mixed string template className interpolations
  content = content.replace(/\$\{?'var\(--color-([a-z-]+)\)'\}?/g, (match, color) => {
    if (color === 'ink') return '#3E2723';
    if (color === 'stone') return '#8C6239';
    if (color === 'walnut') return '#8C6239';
    if (color === 'ivory') return '#FAFAFA';
    if (color === 'warm-white') return '#FFFFFF';
    if (color === 'beige-dark') return '#E6D5C3';
    if (color === 'beige') return '#F5EFE9';
    return match;
  });

  // Clean up stray style tags with variables
  content = content.replace(/style=\{\{\s*borderColor:\s*'var\(--color-beige-dark\)'\s*\}\}/g, 'className="border-[#E6D5C3]"');
  content = content.replace(/style=\{\{\s*backgroundColor:\s*'var\(--color-beige-dark\)'\s*\}\}/g, 'className="bg-[#E6D5C3]"');
  content = content.replace(/style=\{\{\s*backgroundColor:\s*'var\(--color-beige\)'\s*\}\}/g, 'className="bg-[#F5EFE9]"');

  if (original !== content) {
    fs.writeFileSync(f, content);
    changedFiles++;
  }
});

console.log('Changed ' + changedFiles + ' admin files to Tailwind.');
