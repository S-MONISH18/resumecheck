const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace text-white
      // Be careful with specific text-white inside gradients or specific buttons if needed, 
      // but text-foreground is usually right for the app-wide main texts.
      content = content.replace(/text-white/g, 'text-foreground');
      
      // Replace literal slates
      content = content.replace(/bg-slate-800/g, 'bg-muted');
      content = content.replace(/border-slate-700/g, 'border-border');
      content = content.replace(/border-slate-500/g, 'border-border');
      content = content.replace(/bg-slate-500/g, 'bg-muted-foreground');
      
      // Replace hover:bg-white/5 with hover:bg-muted or hover:bg-black/5 (we can use hover:bg-muted which is semantic)
      content = content.replace(/hover:bg-white\/5/g, 'hover:bg-muted');
      content = content.replace(/hover:bg-white\/10/g, 'hover:bg-muted');
      content = content.replace(/bg-white\/5/g, 'bg-muted');

      // Replace bg-slate-900 with bg-surface or bg-background
      content = content.replace(/bg-slate-900/g, 'bg-surface');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('../src/app/pages');
replaceInDir('../src/app/components');
console.log("Done");