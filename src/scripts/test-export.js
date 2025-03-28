// Test script to validate the export endpoints
const fetch = require('node-fetch');

// Function to test browser export
async function testBrowserExport() {
  console.log('Testing browser export...');
  try {
    const response = await fetch('http://localhost:3000/api/export-data?key=lAxmesh@3521');
    if (!response.ok) {
      console.error('Error response:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`Export failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Export response:', data);
    
    if (data.success) {
      console.log('✅ Browser export succeeded');
    } else {
      console.error('❌ Browser export failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Error testing browser export:', error);
  }
}

// Function to test server export
async function testServerExport() {
  console.log('Testing server export...');
  try {
    const response = await fetch('http://localhost:3000/api/run-export-script?key=lAxmesh@3521');
    if (!response.ok) {
      console.error('Error response:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`Server export failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Server export response:', data);
    
    if (data.success) {
      console.log('✅ Server export succeeded');
      console.log('Export path:', data.exportPath);
      console.log('Web path:', data.webPath);
    } else {
      console.error('❌ Server export failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Error testing server export:', error);
  }
}

// Main function to run tests
async function runTests() {
  console.log('Starting export endpoint tests...');
  
  const browserExportSuccess = await testBrowserExport();
  const serverExportSuccess = await testServerExport();
  
  console.log('\nTest results:');
  console.log('- Browser export:', browserExportSuccess ? '✅ PASSED' : '❌ FAILED');
  console.log('- Server export:', serverExportSuccess ? '✅ PASSED' : '❌ FAILED');
  
  if (browserExportSuccess && serverExportSuccess) {
    console.log('\n🎉 All tests passed! The export functionality is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the error messages above.');
  }
}

// Run the tests
runTests(); 