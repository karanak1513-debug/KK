import fs from 'fs';
import path from 'path';

async function testUpload() {
  const fileContent = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  formData.append('fileToUpload', new Blob([fileContent], { type: 'image/png' }), 'test.png');

  try {
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData
    });
    const text = await response.text();
    console.log('Upload Result:', text);
  } catch (err) {
    console.error('Upload Failed:', err.message);
  }
}

testUpload();
