const fs = require('fs');

// Check if the user has provided the required command line arguments
if (process.argv.length < 1) {
  console.error('Usage: node test.js <year>');
  process.exit(1);
}

// Get the command line argument (year)
const year = process.argv[2];

const outputFileName = 'payments.csv';

// Parse the CSV data
const header = ['Month name', 'salary date', 'bonus date'];

const getDates = (year, month) => {
	// Get Payment date
	const lastDayOfMonth = new Date(year, month, 0).getDay();
	let paymentDate = null;
	// Test if the last day is weekend
	if( lastDayOfMonth == 6 || lastDayOfMonth == 0 ){
		// Get last friday
		if(lastDayOfMonth == 6){
			paymentDate = new Date(year, month, -1);
		}else{
			paymentDate = new Date(year, month, -2);
		}
	}else{
		paymentDate = new Date(year, month, 0);
	}

	// Get Bonus date
	const fifteethDayOfMonth = new Date(year, month-1, 15).getDay();
	let bonusDate = null;
	// Test if the fifteenth day is weekend
	if( fifteethDayOfMonth == 6 || fifteethDayOfMonth == 0 ){
		// Get next wednesday
		if(fifteethDayOfMonth == 6){
			bonusDate = new Date(year, month-1, 19);
		}else{
			bonusDate = new Date(year, month-1, 18);
		}
	}else{
		bonusDate = new Date(year, month-1, 15);
	}
	return [paymentDate, bonusDate];
}

const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

const data = [];
for (var month = 1; month <= 12; month++) {
	const [payment_date, bonus_date] = getDates(year, month);
	data.push([months[month-1], payment_date, bonus_date]);
}

// Generate the CSV file
const csvContent = [
  header.join(','),
  ...data.map(row => row.join(','))
].join('\n');

fs.writeFile(outputFileName, csvContent, (err) => {
  if (err) throw err;
  console.log("CSV file has been saved");
});
