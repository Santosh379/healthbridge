const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    
    // Remove any line that contains the assignment markers
    let filtered = lines.filter(line => 
        !line.includes('SantoshDarisi_24BCE0979') && 
        !line.includes('printDetails_Santosh_24BCE0979') &&
        !line.includes('student_Santosh_24BCE0979') &&
        !line.includes('instance_24BCE0979') &&
        !line.includes('// Assignment Requirement')
    );
    
    // Specialized cleanup for the stray braces at the top level
    // These were usually on lines 6-12 in my previous views
    let result = [];
    let skipStray = false;
    for (let i = 0; i < filtered.length; i++) {
        let line = filtered[i].trim();
        // If we see a single '}' at the very top of the file processing, it's likely a stray
        if (i < 20 && line === '}') {
            console.log(`Removing stray brace at line ${i} of ${filePath}`);
            continue;
        }
        result.push(filtered[i]);
    }

    fs.writeFileSync(filePath, result.join('\n'), 'utf8');
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', 'dist'].includes(file)) traverse(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            if (!['vite.config.js', 'eslint.config.js'].includes(file)) cleanFile(fullPath);
        }
    }
}

traverse(path.join(__dirname, 'src'));
console.log('--- CLEANUP COMPLETE ---');
